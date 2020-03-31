import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPw: '',
      newPw: ''
    }
  }

  async reset() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users";

    var payload = {
      "id": this.props.props.props,
      "old": this.state.currentPw,
      "new": this.state.newPw
    }

    console.log("payload: ", payload);

    await axios.post(apiBaseUrl + '/resetPassword', payload).then(function (response) {
      if (response.data.success = true) {
        alert("Password reset successfully");
      } else {
        alert("Failed to reset password. Please try again later.")
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
            id="outlined-basic"
            label="Current Password"
            type="password"
            variant="outlined"
            style={style}
            onChange={(event) => this.setState({ currentPw: event.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            type="password"
            variant="outlined"
            style={style}
            onChange={(event) => this.setState({ newPw: event.target.value })}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style}
            onClick={(event) => this.reset(event)}
          >Reest Password</Button>
        </ThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 30,
  title: {
    flexGrow: 1
  }
};

export default ResetPassword;