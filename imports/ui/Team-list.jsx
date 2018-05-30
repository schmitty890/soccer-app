//list the players
import React, { Component } from 'react'; // import component from react
import Avatar from 'material-ui/Avatar'; // importing avatar from material ui
import { ListItem } from 'material-ui/List'; // import lists from material ui, <ul><li></li></ul>
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { red500 } from 'material-ui/styles/colors';

//create TeamList Component
export default class TeamList extends Component {
  updateCurrentPlayer(player) {
    this.props.updateCurrentPlayer(player);
  }

  deletePlayer(playerId) {
    Meteor.call('deletePlayer', playerId, (error) =>{
      if(error) {
        alert("Oups something went wrong: " + error.reason);
      } else {
        console.log("Player deleted! Move along...");
      }
    });
  }

  render() { 
    // prop attributes primaryText, leftAvatar, rightIcon are provided by material ui. see material ui documentation
    // Avatar component from material ui is passed as leftAvatar
    // ActionDeleteForever is from material ui https://www.materialui.co/icon/delete-forever
    return (
      <ListItem
        primaryText={this.props.player.name}
        leftAvatar={<Avatar src="player.jpg"/>}
        rightIcon={<ActionDeleteForever hoverColor={red500}
        onClick={this.deletePlayer.bind(this, this.props.player._id)}/>}
        onClick={this.updateCurrentPlayer.bind(this, this.props.player)}
        />
    )
  }
}
