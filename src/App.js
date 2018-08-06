import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js'
import LocationPanel from './locationPanel.js'

function gm_authFailure(){
  alert('Failed to load Google Maps, try refreshig the page')
}

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
    descriptionFromFoursquare: '' },
  { id: 2,
    name: 'Sovel',
    position: {lat: 59.304716, lng:18.12365}, 
    ll: '59.304716, 18.12365', 
    address: 'Not updated from foursquare yet',  
    fsid: '577cdc65498eb9a4c4440707',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    descriptionFromFoursquare: '' },
  { id: 3,
    name: 'Johan&Nystrom', 
    position: {lat: 59.335335, lng:18.071341}, 
    ll: '59.335335,18.071341',  
    address: 'Not updated from foursquare yet', 
    fsid: '591305e60f013c580ca919b7',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    descriptionFromFoursquare: ''  },
  { id: 4,
    name: 'Fikabaren',
    position: {lat: 59.314437, lng: 18.079892 }, 
    ll: '59.314437, 18.079892 ',  
    address: 'Not updated from foursquare yet', 
    fsid: '57121614498ecf6b8e78f527',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    descriptionFromFoursquare: ''    },
  { id: 5,
    name: 'Its pleat', 
    position: {lat: 59.333076, lng: 18.062543}, 
    ll: '59.333076, 18.062543',  
    address: 'Not updated from foursquare yet', 
    fsid: '5a203e9914994667b22c9d18',
    visible: true,
    showDetail: false,
    showActiveMarker: false,
    descriptionFromFoursquare: ''    }
]

//set variables for foursquare API 
let errorHandling = '';
let clientID= 'SV5JL5T2WASNUJIMCKIENROXLO1PT1NPCPXWK2JTBXKCBBAE';
let clientSecret= 'XDWX1M35EQDDJVTHJRXUSAGPNYSXZ5SGQY3QNIOXWXSHLSNG';
let today = new Date();
let foursquareAPIURL = 'https://api.foursquare.com/v2/venues/'

const tempTest = [];


class App extends Component {

  constructor(props) {
    super(props);
      this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue = this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue.bind(this)
      this.state={
        data: ""
      }
  }

  state = {
    foursquareData: [],
    fikaSpotsState: [],
    apiError: false,
    errorFetch: ''
  }

  componentDidMount(){
 //loop through all locations from app.js and set the parameters to the ones needed 
    //for the foursquare api call. This is just a simple call, 
    //that send through the name and lat and long and gets all the matches.
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //return [year, month, day].join('')
    for (const l of fikaSpots) {

      const fetchURL = foursquareAPIURL+l.fsid+ "/?limit=4&client_id=" + clientID +"&client_secret=" + clientSecret +"&v="+ year+month+day;

      fetch(fetchURL)
      .then(function(response) {
        if (response.status !== 200) {
          errorHandling = "Sorry data can't be loaded";
          return;
        }
        response.json().then(function(data) {
          console.log(data.response.venue);
          //write responses to array
          tempTest.push(data.response.venue)
          console.log(tempTest);
        });
      })
      .catch(function(err) {
        errorHandling = "Sorry data can't be loaded";
      });

/*      foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ foursquareData: res.response.venues })
      })*/
      
    }
  }


  //functions

  //function to set hide all showDetails properties of fikaSpots
  setAllShowDetailsToFalse() {
    for (const f of fikaSpots) {
      f.showDetail = false
      //console.log(f)
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
        //console.log('id hier')
        f.showDetail = true
      }
    }
  }


  //function  to call other functions to set only the current 
  //fika spot to show details and show active marker tue
  setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue(id) {
    //console.log('called for ' + id);
    this.setAllShowDetailsToFalse();
    this.setAllShowActiveMarkersToFalse();
    this.setThisShowActiveDetailToTrue(id);
    this.setThisShowActiveMarkerToTrue(id);
    //console.log('done', fikaSpots);
    //this.forceUpdate()
    this.setState({
    fikaSpotsState:fikaSpots
    })
  }

  setAllVisibilityToFalse() {
    for (const f of fikaSpots) {
      f.visible = false
      console.log('all visibility false')
    }
  }

  setFikaSpotVisibilityToTrue(id) {
    for (const f of fikaSpots) {
      if (f.id === id) {
        console.log(id + 'visible')
        f.visible = true
      }
    }
  }

/*  showCurrentSearchResults(searchResults) {
    console.log('called for ', searchResults);
    this.setAllVisibilityToFalse()
    for (const a of searchResults ) {
      this.setFikaSpotVisibilityToTrue(a.id)
      console.log('visibility set to true')
    }
    console.log('show current search results completed')
/*    this.setState({
    fikaSpotsState:searchResults
    })
  }*/

  onSearchResultChanged = (searchResults, item) => {
    //console.log(SearchResults);
    //ek weet nie of bind hier reg is nie
    //this.props.showCurrentSearchResultsFunc(searchResults)
    //doen direk wat in daai f moet gebeur
    for (const f of this.state.fikaSpotsState) {
          f.visible = false
          //console.log('all visibility false')
          console.log(this.state.fikaSpotsState)
      }
      for (const item of searchResults) {
        item.visible = true
      }
/*    this.setState({
        fikaSpotsState:searchResults
      })*/


  }

  render() {
    //loop through and match the results in the two arrays on ID in order to add the address 
    //from foursquare
    
    for (const l of fikaSpots) {
      if(tempTest){
        for (const i of tempTest) {
          if (i.id === l.fsid) {
                l.name = i.name
                l.address = i.location.address
                l.descriptionFromFoursquare = i.description
              }
        }
      }
    }

 
    return (
      
      <div className="App">
        {console.log(fikaSpots)}
            <div className='app-title'>
              <h3>"Best 'Fika' spots in Stockholm"</h3>
              <span>Fika is considered a social institution in Sweden;
              it means having a break, most often a coffee break, 
              with one's colleagues, friends, date or family. Source:
              <a href='https://sv.wikipedia.org/wiki/Fika'> Wikipedia</a>
              </span>

            </div>


        <MapComp
          fikaSpots={fikaSpots}
          // to export a function with a parameter
          toggleFunc={this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue}


        />
        <LocationPanel
          fikaSpots={fikaSpots}
          toggleFuncLoc={this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue}
          onSearchResultChangedFunc={this.onSearchResultChanged}

        />
        <div>
          {this.state.apiError && <h1>{this.state.errorFetch}</h1>}
        </div>
        <footer>
        Address information provided by FourSquare API
        </footer>



      </div>
    )
  
  }
}

export default App;
