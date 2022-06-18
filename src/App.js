import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/registreren/SignUp';
import './App.css';
import {AuthContext} from "./context/AuthContext";
import Footer from "./components/foot/Footer";
import WordLists from "./pages/wordlist/WordLists";
import Users from "./pages/users/Users";
import AllProfiles from "./pages/profile/AllProfiles";
import Exams from "./pages/exam/Exams";
import AddWordList from "./pages/wordlist/AddWordList";

function App() {
  const {auth} = useContext(AuthContext);

  return (
    <>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <NavBar/>
            <Home/>
          </Route>

          {/*{auth &&*/}
          <Route path="/profile">
            <NavBar/>
            <Profile />
          </Route>
          {/*}*/}

          <Route path="/signin">
            <NavBar/>
            <SignIn />
          </Route>

          <Route path="/registreren">
            <NavBar/>
            <SignUp />
          </Route>

          <Route path="/woordenlijsten">
            <NavBar/>
            <WordLists />
          </Route>

          <Route path="/users">
            <NavBar/>
            <Users />
          </Route>

          <Route path="/userprofiles">
            <NavBar/>
            <AllProfiles />
          </Route>

          <Route path="/toetsen">
            <NavBar/>
            <Exams />
          </Route>

        <Route path="/woordenlijst-toevoegen">
          <AddWordList />
        </Route>
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
