import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';

class ListingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: '',
        city: '',
        state: '',
        zip: 0
      }
    }
  }
 
  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/profile?id=' + self.props.props.props.id).then(function(response) {
      if (response.data.success) {
        self.setState({
          location: {
            address: response.data.user.location.address,
            city: response.data.user.location.city,
            state: response.data.user.location.state,
            zip: response.data.user.location.zip
          }
        })
      }
    }).catch(function(error) {
      console.log(error)
    })
  }

  async udpate(event) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";
    
    var payload ={
      id: self.props.props.props.id,
      location: {
        "address": self.state.location.address,
        "city": self.state.location.city,
        "state": self.state.location.state,
        "zip": self.state.location.zip
      }
    }

    if (self.props.props.props.accountType == "Business Owner") {
      await axios.patch(apiBaseUrl + '/businessOwnerInfo', payload).then(function(response) {
        if (response.data.success) {
          alert("Listing address updated successfully.")
        }
      }).catch(function(error) {
        console.log(error)
      });
    } else if (self.props.props.props.accountType == "Homeowner") {
      await axios.patch(apiBaseUrl + '/homeownerInfo', payload).then(function(response) {
        if (response.data.success) {
          alert("Listing address updated successfully.")
        }
      }).catch(function(error) {
        console.log(error)
      });
    }
  }

  handleZipChange = (event) => {
    const inputZip = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, zip: inputZip } }))
  }

  handleAddress = (event) => {
    const inputAddress = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, address: inputAddress } }))
  }

  handleCity = (event) => {
    const inputCity = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, city: inputCity } }))
  }

  handleState = (event) => {
    const inputState = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, state: inputState } }))
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
          label="Street Address"
          fullWidth
          style={{ margin: 16 }}
          value={this.state.location.address}
          onChange={this.handleAddress}
        />
        <TextField
          autoFocus
          label="City"
          style={{ margin: 5 }}
          value={this.state.location.city}
          onChange={this.handleCity}
        />
        <TextField
          autoFocus
          label="State"
          style={{ margin: 5 }}
          value={this.state.location.state}
          onChange={this.handleState}
        />
        <TextField
          autoFocus
          label="Zip Code"
          type="number"
          style={{ margin: 5 }}
          value={this.state.location.zip}
          onChange={this.handleZipChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => this.udpate(event)}
        >Update Listing Address</Button>
      </ThemeProvider>
    )
  }
}

export default ListingAddress;