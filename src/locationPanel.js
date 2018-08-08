import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LocationPanel extends Component {

	//set prototypes to use from App comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired,
		setFikaSpotVisibilityToTrue: PropTypes.func.isRequired,
		setAllVisibilityToFalse: PropTypes.func.isRequired
	}

	state = {
		fikaSpotsState: [],
		query: ''
	}

	onLocationClick(id) {
		//cal function from App.js line 162
		this.props.toggleFuncLoc(id)
	}
	
	render() {

		return(
			<div className='locations-panel'>			
		        <div className="search-locations-results">
		          	<div>
		          		{/* div to render locations in  */}
				        <div className='locations-list'>
				        	{this.props.fikaSpots.map(l => {
				        		if (l.visible && l.showDetail) { // only render when visible & details are shown 
				        			return (
										<div key={l.fsid}
					        			id={l.id}
					        			role={"link"} 
					        			className='locations-list-item'
					        			onClick={this.onLocationClick.bind(this, l.id)}
					        			tabIndex={0}
					        			>
						        		{l.name}
							        	{/* div to render additional info in  */}
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
				        			
								} else if (l.visible) { //only render when visible
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