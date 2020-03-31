import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import CustomInfoWindow from './CustomInfoWindow';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      homeowners: [],
      businessOwners: [],
      allowedItems: '',
      prohibitedItems: '',
      address: ''
    };
  }

  async componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users/";

    await axios.get(apiBaseUrl + "hosts?id=" + this.props.props.id, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
      if (response.data.success) {
        self.setState({ homeowners: response.data.homeowners, businessOwners: response.data.businessOwners })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  onMarkerClick = (props, marker, e) => {
    var address = props.options.location.address.concat(' ', props.options.location.city, ' ', props.options.location.state, ' ', props.options.location.zip.toString())
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      allowedItems: props.options.allowedItems,
      prohibitedItems: props.options.prohibitedItems,
      address: address
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderHomeownerMarkers() {
    return this.state.homeowners.map((homeowner, i) => {
      if (homeowner.isListingOn) {
        return <Marker
          key={i}
          title={homeowner.name.first.concat(" ", homeowner.name.last)}
          position={{ lat: homeowner.location.lat, lng: homeowner.location.long }}
          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" }}
          onClick={this.onMarkerClick}
          options={{
            allowedItems: homeowner.allowedItems,
            prohibitedItems: homeowner.prohibitedItems,
            location: homeowner.location,
            id: homeowner._id
          }}
        />
      }
    })
  }

  renderBusinessOwnerMarkers() {
    return this.state.businessOwners.map((businessOwner, i) => {
      if (businessOwner.isListingOn) {
        return <Marker
          key={i}
          title={businessOwner.name.first.concat(" ", businessOwner.name.last)}
          position={{ lat: businessOwner.location.lat, lng: businessOwner.location.long }}
          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png" }}
          onClick={this.onMarkerClick}
          options={{
            allowedItems: businessOwner.allowedItems,
            prohibitedItems: businessOwner.prohibitedItems,
            location: businessOwner.location,
            id: businessOwner._id
          }}
        />
      }
    })
  }

  message() {
    this.props.callback(this.state.selectedPlace.options.id)
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 30.266666, lng: -97.733330 }}
      >
        {this.renderHomeownerMarkers()}
        {this.renderBusinessOwnerMarkers()}
        <CustomInfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h3>{this.state.selectedPlace.title}</h3>
            <h4>{this.state.address}</h4>
            <span>Allowed Items: {this.state.allowedItems}</span>
            <br />
            <span>Prohibited Items: {this.state.prohibitedItems}</span>
            <br />
            <br />
            <button
              type="button"
              onClick={this.message.bind(this, this.state.selectedPlace)}
            >
              Message host
            </button>
          </div>
        </CustomInfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyByA8HpRS2kg5JWrU-zJ0UO_k2rBq2HyDw'
})(MapContainer);

const mapStyles = {
  width: '95%',
  height: '95vh',
};