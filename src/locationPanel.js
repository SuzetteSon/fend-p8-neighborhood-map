import React, {Component} from 'react';
import PropTypes from 'prop-types';


class LocationPanel extends Component {

	//set prototypes to us from Map comp
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
		this.props.toggleFuncLoc(id)
	}
	


	render() {



		return(

			<div className='locations-panel'>
				
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