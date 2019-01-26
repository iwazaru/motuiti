import React from 'react';

import './Pin.css';

export default function Pin({ onClick }) {
  return (
    <div className="Pin" onClick={onClick}>
      <div className="dot"/>
    </div>
  );
}
