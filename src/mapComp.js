import React, {Component} from 'react';
import { GoogleApiWrapper,  Map, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

class MapComp extends Component {

	//set prototypes to use from App comp
	static protoTypes = {
		fikaSpots: PropTypes.array.isRequired,
		setOnlyCurrentFikaSpotToShowDetailsAndShowActiveMarkerToTrue: PropTypes.func.isRequired,
	}

	state = {
		fikaSpotsState: this.props.fikaSpots,
		//essential for map markers to show on load
	}
	//function to alert when google maps api is not working
	gm_authFailure() {
	  alert('Unfortunately, the map could not be loaded at this time :( Try again later.')
	}

	componentDidMount() {
		window.gm_authFailure = this.gm_authFailure;
	}

	onMarkerClick = (props, marker, e) => {
		//cal function from App.js line 162
		this.props.toggleFunc(marker.name)
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
				<Map 
					className='google-map'
					google = {this.props.google}
					initialCenter={{ lat: 59.329323, lng: 18.068581 }}
					zoom={12.5}
					role={"application"}
					>
				{/* map through fikaSpots to render  */}
					{this.props.fikaSpots.map(l => { //load as active and visible marker as green
						if ((l.visible === true)&&(l.showActiveMarker === true)) {
							return <Marker 
									key={l.fsid}
									name={l.id} 
									title={l.name}
									position={l.position} 
									onClick={this.onMarkerClick}
									icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
									> 
									</Marker>
						}
						else if (l.visible === true) { //load visible marker only as red
							return <Marker 
									key={l.fsid}
									name={l.id} 
									title={l.name}
									position={l.position} 
									onClick={this.onMarkerClick}
									icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
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
	apiKey: '' // add your google map id here
})(MapComp)