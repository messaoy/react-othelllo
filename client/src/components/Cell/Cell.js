import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diskColor: props.diskColor,
      x: props.x,
      y: props.y,
    };
  }

  onDragOver = (event) => {
    event.preventDefault();
  };

  render() {
    const { diskColor, x, y } = this.state;
    const { handleClick } = this.props;
    let disk;

    if (diskColor === 'BLACK') {
      disk = <span id="cellDiskBlack" className="disk black" />;
    } else if (diskColor === 'WHITE') {
      disk = <span id="cellDiskWhite" className="disk white" />;
    }
    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={() => handleClick(x, y)}
        onClick={() => handleClick(x, y)}
        className="cell"
      >
        {disk}
      </div>
    );
  }
}

export default Cell;
