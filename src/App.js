import React, {useContext} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
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
import GetImage from "./pages/profile/image/GetImage";
import UserPage from "./pages/users/UserPage";
import WordListPage from "./pages/wordlist/WordListPage";
import MyExams from "./pages/exam/MyExams";
import SideBarMenu from "./components/sidebar/SideBarMenu";

// Alert opzoeken.
// requeired opzoeken bij input

// Check if empty?
// useEffect(() => {
//   /* Check if a comment is being typed */
//   const textArea = document.getElementById("commentInput");
//   textArea.addEventListener("input", checkIfEmpty)

function App() {
  const {auth, user} = useContext(AuthContext);
    const history = useHistory();

  return (
    <>
      <div className="content">
          {/*<SideBarMenu />*/}
        <Switch>
          <Route exact path="/">
            <NavBar/>
            <Home/>
          </Route>

          <Route exact path="/signin">
            <NavBar/>
            <SignIn />
          </Route>

            {/*dit even netjes in een component zetten straks*/}
          {!auth ?
              <div className="content-container-column">
                  <h1 className="error-message"> Sorry, je moet ingelogd zijn voor dit deel van de applicatie 😔 </h1>
                  <button
                      type="button"
                      onClick={() => history.push('/signin')}
                  >
                      Inloggen
                  </button>
              </div> : <>
          <Route exact path="/profile/:id">
            <NavBar/>
            <ProfilePage />
          </Route>

          <Route exact path="/userprofiles">
            <NavBar/>
            <AllProfiles />
          </Route>

          <Route exact path="/profile/:id/foto-uploaden">
            <NavBar/>
            <ImagePage />
          </Route>

          <Route exact path="/foto-opvragen">
            <GetImage />
          </Route>

          {user.role === 'TEACHER' &&
          <Route exact path="/registreren">
            <NavBar/>
            <SignUp/>
          </Route>
          }

          <Route exact path="/woordenlijsten">
            <NavBar/>
            <WordLists />
          </Route>

          <Route exact path="/woordenlijst/:title">
            <NavBar/>
            <WordListPage />
          </Route>

          <Route exact path="/woordenlijst-toevoegen">
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

          <Route exact path="/toetsen">
            <NavBar/>
            <Exams />
          </Route>

          <Route exact path="/mijn-toetsen/:id">
            <NavBar/>
            <MyExams />
          </Route>

          <Route exact path="/toets-maken">
            <StartExam />
          </Route>
          </>}
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
