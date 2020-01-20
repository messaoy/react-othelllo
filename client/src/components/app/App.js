import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Board from '../Board/Board';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main className="">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route key="create-game" exact path="/board" component={Board} />
            <Route key="game" exact path="/board/:gameId" component={Board} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
