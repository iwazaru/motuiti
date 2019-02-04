import PDLParser from '../src/utils/PDLParser';

const { parse } = require('url');
const fetch = require('node-fetch');

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { ean } = query;
  const date = Date.now();

  // Get stores list for this EAN
  const response = await fetch(
    `https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`
  );
  const json = await response.json();
  const storesJson = PDLParser.filterStores(json.shop);
  const stores = storesJson.map(PDLParser.parseStore);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ ean, date, stores }));
};
