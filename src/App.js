import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getFilms = async () => {
      const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
        headers: {
          apikey: process.env.REACT_APP_SUPABASE_KEY,
          Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
        },
      });
      const data = await resp.json();
      const munge = data.map((item) => [
        item.title,
        item.title.toLowerCase().replace(/ /g, '-'),
        item.box_office_total,
        item.academy_award_nominations,
      ]);

      setFilms(munge);
    };
    getFilms();
    console.log(getFilms);

    const getCharacters = async () => {
      const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
        headers: {
          apikey: process.env.REACT_APP_SUPABASE_KEY,
          Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
        },
      });
      const data = await resp.json();
      const munge = data.map((item) => {
        if (item.birth === item.death) {
          return [item.name, (item.dates = 'Unkown')];
        } else {
          return [item.name, ((item.dates = `${item.birth}-${item.death}`), item.dates)];
        }
      });

      setCharacters(munge);
    };

    getCharacters();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route exact path="/">
            <FilmList films={films} />
          </Route>
          <Route exact path="/characters">
            <CharacterList characters={characters} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
