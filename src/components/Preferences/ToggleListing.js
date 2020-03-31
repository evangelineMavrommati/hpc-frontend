import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

class ToggleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListed: true
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/isListingOn?id=' + this.props.props.props.id).then(function(response) {
      if (response.data.success) {
        self.setState({ isListed: response.data.isListingOn })
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  async toggle() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    var payload = {
      "id": this.props.props.props.id
    }

    if (!this.state.isListed) {
      await axios.patch(apiBaseUrl + '/enableListing', payload).then(function(response) {
        if (response.data.success) {
          alert("You are now being listed as active")
        }
      }).catch(function(error) {
        console.log(error)
      })
    } else if (this.state.isListed) {
      await axios.patch(apiBaseUrl + '/disableListing', payload).then(function(response) {
        if(response.data.success) {
          alert("You are no longer being listed as active")
        }
      }).catch(function(error) {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.isListed}
            onChange={() => {
              this.setState((prevState) => ({ isListed: !prevState.isListed }));
              this.toggle();
            }}
            color="primary"
          />
        }
        label="I am accepting contributions from the community."
        autoFocus
        style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
      />
    )
  }
}

export default ToggleListing;