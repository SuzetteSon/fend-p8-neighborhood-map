import React, {Component} from 'react';
import PropTypes from 'prop-types';


class LocationPanel extends Component {

	//set prototypes to us from Map comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired
	}

	state = {
		fikaSpotsStateLoc: []
	}

	onLocationClick(id) {
		console.log(id);
		//fix die!
		this.props.toggleFuncLoc(id)
		this.setState({
			fikaSpotsStateLoc: this.props.fikaSpots
		})
		//this.forceUpdate()
	}


	render() {

		//change the state from fikaSpots on App comp to fikaSpots on this comp
		this.state.fikaSpotsStateLoc = this.props.fikaSpots

	
		return(

			<div className='locations-panel'>
				
		        <div className="search-locations-results">

		          	<div>
		          		{/* ordered list to render locations in  */}
				        <div className='locations-list'>
				        	{this.state.fikaSpotsStateLoc.map(l => {
				        		if (l.visible && l.showDetail) {
				        			return (
										<div key={l.fsid}
					        			id={l.id} 
					        			className='locations-list-item'
					        			onClick={this.onLocationClick.bind(this, l.id)}

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
					        			className='locations-list-item'
					        			onClick={this.onLocationClick.bind(this, l.id)}
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