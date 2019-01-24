import React from 'react';

import './Pin.css';

export default function Pin({ onClick }) {
  return (
    <div className="Pin" onClick={onClick}>
      <span role="img" aria-label="livre">
        📕
      </span>
    </div>
  );
}
