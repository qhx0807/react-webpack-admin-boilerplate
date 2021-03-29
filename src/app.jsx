import React from 'react';
import aImg from '@/assets/a.png';
import './app.less';

function App(properties) {
  const { name, age } = properties;
  return (
    <div className="app">
      <img src={aImg} alt="" />
      <span>{`Helloooo1! I am aass ${name}, ${age} years aold boy`}</span>
      <h1>wwddas</h1>
      <pre>console.log(a)</pre>
    </div>
  );
}

export default App;
