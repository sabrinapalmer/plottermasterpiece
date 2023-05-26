import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Slider, Input, InputLabel, FormControl, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  colorInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Sidebar = ({
  circleCount,
  setCircleCount,
  color1,
  setColor1,
  color2,
  setColor2,
  sizeRange,
  setSizeRange,
  handleRegenerateCanvas,
}) => {
  const classes = useStyles();

  const handleCircleCountChange = (event, newValue) => {
    setCircleCount(newValue);
  };

  const handleColor1Change = (event) => {
    setColor1(event.target.value);
  };

  const handleColor2Change = (event) => {
    setColor2(event.target.value);
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
      <Typography variant="h6" gutterBottom>
        Options
      </Typography>
      <div className={classes.sliderContainer}>
        <Typography gutterBottom>Circle Count: {circleCount}</Typography>
        <Slider
          value={circleCount}
          min={10}
          max={10000}
          step={10}
          onChange={handleCircleCountChange}
          valueLabelDisplay="auto"
        />
      </div>
      <FormControl className={classes.colorInput}>
        <InputLabel>Color 1</InputLabel>
        <Input type="color" value={color1} onChange={handleColor1Change} />
      </FormControl>
      <FormControl className={classes.colorInput}>
        <InputLabel>Color 2</InputLabel>
        <Input type="color" value={color2} onChange={handleColor2Change} />
      </FormControl>
      <div className={classes.sliderContainer}>
        <Typography gutterBottom>
          Size Range: {sizeRange[0]} - {sizeRange[1]}
        </Typography>
        <Slider
          value={sizeRange}
          min={5}
          max={100}
          step={1}
          onChange={handleSizeRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="size-range-slider"
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
        Regenerate Canvas
      </Button>
    </div>
  );
};

export default Sidebar;
