import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js'
import LocationPanel from './locationPanel.js'

class App extends Component {

  state ={
    locations: []
  }

  render() {
    return (
      <div className="App">
      <MapComp
      />
      <LocationPanel
      locations={this.state.locations}
      />

      </div>
    );
  }
}

export default App;
