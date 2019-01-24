import React, { Component } from 'react';

import Map from './Map';
import { Store } from './Store';

class App extends Component {
  render() {
    const stores = [
      {
        id: '2693',
        name: 'Librairie Galignani',
        address: '224, rue de Rivoli',
        postalCode: '75001',
        city: 'Paris',
        phone: '0142607607',
        logo: 'https://static.epagine.fr/mediaweb3/2693/galignani_logo.png',
        longitude: '2.328249',
        latitude: '48.864977',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
      {
        id: '2661',
        name: 'Librairie Delamain',
        address: '155, rue Saint Honor&eacute;',
        postalCode: '75001',
        city: 'Paris',
        phone: '0142614878',
        logo:
          'https://static.epagine.fr/mediaweb3/2661/logo_librairie_delamain.png',
        longitude: '2.336101',
        latitude: '48.863005',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
      {
        id: '5934',
        name: 'Ici Librairie',
        address: '25 boulevard Poissonni&egrave;re',
        postalCode: '75002',
        city: 'Paris',
        phone: '0185016730',
        logo: 'https://static.epagine.fr/mediaweb3/5934/ici-librairie_logo.png',
        longitude: '2.343811',
        latitude: '48.8711519',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
      {
        id: '2397',
        name: "L'Acacia - R&eacute;publique",
        address: '33/35 bd du Temple',
        postalCode: '75003',
        city: 'Paris',
        phone: '0148047652',
        logo: '',
        longitude: '2.3650773',
        latitude: '48.8657534',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
      {
        id: '2214',
        name: 'Comme un Roman',
        address: '39, rue de Bretagne',
        postalCode: '75003',
        city: 'Paris',
        phone: '0142775620',
        logo:
          'https://static.epagine.fr/mediaweb3/2214/comme_un_roman_logo.png',
        longitude: '2.362529',
        latitude: '48.862888',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
      {
        id: '2165',
        name: 'Les Mots &agrave; la Bouche',
        address: '6 Rue Sainte Croix de la Bretonnerie',
        postalCode: '75004',
        city: 'Paris',
        phone: '0142788830',
        logo: '',
        longitude: '2.357340',
        latitude: '48.857695',
        stockAvailablility: true,
        precommande: false,
        vacances: false,
      },
    ];

    const storesComp = stores.map(({ id, ...props }) => {
      return <Store key={id} {...props} />;
    });

    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
