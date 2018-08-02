import React, { Component } from 'react';


const foursquare = require ('react-foursquare') ({
	clientID: 'DOPTD1QU1GPIORPPZCWFWGNPFT4QSJYXTGRTRXZ4YE21UPA0',
	clientSecret: 'TST51RI3C3FRZLKIEFQEN3L50GFRMVOG0GGWJKFNWY1FE1OR'
})

const params = {
	'll': '59.33411, 18.058331',
	'query': 'vete-katten'
}

class FourSquareAPI extends Component {

	state = {
		showingItems: []
	}

	componentDidMount(){
		foursquare.venues.getVenues(params)
		.then(res=> {
			this.setState({ showingItems: res.response.venues })
		});
	}

	render() {

		


		this.state.showingItems.length = 1;
		//console.log(this.state.showingItems)

		return (
				<div>
					<div>Items:</div>
					{ this.state.showingItems.map(item=> {
						return (
							<div key={item.id} className='apiDiv'>
								<ul>
									<li>Name: {item.name}</li>
									<li>Address: {item.location.address}</li>
									<li>Current customers: {item.hereNow.summary}</li>
								</ul>
									
							</div>
							) }) }

				</div>
			)
	}
}
export default FourSquareAPI