import React, { useState } from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  exportButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    zIndex: '10',
  },
}));

function App() {
  const classes = useStyles();
  const [circleCount, setCircleCount] = useState(1000);
  const [colorCount, setColorCount] = useState(2);
  const [colors, setColors] = useState(['#8db4dd', '#FA91FA']);
  const [sizeRange, setSizeRange] = useState([10, 50]);
  const [canvasKey, setCanvasKey] = useState(0);

  const handleRegenerateCanvas = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  const handleExportCanvas = () => {
    const canvas = document.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'sketch.png';
    link.click();
  };

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
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
        <Canvas
          key={canvasKey}
          circleCount={circleCount}
          colorCount={colorCount}
          colors={colors}
          sizeRange={sizeRange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.exportButton}
          onClick={handleExportCanvas}
        >
          Export
        </Button>
      </div>
    </div>
  );
}

export default App;
