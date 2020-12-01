import React, {useState} from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Recipe from './comps/Recipe';
import Alert from "./comps/Alert";
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = '85798d0c';
  const APP_KEY = '20c3a654dc7382e08d4a4cd8627f36d5';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No such recipes available. Please try something else.");
      }
      setRecipes(result.data.hits);
      setQuery('');
      setAlert('');
    } else {
      setAlert("No input provided. Please type something in and try again.");
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <div className="main">
        <h1><i className="fas fa-utensils"></i> Recipe App</h1>
          <form className="search-form" onSubmit={onSubmit}>
          {alert !== "" && <Alert alert={alert} />}
            <input 
              type="text" 
              placeholder="Enter Food" 
              autoComplete="off" 
              onChange={onChange}
              value={query}
              />
            <input type="submit" value="Search" id="button"/>
          </form>
          <div className="recipes">
          {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
          </div>
      </div>

      <footer>
        <p>
        Designed & Developed  with 🧡 by <a href="https://github.com/AndreiRacasan" target="_blank" rel="noreferrer">Andrei Racasan</a>. API by <a href="https://www.edamam.com/" target="_blank" rel="noreferrer">Edamam</a>. 
        </p>
      </footer>
    
    </div>
  );
}

export default App;
