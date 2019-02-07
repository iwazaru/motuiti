import IsbnUtils from 'isbn-utils';

export default function processIsbn(query) {
  const isbn = IsbnUtils.parse(query);

  if (isbn) {
    const ean = isbn.asIsbn13();
    return ean;
  }

  throw new Error('Cet ISBN semble invalide.');
}
