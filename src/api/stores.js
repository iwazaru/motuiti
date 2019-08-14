import getSecondsToTomorrow from '../lib/getSecondsToTomorrow';
import PlaceDesLibraires from '../lib/PlaceDesLibraires';
import processIsbn from '../lib/processIsbn';
import RedisCache from '../lib/RedisCache';

const { parse } = require('url');

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { ean } = query;
  const date = Date.now();
  const ttl = getSecondsToTomorrow();

  res.setHeader('Content-Type', 'application/json');

  try {
    const validEan = processIsbn(ean);
    const cacheKey = `stores:${ean}`;

    let storesFromAPI = null;
    let storesFromCache = null;

    let usingCache = false;
    const cache = new RedisCache(process.env.REDIS_URL);
    const cachedResponse = await cache.open(cacheKey);

    if (cachedResponse) {
      usingCache = true;
      storesFromCache = JSON.parse(cachedResponse);
    } else {
      process.stdout.write(
        `Getting fresh response for ${ean} from PlaceDesLibraires API\n`
      );
      storesFromAPI = await PlaceDesLibraires.getStoresForEan(validEan);
      cache.save(cacheKey, JSON.stringify(storesFromAPI), ttl);
    }

    cache.close();

    const stores = storesFromCache || storesFromAPI;
    const origin = usingCache ? 'Cache' : 'API';

    process.stdout.write(`Sending response for ISBN ${validEan}\n`);
    res.setHeader('Cache-Control', `public, s-maxage=${ttl}`);
    res.end(JSON.stringify({ ean, date, origin, stores }));
  } catch (error) {
    process.stdout.write(`Error for EAN ${ean}: ${error.message}\n`);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};
