import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";
import SunStatus from "./SunStatus";
import SearchHeader from "./SearchHeader";

class Main extends Component {
  state = {
    location: {},
    locTitle: "",
  };

  handleLocationChange = (location) => {

    // finds location lat & lng
    Geocode.setApiKey("AIzaSyC9S-WydkCAR1_pH8_ex9qClT0bb3EN1Bo");

    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        const location = { lat, lng };
        const locTitle = response.results[0].formatted_address;
        this.setState({ location, locTitle });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { location, locTitle } = this.state;
    return (
      <React.Fragment>
        <SearchHeader handleLocation={this.handleLocationChange}/>

        <SunStatus location={location} title={locTitle} />

        <Map
          google={this.props.google}
          zoom={14}
          style={{ width: "100%", height: "85%" }}
          center={location}
          initialCenter={{ lat: 44.4267674, lng: 26.1025384 }}
        >
          <Marker name={locTitle} position={location} />
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC9S-WydkCAR1_pH8_ex9qClT0bb3EN1Bo"
})(Main);
