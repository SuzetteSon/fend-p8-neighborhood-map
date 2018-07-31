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

		
		const Marker = ({ text }) => <div className='marker'>{text}</div>;
		//const SecondMarker = ({text}) =><div>{text}</div>;
		const showLocations = this.props.locations;
		

		return (
			<div className='google-map'>

				
		{/*any components to appear on the map, to be wrapped in GoogleMapReact */}
				<GoogleMapReact
					bootstrapURLKeys={{key: 'AIzaSyB22o9GOGwBbO3u6tUacs4or8gxnFmI9jU'}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					
					onChildMouseEnter={this.onChildMouseEnter}
					onChildMouseLeave={this.onChildMouseLeave}

					>

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
							>
							
								<img
									alt={'rocket'}
									src={'http://www.kwikplum.co.za/images/bakkie.jpg'}/>
							
							
							
							
								
							
							
						</Marker>

					
				))}
				</GoogleMapReact>
			</div>
		)
	}
}
export default MapComp;