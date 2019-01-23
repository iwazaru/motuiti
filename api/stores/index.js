const { parse } = require('url');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const { ean } = query;

  const date = Date.now();
  const cacheFile = `/tmp/${ean}.json`;
  let fromCache = false;
  let result;

  if (fs.existsSync(cacheFile)) {
    fromCache = true;
    result = require(cacheFile);
    process.stdout.write(`Using cached response for EAN ${ean}\n`);
  }

  if (typeof result === 'undefined') {
    process.stdout.write(`Getting fresh data for EAN ${ean}\n`);

    // Get shop list for this EAN
    const res = await fetch(
      `https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`
    );
    const json = await res.json();

    // Filter shop list to get only those with available stock
    const shops = json.shop.filter(shop => shop.stockAvailablility);

    result = { ean, date, shops };

    fs.writeFile(cacheFile, JSON.stringify(result), error => {
      if (error) throw error;
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};
