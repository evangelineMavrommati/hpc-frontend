import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from '../theme';
import HostPreferences from './Preferences/HostPreferences';
import MapContainer from './MapContainer';
import ContributorPreferences from './Preferences/ContributorPreferences';
import Messages from './Messaging/Messages';
import { Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function logout() {
  window.location = "hpcompost.com"
}

export default function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);
  const [sendMessageTo, setReceivingHost] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const callbackFunction = (data) => {
    setReceivingHost(data);
    setValue(1);
  }

  if (props.location.state.accountType == 'Contributor') {
    const newProps = {...props.location.state, sendMessageTo}
    return (
      <div>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Tabs value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                centered
                style={{ flexGrow: 3 }}
              >
                <Tab label="Map" {...a11yProps(2)} />
                <Tab label="Messages" {...a11yProps(1)} />
                <Tab label="Preferences" {...a11yProps(2)} />
              </Tabs>
              <Button
                onClick={logout}
                size='small'
                style={{ backgroundColor: '#ffd740' }}
              >Logout</Button>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MapContainer props={props.location.state} callback={callbackFunction} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Messages props={newProps} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ContributorPreferences props={props.location.state} />
          </TabPanel>
        </ThemeProvider>
      </div>
    );
  } else {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Tabs value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                centered
                style={{ flexGrow: 3 }}
              >
                <Tab label="Preferences" {...a11yProps(0)} />
                <Tab label="Messages" {...a11yProps(1)} />
              </Tabs>
              <Button
                onClick={logout}
                size='small'
                style={{ backgroundColor: '#ffd740' }}
              >Logout</Button>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            <HostPreferences props={props.location.state} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Messages props={props.location.state} />
          </TabPanel>
        </ThemeProvider>
      </div>
    );
  }
}