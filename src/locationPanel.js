import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';



class LocationPanel extends Component {

	//set prototypes to us from Map comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired,
		onSearchResultChanged: PropTypes.func.isRequired

	}

	state = {
		fikaSpotsState: [],
		query: ''
	}

	onLocationClick(id) {
		//console.log(id);
		//fix die!
		this.props.toggleFuncLoc(id)
/*		this.setState({
			fikaSpotsState: this.props.fikaSpots
		})*/

	}
	
	// function to udate state of query
	updateQuery = (query) => {
		
		this.setState({ query:query.trim() })
		this.setState({
			fikaSpotsState: this.props.fikaSpots
		})
		console.log(this.state.fikaSpotsState)
	}


	render() {

						//this is the search logic
		let listLocations
		if (this.state.query) {
			
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			listLocations = this.state.fikaSpotsState.filter((loc) => match.test(loc.name))
				console.log('hier')
				//call n funksie wat die groot funksie roep.
				for (let loc of listLocations) { 
					this.props.onSearchResultChangedFunc(listLocations, loc)
					//ek dink probeer die search deel in a aparte component
					//as jy daarna nogsteeds dieselfde error kry van not a function, 
					//probeer miskien dit in the app.js direk doen?
					//this.onLocationClick.bind(this, 1)
					//console.log(this.state.fikaSpotsState)
					console.log('daar')
				}
				//listLocations = this.state.fikaSpotsState

		} else {
			listLocations = this.state.fikaSpotsState
			//console.log(listLocations)
		}


		return(

			<div className='locations-panel'>

				<div className="search-locations">
				        <div className="search-locations-bar">
				              <div className="search-locations-input-wrapper">
				                <input 
				                	role={"search"}
				                	tabIndex={0}
				                	aria-labelledby={"text filter"}
				                	type="text" 
				                	placeholder="Search Coffee Shop"
				                	value={this.state.query}
				                	onChange={(event) => this.updateQuery(event.target.value)}
				                	/>
				              </div>
			            </div>  
			        </div>
				
				
		        <div className="search-locations-results">

		          	<div>
		          		{/* ordered list to render locations in  */}
				        <div className='locations-list'>
				        	{this.props.fikaSpots.map(l => {
				        		if (l.visible && l.showDetail) {
				        			return (
										<div key={l.fsid}
					        			id={l.id}
					        			role={"link"} 
					        			className='locations-list-item'
					        			onClick={this.onLocationClick.bind(this, l.id)}
					        			tabIndex={0}

					        			>
						        		{l.name}
							        	
							        		<div>
							        			{l.address}
							        		</div>
						        		</div>
									)
				        			
								} else if (l.visible) {
									return (
										<div key={l.fsid}
					        			id={l.id} 
					        			role={"link"} 
					        			className='locations-list-item'
					        			onClick={this.onLocationClick.bind(this, l.id)}
					        			tabindex={0}
					        			>
						        		{l.name}
							        	
						        		</div>
									)
								} 		
				        	}
				        		)}
				        </div>

		            </div>
		        </div>
		    </div>
		)
	}
		
}

export default LocationPanel;