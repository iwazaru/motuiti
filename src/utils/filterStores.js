import isStoreValid from './isStoreValid';

// Note: "stockAvailablility" typo is intended

export default function filterStores(stores) {
  return stores
    .filter(store => store.stockAvailablility) // only those with available stock
    .filter(isStoreValid); // remove invalid stores
}
