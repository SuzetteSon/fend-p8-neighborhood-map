import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

let searchResults

class LocationPanel extends Component {

	//set prototypes to us from Map comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired,
		setFikaSpotVisibilityToTrue: PropTypes.func.isRequired,
		setAllVisibilityToFalse: PropTypes.func.isRequired
	}

	state = {
		fikaSpotsState: searchResults,
		query: ''
	}

	onLocationClick(id) {
		this.props.toggleFuncLoc(id)
	}
	
	// function to udate state of query
	updateQuery = (query) => {

		
		this.setState({ query:query.trim() })
		this.setState({
			fikaSpotsState: this.props.fikaSpots
		})
		//seem nie meer nodig nie

	}

	render() {

		//this is the search functionality
		

		if (this.state.query) {
			
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			searchResults = this.props.fikaSpots.filter((loc) => match.test(loc.name))
			//console.log(this.props.fikaSpots)	
			this.props.setAllVisibilityToFalseFunc()
			//console.log(this.props.fikaSpots)
			
			for(let sresults of searchResults){
				this.props.setFikaSpotVisibilityToTrueFunc(sresults.id)
			}
			console.log(this.props.fikaSpots)

		} /*else {
			searchResults = this.state.fikaSpotsState
		}*/

		return(

			<div className='locations-panel'>

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
							        			<div className='loc-info' tabIndex={0}>
							        				Address: {l.address}
							        				
							        			</div>
							        			
							        			<div className='loc-info' tabIndex={0}>
							        				FourSquare Rating: { l.rating}
							        				
							        			</div>
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
					        			tabIndex={0}
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