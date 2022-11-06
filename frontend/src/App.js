import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import './App.css';

import SearchPage from "./sections/pages/SearchPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <main>
                    <SearchPage />
                    </main>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
