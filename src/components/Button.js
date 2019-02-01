import React from 'react';

import './Button.css';

export function Button({ type, icon, label, loading, onClick, toggled }) {
  if (loading) {
    return (
      <button type={type} className="Button" disabled>
        <span className="fas fa-circle-notch fa-spin" />
      </button>
    );
  }

  let classes = ['Button'];
  if (toggled) {
    classes.push('active')
  }

  return (
    <button type={type} className={classes.join(' ')} title={label} onClick={onClick}>
      <span className={`fas fa-${icon}`} aria-label={label} />
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
};
