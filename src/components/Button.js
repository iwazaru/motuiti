import React from 'react';

import './Button.css';

export function Button({ type, icon, label, loading, onClick }) {
  if (loading) {
    return (
      <button type={type} className="Button" disabled>
        <span className="fas fa-circle-notch fa-spin" />
      </button>
    );
  }

  return (
    <button type={type} className="Button" title={label} onClick={onClick}>
      <span className={`fas fa-${icon}`} aria-label={label} />
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
};
