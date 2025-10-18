'use client';

import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">Loading issues...</p>
      </div>
    </div>
  );
}
