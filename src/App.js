import React, { Component } from 'react';
import './App.css';
import MapComp from './mapComp.js'



const fikaSpots = [
  { id: 1,
    name: 'vete-katten', 
    position:  {lat: 59.33411, lng: 18.058331}, 
    ll: '59.33411, 18.058331',  
    address: 'Not updated from foursquare yet', 
    fsid: '4adcdaf2f964a520105c21e3',
    visible: true,
    showDetail: false,
    showActiveMarker: false },
  { id: 2,
    name: 'sovel',
    position: {lat: 59.304716, lng:18.12365}, 
    ll: '59.304716, 18.12365', 
    address: 'Not updated from foursquare yet',  
    fsid: '577cdc65498eb9a4c4440707',
    visible: true,
    showDetail: false,
    showActiveMarker: false },
  { id: 3,
    name: 'johan&nystrom', 
    position: {lat: 59.335335, lng:18.071341}, 
    ll: '59.335335,18.071341',  
    address: 'Not updated from foursquare yet', 
    fsid: '591305e60f013c580ca919b7',
    visible: true,
    showDetail: false,
    showActiveMarker: false  },
  { id: 4,
    name: 'fikabaren',
    position: {lat: 59.314437, lng: 18.079892 }, 
    ll: '59.314437, 18.079892 ',  
    address: 'Not updated from foursquare yet', 
    fsid: '57121614498ecf6b8e78f527',
    visible: true,
    showDetail: false,
    showActiveMarker: false    },
  { id: 5,
    name: 'its pleat', 
    position: {lat: 59.333076, lng: 18.062543}, 
    ll: '59.333076, 18.062543',  
    address: 'Not updated from foursquare yet', 
    fsid: '5a203e9914994667b22c9d18',
    visible: true,
    showDetail: false,
    showActiveMarker: false    }
]

//set variable for API ids
const foursquare = require ('react-foursquare') ({
  clientID: 'DOPTD1QU1GPIORPPZCWFWGNPFT4QSJYXTGRTRXZ4YE21UPA0',
  clientSecret: 'TST51RI3C3FRZLKIEFQEN3L50GFRMVOG0GGWJKFNWY1FE1OR'
});




class App extends Component {

  constructor(props) {
    super(props);

      this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue = this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue.bind(this)
  }

  state = {
    foursquareData: [],
    fikaSpots: []
  }
  

  componentDidMount(){
    //loop through all locations from app.js and set the parameters to the ones needed 
    //for the foursquare api call. This is just a simple call, 
    //that send through the name and lat and long and gets all the matches.
    this.state.fikaSpots = fikaSpots
    for (const l of fikaSpots) {
      const params = {}
      params['query'] = l.key
      params['ll'] = l.ll

      foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ foursquareData: res.response.venues })
      })
    }
  }


  
/*  componentDidMount() {

    for (const l of fikaSpots) {
      const params = {}
      params['query'] = l.key
      params['ll'] = l.ll


      foursquare.venues.getVenues(params)
      .then(response  => {
        if(!response.ok) { throw response }
          return response
        }).then( (data) => {
        this.setState({ foursquareData: data.response.venues });
        })
      .catch( err => {
        console.log('iets');
      })
    }
  }*/

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
    console.log('called for ' + id);
    this.setAllShowDetailsToFalse();
    this.setAllShowActiveMarkersToFalse();
    this.setThisShowActiveDetailToTrue(id);
    this.setThisShowActiveMarkerToTrue(id);
    console.log('done', fikaSpots);
  }




  render() {
    //loop through and match the results in the two arrays on ID in order to add the address 
    //from foursquare
    
    for (const l of fikaSpots) {
      for (const i of this.state.foursquareData) {
        if (i.id === l.fsid) {
              l.name = i.name
              l.address = i.location.address
              //console.log('match')
            }
      }
    }

 
    return (
      
      <div className="App">
        {console.log(fikaSpots)}
        


        <MapComp
          fikaSpots={fikaSpots}
          // to export a function with a parameter
          toggleFunc={this.setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue}

        />




      </div>
    )
  
  }
}

export default App;
