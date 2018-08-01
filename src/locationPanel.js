import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp';


class LocationPanel extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		
		this.setState({ query:query.trim() })
	}

	render() {
		
		let listLocations
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			listLocations = this.props.locations.filter((loc) => match.test(loc.key))
		} else {
			listLocations = this.props.locations
		}
		console.log(this.props.locations)


		return(
			<div className='locations-panel'>
				<div className="search-locations">
			        <div className="search-locations-bar">
			              <div className="search-locations-input-wrapper">
			                <input 
			                	
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
				        <ol className='locations-list'>
				        	{listLocations.map((l) => 

				        		<li key={l.key} className='locations-list-item'>
				        		{l.key}
				        		</li>,

				        		)}
				        </ol>
		            </div>
		        </div>
		    </div>
		)
	}
		
}

export default LocationPanel;