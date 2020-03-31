import React, { Component } from 'react';
import './Messages.scss';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { Popover } from 'reactstrap';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      talkingTo: '',
      newMessage: '',
      infoUser: null,
      popoverOpen: false
    }
  }

  async componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";

    await axios.get(apiBaseUrl + '/conversations?id=' + self.props.props.id).then(response => {
      if (response.data.success) {
        if (response.data.conversations.length == 0) {
          self.setState({ conversations: response.data.conversations })
        } else {
          self.setState({ conversations: response.data.conversations, talkingTo: response.data.conversations[0].id })
        }
      }
    }).catch(e => {
      console.log(e);
    });

    await axios.get(apiBaseUrl + '/conversation?loggedInId=' + self.props.props.id + '&otherId=' + self.state.talkingTo).then(response => {
      if (response.data.success) {
        self.setState({ messages: response.data.messages })
      }
    }).catch(error => {
      console.log(error);
    })

    this.viewProfile(self.state.talkingTo)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.newConvo()
    } else if (this.state.newMessage == '' && prevState.newMessage !== '') {
      this.fetchMessages()
    }
  }

  async fetchMessages() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";

    await axios.get(apiBaseUrl + '/conversation?loggedInId=' + this.props.props.id + '&otherId=' + self.state.talkingTo).then(response => {
      if (response.data.success) {
        self.setState({ messages: response.data.messages })
      }
    }).catch(error => {
      console.log(error);
    })
  }


  async newConvo() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    await axios.get(apiBaseUrl + '/profile?id=' + self.props.props.sendMessageTo).then(response => {
      if (response.data.success) {
        var convo = {
          email: response.data.user.email,
          name: {
            first: response.data.user.name.first,
            last: response.data.user.name.last
          },
          id: self.props.props.sendMessageTo
        }
        var joined = this.state.conversations.concat(convo);
        self.setState({ conversations: joined, talkingTo: self.props.props.sendMessageTo })
        self.openConvo(self.props.props.sendMessageTo)
      }
    }).catch(error => {
      console.log(error)
    });
  }

  renderConvos() {
    return this.state.conversations.map((name, i) => {
      return (
        <div key={i}>
          <List component="nav">
            <ListItem
              button
              onClick={() => this.openConvo(this.state.conversations[i].id)}
            >
              <ListItemText
                primary={this.state.conversations[i].name.first.concat(' ', this.state.conversations[i].name.last)}
                secondary={this.state.conversations[i].email}
              />
            </ListItem>
          </List>
          <Divider />
        </div>
      )
    })
  }

  async openConvo(id) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";

    self.setState({ talkingTo: id });

    await axios.get(apiBaseUrl + '/conversation?loggedInId=' + this.props.props.id + '&otherId=' + id).then(response => {
      if (response.data.success) {
        self.setState({ messages: response.data.messages })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  renderMessages() {
    if (this.state.messages != undefined) {
      return this.state.messages.map((message, i) => {
        if (message.senderId !== this.props.props.id && this.state.infoUser != null) {
          return (
            <div className="convo-guest" key={i}>
              <div key={i} className="convo-their-messages">
                <AccountBoxRoundedIcon
                  id="icon"
                  style={{ paddingRight: '5px', cursor: 'pointer', color: '#7ebad6' }}
                  onClick={(e) => {
                    {
                      this.setState({ popoverOpen: !this.state.popoverOpen })
                      this.viewProfile(message.senderId)
                    }
                  }}
                />
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="icon" toggle={this.togglePopover} >
                  <div 
                    style={{
                      fontSize: '1rem',
                      backgroundColor: "#f7f7f7",
                      borderBottom: "1px solid #ebebeb",
                      padding: "0.5rem 0.75rem",
                      borderTopLeftRadius: 'calc(0.3rem - 1px)',
                      borderTopRightRadius: 'calc(0.3rem - 1px)',
                      border: '1px solid #ebebeb',
                      boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    <h4>Name</h4>
                    {this.state.infoUser.name.first.concat(' ', this.state.infoUser.name.last)}
                    <br />
                    <h4>Address</h4>
                    {this.state.infoUser.location.address.concat(', ', this.state.infoUser.location.city, ', ', this.state.infoUser.location.state)}
                  </div>
                </Popover>
                {message.message}
              </div>
            </div>
          )
        } else {
          return (
            <div className="convo-sending" key={i}>
              <div key={i} className="convo-your-messages">
                {message.message}
              </div>
            </div>
          )
        }
      })
    }
  }

  async viewProfile(id) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    await axios.get(apiBaseUrl + '/profile?id=' + id).then(response => {
      if (response.data.success) {
        self.setState({ infoUser: response.data.user })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  async sendMessage(talkingTo) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api";

    if (self.props.props.sendMessageTo == undefined || self.props.props.sendMessageTo == "") {
      var payload = {
        "senderId": self.props.props.id,
        "receiverId": talkingTo,
        "message": self.state.newMessage
      }
    } else {
      var payload = {
        "senderId": self.props.props.id,
        "receiverId": self.props.props.sendMessageTo,
        "message": self.state.newMessage
      }
    }

    await axios.post(apiBaseUrl + '/messages', payload).then(response => {
      if (response.data.success) {
        self.setState({ newMessage: '' })
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="parent">
        <div className="list">
          {this.renderConvos()}
        </div>
        <div className="convo">
          {this.renderMessages()}
          <div className="convo-text">
            <TextField
              fullWidth
              onChange={(event) => { this.setState({ newMessage: event.target.value }) }}
              value={this.state.newMessage}
            />
            <SendRoundedIcon
              style={{ paddingLeft: '10px' }}
              onClick={() => { this.sendMessage(this.state.talkingTo) }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Messages;