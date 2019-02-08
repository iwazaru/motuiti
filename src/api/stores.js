import PlaceDesLibraires from '../lib/PlaceDesLibraires';
import processIsbn from '../lib/processIsbn';
import getSecondsToTomorrow from '../lib/getSecondsToTomorrow';

exports.handler = async (event, context, callback) => {
  const { ean } = event.queryStringParameters;
  const date = Date.now();

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `public, s-maxage=${getSecondsToTomorrow()}`
  };

  try {
    const validEan = processIsbn(ean);
    const stores = await PlaceDesLibraires.getStoresForEan(validEan);
    process.stdout.write(`Sending response for ISBN ${validEan}`);

    const body = JSON.stringify({ ean, date, stores });
    callback(null, { statusCode: 200, headers, body });
  } catch (error) {
    process.stdout.write(`Sending error for invalid ISBN ${ean}`);

    const body = JSON.stringify({ error: error.message });
    callback(null, { statusCode: 400, headers, body });
  }
};
