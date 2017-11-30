'use strict';

const fetch = require('node-fetch');

(async function() {

  // Get shop list for this EAN
  const res  = await fetch('https://www.placedeslibraires.fr/getshoplist.php?ISBN=9782953595109&typeproduit=0&gencod=9782953595109&dispo=1&rid=&geoLat=&geoLon=');
  const json = await res.json();

  // Filter shop list to get only those with available stock
  const result = json.shop.filter(shop => shop.stockAvailablility);

  console.log(result);
})();

