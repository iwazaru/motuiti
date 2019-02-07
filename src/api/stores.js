import PlaceDesLibraires from '../lib/PlaceDesLibraires';
import processIsbn from '../lib/processIsbn';

const { parse } = require('url');

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { ean } = query;
  const date = Date.now();

  res.setHeader('Content-Type', 'application/json');

  try {
    const validEan = processIsbn(ean);
    const stores = await PlaceDesLibraires.getStoresForEan(validEan);
    process.stdout.write(`Sending response for ISBN ${validEan}`);
    res.end(JSON.stringify({ ean, date, stores }));
  } catch (error) {
    process.stdout.write(`Sending error for invalid ISBN ${ean}`);
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error.message }));
  }
};
