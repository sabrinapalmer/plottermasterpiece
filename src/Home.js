import React from 'react';
import Canvas from './Canvas';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'r') {
      const canvas = this.canvasRef.current;
      canvas.resetCanvas();
    }
  };

  render() {
    return (
      <div>
        <h1>Random Drawing</h1>
        <Canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default Home;
