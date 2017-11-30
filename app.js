'use strict';

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/books/:ean/shops', async function(request, response) {

  const ean = request.params.ean;

  // Get shop list for this EAN
  const res  = await fetch(`https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`);
  const json = await res.json();

  // Filter shop list to get only those with available stock
  const result = json.shop.filter(shop => shop.stockAvailablility);

  response.json(result);
});

app.listen(3000, () => process.stdout.write('Server listening on port 3000!'));

