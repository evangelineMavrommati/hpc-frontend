import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import RadioButtons from '../RadioButtons';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import theme from '../../theme';

class UpdateAccountType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: ''
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/profile?id=' + this.props.props.props.id).then(function(response) {
      if (response.data.success) {
        self.setState({ accountType: response.data.user.accountType })
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  async update() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    var payload = {
      id: this.props.props.props.id,
      accountType: self.state.accountType
    }

    console.log(payload);

    await axios.patch(apiBaseUrl + '/profile', payload).then(function(response) {
      if (response.data.success) {
        alert('Account type successfully updated.')
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <FormControl component="fieldset" fullWidth={true}>
          <RadioGroup 
            aria-label="accountType" 
            name="customized-radios" 
            onChange={
              (event) => {this.setState({ accountType: event.target.value });
              this.update()
            }}
            value={this.state.accountType}
            style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}
          >
            <FormControlLabel value="Contributor" control={<RadioButtons />} label="Contributor" />
            <FormControlLabel value="Homeowner" control={<RadioButtons />} label="Homeowner" />
            <FormControlLabel value="Business Owner" control={<RadioButtons />} label="Business Owner" />
          </RadioGroup>
        </FormControl>
      </ThemeProvider>
    )
  }
}

export default UpdateAccountType;