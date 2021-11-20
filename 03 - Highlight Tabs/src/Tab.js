import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const Tab = ({ children }) => {
  const [highlight, setHighlight] = useState({ left: 0, opacity: 0 });

  const moveHighlight = (e) => {
    setHighlight({
      left: e.nativeEvent.layerX - 50,
    });
  };

  const removeHighlight = (e) => {
    setHighlight({
      opacity: 0,
    });
  };

  return (
    <div
      className="tab"
      onMouseOut={removeHighlight}
      onMouseMove={moveHighlight}
    >
      <div className="highlight" style={highlight}></div>
      {children}
    </div>
  );
};
