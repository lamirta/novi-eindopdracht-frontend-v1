import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import './App.css';

function App() {
  return (
    <>
      <NavBar/>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
