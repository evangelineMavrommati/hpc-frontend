import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      accountType: '',
      open: false
    }
  }

  async loginButton(event) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users";

    // test for empty fields
    if (this.state.email === "" || this.state.password === "") {
      alert("Fill in all fields!")
    }

    // trim white space from fields
    let emailTrimmed = this.state.email.trim()
    let passwordTrimmed = this.state.password.trim()

    var payload = {
      "email": emailTrimmed,
      "password": passwordTrimmed
    }

    console.log("payload: ", payload)

    await axios.post(apiBaseUrl + '/login', payload, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
      if (response.data.loginStatus == true && response.data.accountType == "Contributor") {
        self.setState({ id: response.data.id, accountType: response.data.accountType })
      } else if (response.data.loginStatus == true && (response.data.accountType == "Homeowner" || response.data.accountType == "Business Owner")) {
        self.setState({ id: response.data.id, accountType: response.data.accountType })
      } else {
        alert('invalid creds')
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if (this.state.id !== '' && this.state.accountType !== "Contributor") {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { id: this.state.id, accountType: this.state.accountType }
          }}
        />
      )
    } else if (this.state.id !== '' && this.state.accountType == "Contributor") {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { id: this.state.id, accountType: this.state.accountType }
          }}
        />
      )
    }
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="primary" onClick={() => this.setState({ open: true })}>
            Login
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Welcome back!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                onChange={(event, newValue) => this.setState({ password: event.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ open: false })} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.loginButton(event)}
              >Submit</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}

export default LoginModal;