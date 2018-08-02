import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js';
import LocationPanel from './locationPanel.js';
import FourSquareAPI from './FourSquareAPI.js';

const locations = [
  { key: 'vete-katten', position:  {lat: 59.33411, lng: 18.058331} },
  { key: 'sovel', position: {lat: 59.304716, lng:18.12365} },
  { key: 'johan&nystrom', position: {lat: 59.335335, lng:18.071341} },
  { key: 'fikabaren',position: {lat: 59.314437, lng: 18.079892 } },
  { key: 'its pleat', position: {lat: 59.333076, lng: 18.062543} }
]

class App extends Component {

  state = {
    items: []
  }
  
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
        <FourSquareAPI
        items={this.state.items}
        />

      </div>
    );
  }
}

export default App;
