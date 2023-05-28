import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import p5 from 'p5';

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: '800px',
    height: '600px',
    margin: '0 auto',
    marginTop: '50vh',
    transform: 'translateY(-50%)',
    border: '2px solid black',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Canvas = ({ circleCount, colorCount, colors, sizeRange }) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [p, setP] = useState(null);

  const regenerateCircles = (p) => {
    p.clear();
    p.background(255);

    for (let i = 0; i < circleCount; i++) {
      const size = p.random(sizeRange[0], sizeRange[1]);
      const randomColorIndex = Math.floor(p.random(colors.length));
      const newColor = colors[randomColorIndex];
      const x = p.random(p.width);
      const y = p.random(p.height);
      p.fill(newColor);
      p.noStroke();
      p.circle(x, y, size);
    }
  };

  const handleRegenerateCanvas = () => {
    if (p) {
      regenerateCircles(p);
    }
  };

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const pixelDensity = window.devicePixelRatio*4 || 1; // Get the pixel density of the device
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
        canvas.style.width = '100%'; // Make the canvas responsive
        canvas.style.height = '100%';
        p.pixelDensity(pixelDensity);
        regenerateCircles(p);
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        regenerateCircles(p);
      };
    };

    const newP = new p5(sketch);
    setP(newP);

    return () => {
      newP.remove();
    };
  }, []);

  return (
    <div className={classes.canvasContainer}>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default Canvas;
