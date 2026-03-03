#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const featuresRoot = path.join(repoRoot, 'src', 'features');
const homeFeatureRoot = path.join(featuresRoot, 'home');

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const ignoredDirs = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', 'android', 'ios']);

/**
 * Allowlisted cross-feature imports.
 * key: source feature, value: map of target feature -> allowed import specifiers
 */
const allowedCrossFeatureImports = {
  'mart-order': {
    'food-order': new Set([
      '../../food-order/screens/foodOrderScreen',
      '@/src/features/food-order/screens/foodOrderScreen',
      'src/features/food-order/screens/foodOrderScreen',
    ]),
  },
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function getFeatureName(filePath) {
  const rel = path.relative(featuresRoot, filePath);
  const [featureName] = rel.split(path.sep);
  return featureName;
}

function normalizeSlashes(value) {
  return value.replace(/\\/g, '/');
}

function extractImports(content) {
  const specs = [];

  const importFromRe = /import\s+(?:type\s+)?[\s\S]*?from\s*['"]([^'"\n]+)['"]/g;
  const sideEffectImportRe = /import\s*['"]([^'"\n]+)['"]/g;
  const requireRe = /require\(\s*['"]([^'"\n]+)['"]\s*\)/g;

  for (const re of [importFromRe, sideEffectImportRe, requireRe]) {
    let m;
    while ((m = re.exec(content)) !== null) {
      specs.push(m[1]);
    }
  }

  return specs;
}

function resolveFeatureFromImport(sourceFile, specifier) {
  if (specifier.startsWith('.')) {
    const sourceDir = path.dirname(sourceFile);
    const resolvedAbsolute = path.resolve(sourceDir, specifier);
    const relToFeatures = path.relative(featuresRoot, resolvedAbsolute);
    if (!relToFeatures.startsWith('..') && !path.isAbsolute(relToFeatures)) {
      return relToFeatures.split(path.sep)[0];
    }
    return null;
  }

  const normalized = normalizeSlashes(specifier);
  const match = normalized.match(/^(?:@\/)?src\/features\/([^/]+)/);
  if (match) return match[1];

  return null;
}

function isAllowlistedCrossFeatureImport(from, to, specifier) {
  const bySource = allowedCrossFeatureImports[from];
  if (!bySource) return false;

  const allowlistedSpecifiers = bySource[to];
  if (!allowlistedSpecifiers) return false;

  return allowlistedSpecifiers.has(specifier);
}

function resolveImportToAbsolutePath(sourceFile, specifier) {
  if (specifier.startsWith('.')) {
    return path.resolve(path.dirname(sourceFile), specifier);
  }

  const normalized = normalizeSlashes(specifier);
  const srcMatch = normalized.match(/^(?:@\/)?src\/(.+)$/);
  if (srcMatch) {
    return path.join(repoRoot, 'src', srcMatch[1]);
  }

  return null;
}

function isInsideDir(filePath, targetDir) {
  const rel = path.relative(targetDir, filePath);
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function isHomePublicEntrySpecifier(specifier) {
  const normalized = normalizeSlashes(specifier).replace(/\/+$/, '');
  return (
    normalized === 'src/features/home' ||
    normalized === '@/src/features/home' ||
    normalized === 'src/features/home/index' ||
    normalized === '@/src/features/home/index'
  );
}

function checkCrossFeatureImports(featureFiles) {
  const violations = [];

  for (const file of featureFiles) {
    const currentFeature = getFeatureName(file);
    if (!currentFeature) continue;

    const content = fs.readFileSync(file, 'utf8');
    const imports = extractImports(content);

    for (const specifier of imports) {
      const targetFeature = resolveFeatureFromImport(file, specifier);
      if (!targetFeature || targetFeature === currentFeature) continue;
      if (isAllowlistedCrossFeatureImport(currentFeature, targetFeature, specifier)) continue;

      violations.push({
        file: normalizeSlashes(path.relative(repoRoot, file)),
        from: currentFeature,
        to: targetFeature,
        specifier,
      });
    }
  }

  return violations;
}

function checkHomePublicApiLock(allFiles) {
  const violations = [];

  for (const file of allFiles) {
    const isHomeInternalFile = isInsideDir(file, homeFeatureRoot);
    const content = fs.readFileSync(file, 'utf8');
    const imports = extractImports(content);

    for (const specifier of imports) {
      if (isHomePublicEntrySpecifier(specifier)) continue;

      const resolvedAbsolute = resolveImportToAbsolutePath(file, specifier);
      if (!resolvedAbsolute || !isInsideDir(resolvedAbsolute, homeFeatureRoot)) continue;

      if (isHomeInternalFile) continue;

      const relToHome = normalizeSlashes(path.relative(homeFeatureRoot, resolvedAbsolute));
      const isIndexEntry = relToHome === 'index' || relToHome === 'index.ts' || relToHome === 'index.tsx';
      if (isIndexEntry) continue;

      violations.push({
        file: normalizeSlashes(path.relative(repoRoot, file)),
        specifier,
      });
    }
  }

  return violations;
}

function main() {
  if (!fs.existsSync(featuresRoot)) {
    console.error('No src/features directory found.');
    process.exit(1);
  }

  const featureFiles = walk(featuresRoot);
  const allSourceFiles = [
    ...walk(path.join(repoRoot, 'src')),
    path.join(repoRoot, 'App.tsx'),
    path.join(repoRoot, 'index.js'),
  ].filter(fs.existsSync);

  const crossFeatureViolations = checkCrossFeatureImports(featureFiles);
  const homeApiViolations = checkHomePublicApiLock(allSourceFiles);

  if (crossFeatureViolations.length === 0 && homeApiViolations.length === 0) {
    console.log('✅ No feature-boundary violations found.');
    return;
  }

  if (crossFeatureViolations.length > 0) {
    console.error('❌ Cross-feature imports detected:');
    for (const v of crossFeatureViolations) {
      console.error(`- ${v.file}: ${v.from} -> ${v.to} ("${v.specifier}")`);
    }
  }

  if (homeApiViolations.length > 0) {
    console.error('❌ Home public API lock violations detected (use src/features/home/index.ts):');
    for (const v of homeApiViolations) {
      console.error(`- ${v.file}: "${v.specifier}"`);
    }
  }

  console.error(
    `Total violations: ${crossFeatureViolations.length + homeApiViolations.length}`,
  );
  process.exit(1);
}

main();