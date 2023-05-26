import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import p5 from 'p5';

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
  },
}));

const Canvas = ({ circleCount, colorRange, sizeRange, color1, color2, regenerateFlag }) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  let sketch = null;

  useEffect(() => {
    sketch = new p5((p) => {
      let circles = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noLoop();
        regenerateCircles();
      };

      p.draw = () => {
        p.background(255);

        for (let i = 0; i < circles.length; i++) {
          const { x, y, size, color } = circles[i];
          p.noStroke(); // Remove circle border
          p.fill(p.red(color), p.green(color), p.blue(color), 200); // Set circle color with half opacity
          p.circle(x, y, size);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };

      const regenerateCircles = () => {
        circles = [];

        for (let i = 0; i < circleCount; i++) {
          const size = p.random(sizeRange[0], sizeRange[1]);
          const newColor = p.lerpColor(p.color(color1), p.color(color2), p.random(1));
          const newCircle = {
            x: p.random(p.width),
            y: p.random(p.height),
            size,
            color: newColor,
          };
          circles.push(newCircle);
        }

        p.redraw();
      };

      if (shouldRegenerate) {
        regenerateCircles();
        setShouldRegenerate(false);
      }
    });

    return () => {
      sketch.remove();
    };
  }, [shouldRegenerate]);

  const handleRegenerateCanvas = () => {
    setShouldRegenerate(true);
  };

  return (
    <div>
      <div className={classes.canvasContainer} ref={canvasRef} />
      <button onClick={handleRegenerateCanvas} style={{ display: 'none' }}></button>
    </div>
  );
};

export default Canvas;
