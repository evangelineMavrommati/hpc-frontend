import React, { Component } from 'react';
import axios from 'axios';
import theme from '../../theme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class Blacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      secondary: false,
      blockedUsers: []
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/blockedUsers?id=' + self.props.props.props.id).then(function (response) {
      if (response.data.success) {
        self.setState({ blockedUsers: response.data.blockedUsers })
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  generate() {
    return this.state.blockedUsers.map((user, i) => {
      return (
        <ListItem key={i}>
          <ListItemText
            primary={user.name.first.concat(' ', user.name.last)}
          />
          <ListItemSecondaryAction
            onClick={() => this.removeUser(i)}
          >
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  }

  async removeUser(i) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users";

    var payload = {
      "unblockingUser": self.props.props.props.id,
      "unblockedUser": self.state.blockedUsers[i]._id
    }

    await axios.patch(apiBaseUrl + '/unblockUser', payload).then(function (response) {
      if (response.data.success) {
        var people = self.state.blockedUsers;
        people.splice(i, 1);
        self.setState({ blockedUsers: people });
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className={style.demo}>
        <List dense={this.state.dense}>
          {this.generate()}
        </List>
      </div>
    )
  }
}

const style = {
  margin: 30,
  title: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
};

export default Blacklist;