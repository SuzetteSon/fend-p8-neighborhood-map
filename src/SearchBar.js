import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

class SearchBar extends Component {

	//set prototypes to us from App comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired,
		showCurrentSearchResults: PropTypes.func.isRequired,
		fikaSpotsState: PropTypes.array.isRequired
	}

	state = {
		fikaSpotsState: this.props.fikaSpots,
		query: ''
	}

	onSearchResultChanged = (searchResults, item) => {
		//console.log(SearchResults);
		//ek weet nie of bind hier reg is nie
		//this.props.showCurrentSearchResultsFunc(searchResults)
		//doen direk wat in daai f moet gebeur
		for (const f of this.props.fikaSpots) {
      		f.visible = false
      		//console.log('all visibility false')
    	}
    	for (const item of searchResults) {
	      item.visible = true
    }
		//console.log('SearchResults klaar');
		console.log(searchResults);


	}


	// function to udate state of query
	updateQuery = (query) => {
		
		this.setState({ query:query.trim() })
/*		this.setState({
			fikaSpotsState: this.props.fikaSpotsState
		})*/
	}

	render(){

				//this is the search logic
		let listLocations
		if (this.state.query) {
			
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			listLocations = this.state.fikaSpotsState.filter((loc) => match.test(loc.name))
			//console.log('hier')
				//call n funksie wat die groot funksie roep.
				for (let loc of listLocations) { 
					this.onSearchResultChanged(listLocations, loc)
					//ek dink probeer die search deel in a aparte component
					//as jy daarna nogsteeds dieselfde error kry van not a function, 
					//probeer miskien dit in the app.js direk doen?
					//this.onLocationClick.bind(this, 1)
					console.log(this.state.fikaSpotsState)
				}
				listLocations = this.state.fikaSpotsState
			

			

		} else {
			listLocations = this.state.fikaSpotsState
			//console.log(listLocations)
		}

		return (

			<div>
				<div className="search-locations">
				        <div className="search-locations-bar">
				              <div className="search-locations-input-wrapper">
				                <input 
				                	role={"search"}
				                	tabindex={0}
				                	aria-labelledby={"text filter"}
				                	type="text" 
				                	placeholder="Search Coffee Shop"
				                	value={this.state.query}
				                	onChange={(event) => this.updateQuery(event.target.value)}
				                	/>
				              </div>
			            </div>  
			        </div>
			</div>


			)
	}
}

export default SearchBar