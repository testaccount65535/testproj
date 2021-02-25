import React from 'react';
import './LogViewer.css'

class LogViewer extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        filters: []
      }
  }

  get receivedEventsFilter ()  { return (x) => x[0].match(/Received event/) };
  get libchatEventFilter () { return (x) => x[0].match(/LibChatEvent/) }
  get sentFilter () { return (x) => x[0].match(/\(SENT\)/) };
  get returnFilter() { return (x) => x[0].match(/\: \(RETURN\)/) };
  get ThreadHistory() { return (x) => x[0].match(/ThreadHistory/) };

  libchatReplaces = (x) => x.map(y => ["["+y[0].replace(/\W*\d{4,5}\W*\d{4,5}\W+.\W+\w+.+(\])/, "$1").replace(/\d\d-\d\d /, ""), y[1]])

  get libchatMetaFilters () { return (x) => x.match(/\[\d\d:\d\d:\d\d\.\d\d\d\]/)}
  get libchatFilters () { return [this.receivedEventsFilter, this.libchatEventFilter, this.sentFilter, this.returnFilter, this.ThreadHistory] }

  buildList() {
    var lines = this.props.lines.filter(this.libchatMetaFilters);
    lines = lines.filter(x => this.libchatFilters.map(y => { 
        return y([x,0]) 
    }).some(x => !!x)).map((x, c) => [x, c]);
    
    if (lines) lines = this.libchatReplaces(lines);

    if (this.state.filters.length > 0) {
        var tempFilteredItems = [];
        this.state.filters.map(x => tempFilteredItems.push(...lines.filter(x)));
        
        tempFilteredItems = tempFilteredItems.sort((x, c) => x[1] < c[1] ? -1 : 1);

        lines = tempFilteredItems;
    }

    return lines.map((x, i) => {
        return <div key={i}>{x[0]}</div>
    });
  }

  filterToggled = (filter) => this.state.filters.some(x=>(""+x).includes(filter))

  toggleFilter(filter, func) {
      if (!this.filterToggled(filter)) { 
          this.setState({filters: [...this.state.filters, func]}); 
        }
      else {
          this.setState({filters: [...this.state.filters.filter(x => !(""+x).includes(filter))]})
      }
  }

  render() {
    return (
    <div className="LogViewer">
        <button className={this.filterToggled("SENT") ? "ButtonActive" : ""} onClick={this.toggleFilter.bind(this, "SENT", this.sentFilter)}>Sent</button>
        <button className={this.filterToggled("LibChatEvent") ? "ButtonActive" : ""} onClick={this.toggleFilter.bind(this, "LibChatEvent", this.libchatEventFilter)}>LibChatEvent</button>
        <button className={this.filterToggled("Received event") ? "ButtonActive" : ""} onClick={this.toggleFilter.bind(this, "Received event", this.receivedEventsFilter)}>Received event</button>
        <button className={this.filterToggled("RETURN") ? "ButtonActive" : ""} onClick={this.toggleFilter.bind(this, "RETURN", this.returnFilter)}>Return</button>
        <button className={this.filterToggled("ThreadHistory") ? "ButtonActive" : ""} onClick={this.toggleFilter.bind(this, "ThreadHistory", this.ThreadHistory)}>Thread History</button>
        {this.buildList()}
    </div>)
  };
}

export default LogViewer;
