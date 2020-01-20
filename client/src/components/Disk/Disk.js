import React from 'react';

class Disk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diskColor: props.diskColor,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.diskColor !== prevState.diskColor) {
      return { diskColor: nextProps.diskColor };
    }
    return null;
  }

  render() {
    const { diskColor } = this.state;
    let disk;

    if (diskColor === 'BLACK') {
      disk = <span id="blackDisk" draggable className="disk black" />;
    } else if (diskColor === 'WHITE') {
      disk = <span id="whiteDisk" draggable className="disk white" />;
    }
    return (
      <div className="margin">
        { disk }
      </div>
    );
  }
}

export default Disk;
