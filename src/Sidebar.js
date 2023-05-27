import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Slider,
  Input,
  InputLabel,
  FormControl,
  Button,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'absolute',
    top: '50vh',
    right: 0,
    width: 240,
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateY(-50%)',
    overflow: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: `-${theme.spacing(2)}px`,
  },
  sliderContainer: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  colorContainer: {
    width: '100%',
    height: theme.spacing(24),
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    border: '2px solid rgba(0, 0, 0, 0.2)',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  colorInput: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: 'auto',
  },
}));

const Sidebar = ({
  circleCount,
  setCircleCount,
  colorCount,
  setColorCount,
  colors,
  setColors,
  sizeRange,
  setSizeRange,
  handleRegenerateCanvas,
}) => {
  const classes = useStyles();

  const handleCircleCountChange = (event, newValue) => {
    setCircleCount(newValue);
  };

  const handleColorCountChange = (event, newValue) => {
    setColorCount(newValue);
    if (colors.length > newValue) {
      setColors(colors.slice(0, newValue));
    } else {
      const newColorCount = newValue - colors.length;
      const newColors = Array.from({ length: newColorCount }, () => {
        const r = getRandomColValue(0, 255);
        const g = getRandomColValue(0, 255);
        const b = getRandomColValue(0, 255);
        return `#${rgbToHex(r, g, b)}`;
      });
      setColors((prevColors) => [...prevColors, ...newColors]);
    }
  };

  const getRandomColValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rgbToHex = (r, g, b) => {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
  };

  const handleSizeRangeChange = (event, newValue) => {
    setSizeRange(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegenerateCanvas();
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.content}>
        <Typography variant="h6" gutterBottom>
          Options
        </Typography>
        <div className={classes.sliderContainer}>
          <Typography gutterBottom>Circle Count: {circleCount}</Typography>
          <Slider
            value={circleCount}
            min={10}
            max={1000}
            step={10}
            onChange={handleCircleCountChange}
            valueLabelDisplay="auto"
          />
          <Typography gutterBottom>
            Size Range: {sizeRange[0]} - {sizeRange[1]}
          </Typography>
          <Slider
            value={sizeRange}
            min={1}
            max={300}
            step={1}
            onChange={handleSizeRangeChange}
            valueLabelDisplay="auto"
            aria-labelledby="size-range-slider"
          />
          <Typography gutterBottom>Color Count: {colorCount}</Typography>
          <Slider
            value={colorCount}
            min={1}
            max={10}
            step={1}
            onChange={handleColorCountChange}
            valueLabelDisplay="auto"
          />
        </div>
        <Box className={classes.colorContainer}>
          {colors.map((color, index) => (
            <FormControl key={index} className={classes.colorInput}>
              <InputLabel>Color {index + 1}</InputLabel>
              <Input type="color" value={color} onChange={(event) => handleColorChange(index, event)} />
            </FormControl>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
          Regenerate Canvas
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;