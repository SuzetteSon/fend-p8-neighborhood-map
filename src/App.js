import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js';
import LocationPanel from './locationPanel.js';
import escapeRegExp from 'escape-string-regexp';

const fikaSpots = [
  { id: 1,
    name: 'Vete-katten', 
    position:  {lat: 59.33411, lng: 18.058331}, 
    ll: '59.33411, 18.058331',  
    address: 'Not updated from foursquare yet', 
    fsid: '4adcdaf2f964a520105c21e3',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    rating: 'Not updated from foursquare yet' },
  { id: 2,
    name: 'Sovel',
    position: {lat: 59.304716, lng:18.12365}, 
    ll: '59.304716, 18.12365', 
    address: 'Not updated from foursquare yet',  
    fsid: '577cdc65498eb9a4c4440707',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    rating: 'Not updated from foursquare yet' },
  { id: 3,
    name: 'Johan&Nystrom', 
    position: {lat: 59.335335, lng:18.071341}, 
    ll: '59.335335,18.071341',  
    address: 'Not updated from foursquare yet', 
    fsid: '591305e60f013c580ca919b7',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    rating: 'Not updated from foursquare yet'  },
  { id: 4,
    name: 'Fikabaren',
    position: {lat: 59.314437, lng: 18.079892 }, 
    ll: '59.314437, 18.079892 ',  
    address: 'Not updated from foursquare yet', 
    fsid: '57121614498ecf6b8e78f527',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    rating: 'Not updated from foursquare yet'    },
  { id: 5,
    name: 'Its pleat', 
    position: {lat: 59.333076, lng: 18.062543}, 
    ll: '59.333076, 18.062543',  
    address: 'Not updated from foursquare yet', 
    fsid: '5a203e9914994667b22c9d18',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    rating: 'Not updated from foursquare yet'    }
]

//set variables for foursquare API 
let errorHandling = '';
//add your foursquare clientid here
let clientID= '';
//add your foursquare clientsecret here
let clientSecret= '';
let today = new Date();
let foursquareAPIURL = 'https://api.foursquare.com/v2/venues/'

const responseFromFS = [];

class App extends Component {

  constructor(props) {
    super(props);
      this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue = this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue.bind(this)
      //essential for functions to work
  }

  state = {
    foursquareData: [],
    fikaSpotsState: [],
    apiError: false,
    errorFetch: '',
    query: ''
  }

  componentDidMount(){

    //setup date in the correct format for the foursquare api call
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //loop through each fikaspot and call foursquare
    for (const l of fikaSpots) {

      const fetchURL = foursquareAPIURL+l.fsid+ "/?limit=4&client_id=" + clientID +"&client_secret=" + clientSecret +"&v="+ year+month+day;

      fetch(fetchURL)
      .then(function(response) {
        if (response.status !== 200) {
          errorHandling = "Sorry data can't be loaded";
          return;
        }
        response.json().then(function(data) {
          //write responses to array
          responseFromFS.push(data.response.venue)
        });
      })
      .catch(function(err) {
        errorHandling = "Sorry data can't be loaded";

      })
/*      .then(response =>{
        this.setState({
                fikaSpotsState:fikaSpots
            })
      });*/
    }
  }

  //functions

  //function to set hide all showDetails properties of fikaSpots
  setAllShowDetailsToFalse() {
    for (const f of fikaSpots) {
      f.showDetail = false
    }
  }

  //function to set all activeMarker properties to false
  setAllShowActiveMarkersToFalse() {
    for (const f of fikaSpots) {
      f.showActiveMarker = false
    }
  }

  //function to set the current activeMarker to true
  setThisShowActiveMarkerToTrue(id) {
    for (const f of fikaSpots) {
      if (f.id === id) {
        f.showActiveMarker = true
      }
    }
  }

  //function to set only the current fika spot's details to show
  setThisShowActiveDetailToTrue(id) {
    for (const f of fikaSpots) {
      if (f.id === id) {
        f.showDetail = true
      }
    }
  }

  //function  to call other functions to set only the current 
  //fika spot to show details and show active marker true
  setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue(id) {
    this.setAllShowDetailsToFalse();
    this.setAllShowActiveMarkersToFalse();
    this.setThisShowActiveDetailToTrue(id);
    this.setThisShowActiveMarkerToTrue(id);
    this.setState({
    fikaSpotsState:fikaSpots
    })
    //essential for communication between componenents
  }

  //function to set all items to invisible
  setAllVisibilityToFalse() {
    for (const f of fikaSpots) {
      f.visible = false
    }
  }

  //function to set the active item to visible
  setFikaSpotVisibilityToTrue = (id) => {
    for (const f of fikaSpots) {
      if (f.id === id) {
        f.visible = true
      }
    }
  }

  // function to udate state of query of input
  updateQuery = (query) => {
    this.setState({ query:query.trim() })
  }

  render() {
    //loop through and match the results in the two arrays on ID in order to add the info 
    //from foursquare
    for (const l of fikaSpots) {
      if(responseFromFS){
        for (const i of responseFromFS) {
          if (i.id === l.fsid) {
                l.name = i.name
                l.address = i.location.address
                l.rating = i.rating
              }
        }
      }
    }

    //this is the search functionality
    let searchResults;
    if (this.state.query) {
      
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      searchResults = fikaSpots.filter((loc) => match.test(loc.name))
      //cal function that sets all the items in fikaSpots to invisible
      this.setAllVisibilityToFalse()
      
      for(let sresults of searchResults){
        //cal function that sets the current item to visible
        this.setFikaSpotVisibilityToTrue(sresults.id)
      }
    }

    return (
      
      <div className="App">
            <div className='app-title'>
              <h3>"Best 'Fika' spots in Stockholm"</h3>
              <span>Fika is considered a social institution in Sweden;
              it means having a break, most often a coffee break, 
              with one's colleagues, friends, date or family. Source:
              <a href='https://sv.wikipedia.org/wiki/Fika'> Wikipedia</a>
              </span>
            </div>

        <div className="search-locations" id='location'>
            <div className="search-locations-bar">
                <div className="search-locations-input-wrapper" id='input'>
                    <input
                        role={"search"}
                        tabIndex={0}
                        aria-labelledby={"location input"}
                        type="text" 
                        placeholder="Search Coffee Shop"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        onLoad={(event) => this.updateQuery(event.target.value)}
                        />
                </div>
              </div>  
          </div>

          <MapComp
          fikaSpots={fikaSpots}
          // to export a function with a parameter
          toggleFunc={this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue}
          />

          <LocationPanel
            fikaSpots={fikaSpots}
            // to export a function with a parameter
            toggleFuncLoc={this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue}
            setAllVisibilityToFalseFunc={this.setAllVisibilityToFalse}
            // to export a function with a parameter
            setFikaSpotVisibilityToTrueFunc={this.setFikaSpotVisibilityToTrue}
          />

        <footer>
        Additional information provided by FourSquare API 
          <div>
          {errorHandling}
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
