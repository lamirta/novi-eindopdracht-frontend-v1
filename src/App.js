import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import ProfilePage from './pages/profile/ProfilePage';
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
import StartExam from "./pages/exam/StartExam";
import ImagePage from "./pages/profile/image/ImagePage";
import AssignImage from "./pages/profile/image/AssignImage";
import UserPage from "./pages/users/UserPage";
import WordListPage from "./pages/wordlist/WordListPage";
import MyExams from "./pages/exam/MyExams";

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

          {auth &&
          <Route path="/profile/:id">
            <NavBar/>
            <ProfilePage />
          </Route>
          }

          <Route path="/userprofiles">
            <NavBar/>
            <AllProfiles />
          </Route>

          <Route path="/foto-uploaden">
            <NavBar/>
            <ImagePage />
          </Route>

          <Route path="/foto-koppelen">
            <AssignImage />
          </Route>

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

          <Route path="/woordenlijst/:title">
            <NavBar/>
            <WordListPage />
          </Route>

          <Route path="/woordenlijst-toevoegen">
            <AddWordList />
          </Route>

          <Route exact path="/users">
            <NavBar/>
            <Users />
          </Route>

          <Route exact path="/user/:username">
            <NavBar/>
            <UserPage />
          </Route>

          <Route path="/toetsen">
            <NavBar/>
            <Exams />
          </Route>

          <Route path="/mijn-toetsen/:id">
            <NavBar/>
            <MyExams />
          </Route>

          <Route path="/toets-maken">
            <StartExam />
          </Route>
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
