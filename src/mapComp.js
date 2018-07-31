import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const NameComp = ({text}) => <div>{text}</div>;


class MapComp extends Component {
	static defaultProps = {
		center: { lat: 59.329323, lng: 18.068581},
		zoom: 13
	};

	static propTypes = {
		locations: PropTypes.array.isRequired
	};

	render() {

		
		const Marker = ({ text }) => <div>{text}</div>;
		//const SecondMarker = ({text}) =><div>{text}</div>;
		const showLocations = this.props.locations;
		console.log(showLocations);

		return (
			<div className='google-map'>
				
		{/*any components to appear on the map, to be wrapped in GoogleMapReact */}
				<GoogleMapReact
				bootstrapURLKeys={{key: 'AIzaSyB22o9GOGwBbO3u6tUacs4or8gxnFmI9jU'}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}>
					<NameComp
						lat={59.329323}
	            		lng={18.068581}
	            		text={'Hello Stockholm'}
	            		/>

	            	{showLocations.map((l) => (
						<Marker 
							key={l.key}
							lat={l.lat}
		            		lng={l.lng}
							text={l.key}
								>{console.log(l.key)}
						</Marker>

					
				))}
	            	
					{/*<FirstMarker
						key={'vetekatten'}
						lat={59.33411}
		            	lng={18.058331}
						text={'vete-katten'}
						>{console.log('FirstMarker')}
					</FirstMarker>*/}


	            	
	            	

				</GoogleMapReact>
			</div>
		)
	}
}
export default MapComp;