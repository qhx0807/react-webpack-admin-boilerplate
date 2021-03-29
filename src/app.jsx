import React from 'react';
import aImg from '@/assets/a.png';
import './app.less';

function App(properties) {
  const { name, age } = properties;
  return (
    <div className="app" c>
      <img src={aImg} alt="" />
      <span>{`Helloooo! I am ${name}, ${age} years old boy`}</span>
    </div>
  );
}

export default App;
