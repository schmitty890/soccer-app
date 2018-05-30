import React from 'react'; // import react
import { Meteor } from 'meteor/meteor'; // import meteor
import { render } from 'react-dom'; // import render method from react-dom
import injectTapEventPlugin from 'react-tap-event-plugin'; // needed for touches and clicks within react for now
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../imports/ui/App.jsx'; // import App ui
import New from '../imports/ui/New';
import Lost from '../imports/ui/Lost';

injectTapEventPlugin();

// Meteor.startup can be run anywhere in the project, renders the App. detemines which route you are on and displays that component, rendering it into the render-target div
Meteor.startup(() => {
  render((
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/new" component={New}/>
        <Route component={Lost}/>
      </Switch>
    </Router>
  ), document.getElementById('render-target'));
});
