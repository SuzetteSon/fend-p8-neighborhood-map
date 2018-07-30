import React, {Component} from 'react'

class LocationPanel extends Component {

	render() {
		return(
			<div>
				<div className="search-locations">
			        <div className="search-locations-bar">
			              <div className="search-locations-input-wrapper">
			                <input 
			                	type="text" 
			                	placeholder="Search location"
			                	/>
			              </div>
		            </div>  
		        </div>

		        <div className="search-locations-results">

		          	<div>
		          		{/* ordered list to render locations in  */}
				        <ol className='locations-grid'>

				        </ol>
		            </div>
		        </div>
		    </div>
		)
	}
		
}

export default LocationPanel