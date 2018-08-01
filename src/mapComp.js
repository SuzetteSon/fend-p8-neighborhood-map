import React, {Component} from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


class MapComp extends Component {

	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
		//click: false
	}
	

	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

	}

	mapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null

			})
		}
	}

	onOpen =  (props) => {
		if (this.state.onOpen) {
			this.setState({
				showingInfoWindow: true
			})
		}
	}

	render() {

		//const showLocations = this.props.locations;
		const pos = { lat: 59.329323, lng: 18.068581 }
		
		const style = {
			height: '100vh',
  			width: '50%',
  			float: 'right',
  			position: 'relative'
		};

		return (
			<Map className='google-map'

					style={style}
					google = {this.props.google}
					onClick={this.mapClicked}
					initialCenter={{ lat: 59.329323, lng: 18.068581 }}
					zoom={14}
					>
	            		
							<Marker 
								//key={l.key}
								position={pos}
								onClick={this.onMarkerClick}
								name={'Current'}
								 />
							
								<InfoWindow
									//onOpenClick={this.onOpen}
									//onCloseClick={this.closedWindow}
									//className='info-window'
									//position={l.position}
									marker={this.state.activeMarker}
									visible={this.state.showingInfoWindow}
									>
										<div>
											<h3>{this.state.selectedPlace.name}</h3>
											{console.log(this.state.selectedPlace.name)}
										</div>
								
								</InfoWindow>
			</Map>
		)
	}
}
export default GoogleApiWrapper({
	apiKey: 'AIzaSyB22o9GOGwBbO3u6tUacs4or8gxnFmI9jU'
})(MapComp)
