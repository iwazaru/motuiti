import React from 'react';

import './Store.css';

export default function Store({
  logo,
  name,
  address,
  postalCode,
  city,
  phone,
}) {
  return (
    <div className="Store">
      <div className="logo">{logo && <img src={logo} alt={name} />}</div>
      <div className="data">
        <div dangerouslySetInnerHTML={{ __html: name }} />
        <div dangerouslySetInnerHTML={{ __html: address }} />
        {postalCode} {city}
        <br />
        {phone}
      </div>
    </div>
  );
}
