import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';

class BlockUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  async blockUser() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users";

    var payload = {
      "blockingUserId": self.props.props.props.id,
      "blockedUserEmail": self.state.email
    }

    await axios.patch(apiBaseUrl + '/blockUserEmail', payload).then(function(response) {
      if (response.data.success == true) {
        alert("User blocked");
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="User Email"
            variant="outlined"
            style={style}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style}
            onClick={(event) => this.blockUser(event)}
          >Block User</Button>
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

export default BlockUsers;