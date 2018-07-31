import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js';
import LocationPanel from './locationPanel.js';
//import MapMarker from './mapMarker.js';

const locations = [
  { key: 'vete-katten', lat: 59.33411, lng: 18.058331 },
  { key: 'sovel', lat: 59.304716, lng:18.12365 },
  { key: 'johan&nystrom', lat: 59.335335, lng:18.071341 },
  { key: 'fikabaren', lat: 59.314437, lng: 18.079892 },
  { key: 'its pleat', lat: 59.333076, lng: 18.062543}
]

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className='app-header'>
            <h2 className='app-title'>
              {"Best 'Fika' spots in Stockholm"}
              <span>Fika is considered a social institution in Sweden;
              it means having a break, most often a coffee break, 
              with one's colleagues, friends, date or family.
              </span>
            </h2>
          </div>
      <MapComp
      locations={locations}
      />

      <LocationPanel
      locations={locations}
      />

      </div>
    );
  }
}

export default App;
