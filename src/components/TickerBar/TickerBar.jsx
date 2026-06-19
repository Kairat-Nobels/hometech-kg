import React from 'react';
import './tickerBar.scss';

const TickerBar = () => {
  const text =
    'Поступай в КГТУ — Кыргызский государственный технический университет им. И. Раззакова (ПОЛИТЕХ)';

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default TickerBar;
