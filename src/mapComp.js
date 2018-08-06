import React, {Component} from 'react';
import { GoogleApiWrapper,  Map, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

class MapComp extends Component {

	//set prototypes to us from Map comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired

	}

	//set new empty state for fikaSpots array
	state = {
		fikaSpotsState: this.props.fikaSpots
	}

	onMarkerClick = (props, marker, e) => {
		this.props.toggleFunc(marker.name)
		this.setState({
			fikaSpotsState: this.props.fikaSpots
		})	
	}


	render() {

		
		const style = {
			height: '100vh',
  			width: '50%',
  			cssFloat: 'right'
		};

		return (
			<div className='map-container'
				style={style}
				aria-label={"mapbox map"}>
				<Map className='google-map'

						google = {this.props.google}
						initialCenter={{ lat: 59.329323, lng: 18.068581 }}
						zoom={12.5}
						role={"application"}
						>
						{this.state.fikaSpotsState.map(l => { //load as active and visible marker
							if ((l.visible === true)&&(l.showActiveMarker === true)) {
								return <Marker 
										key={l.fsid}
										name={l.id} 
										title={l.name}
										position={l.position} 
										onClick={this.onMarkerClick}
										icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
										role={"landmark"}
										> 

									</Marker>
							}
							else if (l.visible === true) { //load visible marker only
								return <Marker 
										key={l.fsid}
										name={l.id} 
										title={l.name}
										position={l.position} 
										onClick={this.onMarkerClick}
										icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
										role={"landmark"}
										> 

									</Marker>
							} 
						}
					        		)}

	                				
				</Map>

			</div>


		)
	}
}
export default GoogleApiWrapper({
	apiKey: 'AIzaSyB22o9GOGwBbO3u6tUacs4or8gxnFmI9jU'
})(MapComp)


