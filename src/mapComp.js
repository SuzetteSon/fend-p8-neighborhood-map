import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'

const NameComp = ({text}) => <div>{text}</div>;

class MapComp extends Component {
	static defaultProps = {
		center: { lat: 59.329323, lng: 18.068581},
		zoom: 13
	}

	render() {
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
				</GoogleMapReact>
			</div>
		)
	}
}
export default MapComp