'use strict';

const express = require('express');
const fs      = require('fs');
const fetch   = require('node-fetch');

const app = express();

app.get('/books/:ean/shops', async function(request, response) {

  const ean = request.params.ean;
  const date = Date.now();
  const cacheFile = `./cache/${ean}.json`;
  let result;

  if (fs.existsSync(cacheFile)) {
    result = require(cacheFile);
    process.stdout.write(`Using cached response for EAN ${ean}\n`);
  }

  if (typeof result === 'undefined') {

    process.stdout.write(`Getting fresh data for EAN ${ean}\n`);

    // Get shop list for this EAN
    const res  = await fetch(`https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`);
    const json = await res.json();

    // Filter shop list to get only those with available stock
    const shops = json.shop.filter(shop => shop.stockAvailablility);

    result = { ean, date, shops };

    fs.writeFile(cacheFile, JSON.stringify(result), (error) => {
      if (error) throw error;
    });
  }

  response.json(result);
});

app.listen(3000, () => process.stdout.write('Server listening on port 3000!\n'));

