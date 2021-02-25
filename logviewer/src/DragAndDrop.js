import './DragAndDrop.css';
import React from 'react';

class DragAndDrop extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        inDropZone: false
    };
  }

  handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ inDropZone: false })
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    this.setState({ inDropZone: true });
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      this.props.handleDropped(files[0]);
    }
  };

  render() {
      return (
        <div className="DragAndDrop">
           Upload a file to begin 
           <div className={this.state.inDropZone ? "DropZone DropZoneInside" : "DropZone"}
                onDrop={e => this.handleDrop(e)}
                onDragOver={e => this.handleDragOver(e)}
                onDragLeave={e => this.handleDragLeave(e)}
           >
               Drag here
           </div>
        </div>
      )
  };
}

export default DragAndDrop;
