export default function isStoreValid(store) {
  if (isNaN(store.latitude) || isNaN(store.longitude)) {
    return false;
  }

  return true;
}
