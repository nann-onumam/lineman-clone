#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const featuresRoot = path.join(repoRoot, 'src', 'features');

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const ignoredDirs = new Set(['node_modules', '.git', 'dist', 'build', 'coverage']);

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

  const normalized = specifier.replace(/\\/g, '/');
  const match = normalized.match(/^(?:@\/)?src\/features\/([^/]+)/);
  if (match) return match[1];

  return null;
}

function main() {
  if (!fs.existsSync(featuresRoot)) {
    console.error('No src/features directory found.');
    process.exit(1);
  }

  const files = walk(featuresRoot);
  const violations = [];

  for (const file of files) {
    const currentFeature = getFeatureName(file);
    if (!currentFeature) continue;

    const content = fs.readFileSync(file, 'utf8');
    const imports = extractImports(content);

    for (const specifier of imports) {
      const targetFeature = resolveFeatureFromImport(file, specifier);
      if (!targetFeature || targetFeature === currentFeature) continue;

      violations.push({
        file: path.relative(repoRoot, file).replace(/\\/g, '/'),
        from: currentFeature,
        to: targetFeature,
        specifier,
      });
    }
  }

  if (violations.length === 0) {
    console.log('✅ No cross-feature imports found.');
    return;
  }

  console.error('❌ Cross-feature imports detected:');
  for (const v of violations) {
    console.error(`- ${v.file}: ${v.from} -> ${v.to} ("${v.specifier}")`);
  }
  console.error(`Total violations: ${violations.length}`);
  process.exit(1);
}

main();