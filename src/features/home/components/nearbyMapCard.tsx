/**
 * DEPRECATED: Compatibility Shim
 * 
 * This file exists only for backward compatibility with Metro bundler cache.
 * The "Nearby Location List" feature has been removed from HomeScreen.
 * 
 * DO NOT USE THIS COMPONENT IN NEW CODE.
 * 
 * This shim returns null and renders nothing.
 * It exists solely to prevent UnableToResolveError when Metro cache
 * still references this path from previous builds.
 * 
 * @deprecated Since refactor commit 7d44107
 * @see HomeScreen no longer imports or uses this component
 */

import type { HomeLocation } from '../types/HomeLocation';

type NearbyLocationListProps = {
  locations: HomeLocation[];
};

/**
 * @deprecated Compatibility shim - returns null
 */
export default function NearbyLocationList(_props: NearbyLocationListProps): null {
  return null;
}
