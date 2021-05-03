import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import CharactersPage from './component/CharactersPage';
import MainPage from './component/MainPage';
import SingleFilmPage from './component/SingleFilmPage';
import SingleCharacterPage from './component/SingleCharacterPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Star Wars Info Project</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Films</Nav.Link>
          <Nav.Link href="/characters">Characters</Nav.Link>
          <Nav.Link href="/planets">Planets</Nav.Link>
          <Nav.Link href="/species">Species</Nav.Link>
          <Nav.Link href="/starships">Starships</Nav.Link>
          <Nav.Link href="/vehicles">Vehicles</Nav.Link>
      </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/films/:id">
            <SingleFilmPage />
          </Route>
          <Route path="/characters/:id">
            <SingleCharacterPage />
          </Route>
          <Route path="/planets/:id">
            <SingleFilmPage />
          </Route>
          <Route path="/species/:id">
            <SingleFilmPage />
          </Route>
          <Route path="/starships/:id">
            <SingleFilmPage />
          </Route>
          <Route path="/vehicles/:id">
            <SingleFilmPage />
          </Route>
          <Route path="/characters">
            <CharactersPage />
          </Route>
          <Route path="/planets">
            <MainPage />
          </Route>
          <Route path="/species">
            <MainPage />
          </Route>
          <Route path="/starships">
            <MainPage />
          </Route>
          <Route path="/vehicles">
            <MainPage />
          </Route>
        </Switch>
    </Router>
      
      
    </div>
  );
}

export default App;
