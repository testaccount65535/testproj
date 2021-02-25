import './Main.css';
import LogViewer from './LogViewer';
import React from 'react';
import DragAndDrop from './DragAndDrop'

class Main extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        lines: null,
        file: null,
        processing: false
    }
  }

  handleDropped(file) {
    this.setState({file})

    file.text().then(text => {
        var lines = text.split('\n');

        lines = lines.slice(lines.indexOf("--------- beginning of system") + 1);
    
        this.setState({lines: lines});
    })
  }

  render() {
      return (
        <div className="Main">
            <header className="Main-header">
                {this.state.lines && this.state.lines.length > 0 ? 
                <LogViewer lines={this.state.lines} /> : 
                <DragAndDrop handleDropped={this.handleDropped.bind(this)} />}
                
            </header>
        </div>
      )
  };
}

export default Main;
