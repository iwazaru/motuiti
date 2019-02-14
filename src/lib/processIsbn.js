import IsbnUtils from 'isbn-utils';

export default function processIsbn(query) {
  const cleanQuery = query.replace(/[^0-9]/g, '');
  const isbn = IsbnUtils.parse(cleanQuery);

  if (isbn) {
    const ean = isbn.asIsbn13();
    return ean;
  }

  throw new Error('Cet ISBN semble invalide.');
}
