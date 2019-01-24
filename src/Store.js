import React from 'react';

import './Store.css';

export function Store({ logo, name, address, postalCode, city, phone }) {
  return (
    <div className="Store">
      {logo && <img src={logo} alt={name} />}
      <div dangerouslySetInnerHTML={{ __html: name }} />
      <div dangerouslySetInnerHTML={{ __html: address }} />
      {postalCode} {city}
      <br />
      {phone}
    </div>
  );
}
