import React, { useState } from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';



function App() {
  const [circleCount, setCircleCount] = useState(1000);
  const [colorCount, setColorCount] = useState(2);
  const [colors, setColors] = useState(['#8db4dd', '#FA91FA']);
  const [sizeRange, setSizeRange] = useState([10, 50]);
  const [canvasKey, setCanvasKey] = useState(0);

  const handleRegenerateCanvas = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <Canvas
        key={canvasKey}
        circleCount={circleCount}
        colorCount={colorCount}
        colors={colors}
        sizeRange={sizeRange}
      />
      <Sidebar
        circleCount={circleCount}
        setCircleCount={setCircleCount}
        colorCount={colorCount}
        setColorCount={setColorCount}
        colors={colors}
        setColors={setColors}
        sizeRange={sizeRange}
        setSizeRange={setSizeRange}
        handleRegenerateCanvas={handleRegenerateCanvas}
      />
    </div>
  );
}

export default App;