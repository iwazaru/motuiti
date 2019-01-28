import React from 'react';

import './Pin.css';

export default function Pin({ onClick, selected }) {
  let dotClass = 'dot';
  if (selected) {
    dotClass = 'dot selected';
  }

  return (
    <div className="Pin" onClick={onClick}>
      <div className={dotClass}/>
    </div>
  );
}
