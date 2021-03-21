import React from 'react';

interface IProperties {
  name: string;
  age: number;
}

function App(properties: IProperties): React.ReactNode {
  const { name, age } = properties;
  return (
    <div className="app">
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
