import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import './App.css';
import {AuthContext} from "./context/AuthContext";
import Footer from "./components/foot/Footer";
import WordLists from "./pages/wordlist/WordLists";
import Users from "./pages/users/Users";

function App() {
  const {auth} = useContext(AuthContext);

  return (
    <>
      <NavBar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {/*{auth &&*/}
          <Route path="/profile">
            <Profile />
          </Route>
          {/*}*/}

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/woordenlijsten">
            <WordLists />
          </Route>

          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
