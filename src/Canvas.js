import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import p5 from 'p5';

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: 'calc((100vh - 100px) * 14 / 11)',
    height: 'calc(100vh - 100px)', // Subtract 100px for top and bottom margins
    margin: '0 auto',
    marginTop: '50px', 
    marginBottom: '50px', 
    border: '2px solid black',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 0,
  },
}));

const Canvas = ({ circleCount, colors, sizeRange }) => {
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

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const windowHeight = window.innerHeight - 100; // Subtract 200px for top and bottom margins
        const windowWidth = window.innerWidth;
        const aspectRatio = 14 / 11;
        let canvasHeight = windowHeight;
        let canvasWidth = windowHeight * aspectRatio;

        if (canvasWidth > windowWidth) {
          canvasWidth = windowWidth;
          canvasHeight = windowWidth / aspectRatio;
        }

        const pixelDensity = window.devicePixelRatio * 4 || 1; // Get the pixel density of the device
        const canvas = p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current);
        canvas.style.width = '100%'; // Make the canvas responsive
        canvas.style.height = '100%';
        p.pixelDensity(pixelDensity);
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
