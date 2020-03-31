import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Examples of compostabale items</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <div align="left">
              <li>Animal manure</li> 
              <li>Cardboard</li> 
              <li>Cereal boxes</li> 
              <li>Coffee grounds and filters</li> 
              <li>Egg shells</li> 
              <li>Fruits and vegetables</li>
            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Examples of non-compostable items</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <div align="left">
              <li>Meat of any kind</li> 
              <li>Egg</li> 
              <li>Fats or grease</li> 
              <li>Bread</li> 
              <li>Rice</li> 
              <li>Plastic or styrofoam</li>
            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Suggestions and composting links </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <p align="left">Start a garden, place your compost pile where animals won't bother it, cut leaves on any compostable items,
            and open your compost bin to your community.</p>
            <div>
              <a  href="https://www.amazon.com/100-Piece-Biodegradable-Compost-Bags-Eco-Friendly/dp/B072WKL14N/ref=asc_df_B072WKL14N/?tag=hyprod-20&linkCode=df0&hvadid=309748512677&hvpos=1o2&hvnetw=g&hvrand=12689167908056551662&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9028279&hvtargid=pla-570918674861&psc=1">Biodegradable Compost Bags</a>
              <br />
              <a href="https://www.amazon.com/Best-Sellers-Home-Kitchen-Indoor-Compost-Bins/zgbs/home-garden/3744051">Compost Bins</a>
            </div>
          </Typography>
        </ExpansionPanelDetails>
     </ExpansionPanel>
    </div>
  );
}
