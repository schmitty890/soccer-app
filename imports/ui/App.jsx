//where the app runs
import React, { Component } from 'react'; // import Component from react
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // import material ui theme
import RaisedButton from 'material-ui/RaisedButton'; // import raised button from material ui.
import AppBar from 'material-ui/AppBar'; // import material ui application header bar
import { List } from 'material-ui/List'; // import List item from material ui, a component used to render lists of things. this is the same as <ul><li></li></ul>
import Divider from 'material-ui/Divider'; // import Divider from material ui, divides section into the app
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

// database - collection
import { Players } from '../api/players';

//everytime you use a Component inside another Component, you need to import that Component
import TeamList from './Team-list';
import TeamStats from './Team-stats';
import Player from './Player';
import AccountsWrapper from './AccountsWrapper';
import Edit from './EditPlayer';

const tempPlayer = {
  name: "Temp player",
  team: "Lynda",
  ballManipulation: 2,
  kickingAbilities: 3,
  passingAbilities: 2,
  duelTackling: 1,
  fieldCoverage: 2,
  blockingAbilities: 0,
  gameStrategy: 1,
  playmakingRisks: 2,
  notes: "This player is only temporary",
}
// create a class called App, which is the Component
export class App extends Component {
  constructor(props) {
    super(props);

    // setting up the state
    this.state = {
      currentPlayer: tempPlayer,
      showEditPlayer: false,
     };
    this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.showTeamStats = this.showTeamStats.bind(this);
  }

  renderPlayers() { // take the list of players listed above, map them to a TeamList component
    return this.props.players.map((player) => ( 
      // key and player is passed as attributes to TeamList as props
      // pass. uniquie id because it is unique and the player object
      <TeamList key={player._id} player={player} updateCurrentPlayer={this.updateCurrentPlayer}/>
    ));
  }

  updateCurrentPlayer(player) {
    this.setState({
      currentPlayer: player,
    });
  }

  showEditForm() {
    this.setState({
      showEditPlayer: true,
    });
  }

  showTeamStats() {
    this.setState({
      showEditPlayer: false,
    });
  }

  showForm(){
    if(this.state.showEditPlayer === true) {
      return ( <Edit currentPlayer={this.state.currentPlayer}
      showTeamStats={this.showTeamStats}/>);
    } else {
      return ( <TeamStats players={this.props.players}/>);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar
            title="Soccer Application"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            showMenuIconButton={false}
            style={{backgroundColor: '#0277BD'}}>
              <AccountsWrapper />
            </AppBar>
          <div className="row">
            <div className="col s12 m7" ><Player player={this.state.currentPlayer} showEditForm={this.showEditForm}/></div>
            <div className="col s12 m5" >
              <h2>Team list</h2><Link to="/new" className="waves-effect waves-light btn light-blue darken-3">Add player</Link>
              <Divider/>
                <List>
                  {this.renderPlayers()}
                </List>
              <Divider/>
            </div>
          </div>
          <div className="row">
            <div className="col s12" >
              <br/>
              <Divider/>
              {this.showForm()}
              <Divider/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('players');
  const user = Meteor.userId();

  return {
    players: Players.find({ owner: user }, {sort: { name: 1}}).fetch(),
  };
}, App);
