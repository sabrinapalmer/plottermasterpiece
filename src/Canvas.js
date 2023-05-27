import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: '800px', // Set the desired width of the canvas container
    height: '600px', // Set the desired height of the canvas container
    margin: '0 auto', // Center the container horizontally
    marginTop: '50vh', // Center vertically using 50% viewport height
    transform: 'translateY(-50%)', // Adjust vertical position to center
    border: '2px solid black', // Add a border
    borderRadius: theme.spacing(1), // Add border radius
    overflow: 'hidden', // Hide any overflowing content
    display: 'flex', // Add flex display
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
}));

const Canvas = ({ circleCount, colorRange, sizeRange, colors, regenerateFlag }) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const circlesRef = useRef([]);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);

  const regenerateCircles = () => {
    circlesRef.current = [];

    for (let i = 0; i < circleCount; i++) {
      const size = getRandomValue(sizeRange[0], sizeRange[1]);
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const newColor = colors[randomColorIndex];
      const x = getRandomValue(0, canvasRef.current.width);
      const y = getRandomValue(0, canvasRef.current.height);
      const circle = { x, y, size, color: newColor };
      circlesRef.current.push(circle);
    }

    drawCircles();
  };

  const drawCircles = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circlesRef.current.length; i++) {
      const { x, y, size, color } = circlesRef.current[i];
      context.beginPath();
      context.arc(x, y, size, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  };

  const getRandomValue = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    const handleWindowResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      regenerateCircles();
    };

    window.addEventListener('resize', handleWindowResize);

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    regenerateCircles();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (shouldRegenerate) {
      regenerateCircles();
      setShouldRegenerate(false);
    }
  }, [shouldRegenerate]);

  const handleRegenerateCanvas = () => {
    setShouldRegenerate(true);
  };

  return (
    <div className={classes.canvasContainer}>
      <canvas ref={canvasRef} />
      <button onClick={handleRegenerateCanvas} style={{ display: 'none' }}></button>
    </div>
  );
};

export default Canvas;