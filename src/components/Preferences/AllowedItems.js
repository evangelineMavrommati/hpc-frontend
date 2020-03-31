import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';


class AllowedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowedItems: ''
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/allowedItems?id=' + this.props.props.props.id).then(function (response) {
      if (response.data.success) {
        self.setState({ allowedItems: response.data.allowedItems })
      } 
    }).catch(function (error) {
      console.log(error)
    });
  }

  async save() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    var payload = {
      "id": this.props.props.props.id,
      "allowedItems": this.state.allowedItems
    }

    console.log("payload: ", payload)

    await axios.post(apiBaseUrl + '/allowedItems', payload).then(function (response) {
      if (response.data.success) {
        alert("Preferences Saved")
      } else {
        alert("Failed to save. Please try again later.")
      }
    }).catch(function (error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-multiline-static"
            label="Allowed Items"
            multiline
            rows="10"
            placeholder="List allowed items or any other notes about your composting bin"
            variant="outlined"
            value={this.state.allowedItems}
            fullWidth={true}
            onChange={(event) => this.setState({ allowedItems: event.target.value })}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style}
            onClick={(event) => this.save(event)}
          >Save</Button>
        </ThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 15,
  title: {
    flexGrow: 1
  },
};

export default AllowedItems;
