import React, { useState } from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'rgba(100, 100, 120, 0.3)',
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  title: {
    color: 'white',
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [circleCount, setCircleCount] = useState(1000);
  const [colorRange, setColorRange] = useState([0, 255]);
  const [sizeRange, setSizeRange] = useState([10, 50]);
  const [color1, setColor1] = useState('#FF0000');
  const [color2, setColor2] = useState('#0000FF');
  const [canvasKey, setCanvasKey] = useState(0);

  const handleRegenerateCanvas = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <Canvas
        key={canvasKey}
        circleCount={circleCount}
        colorRange={colorRange}
        sizeRange={sizeRange}
        color1={color1}
        color2={color2}
        canvasKey={canvasKey} // Add this line
      />
      <Sidebar
        circleCount={circleCount}
        setCircleCount={setCircleCount}
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        colorRange={colorRange}
        setColorRange={setColorRange}
        sizeRange={sizeRange}
        setSizeRange={setSizeRange}
        handleRegenerateCanvas={handleRegenerateCanvas}
      />
    </div>
  );
}

export default App;
