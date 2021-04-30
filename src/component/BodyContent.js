import React, {useState, useEffect} from 'react';
import axios from 'axios';

function BodyContent() {
    const [films, setFilms] = useState([]);
    const URL = 'https://swapi.dev/api/'

    useEffect(() => {
        getFilms();
    }, []);

    async function getFilms() {
        const allFilms = URL + "films/";
        const response = await axios.get(allFilms);
        console.log(response.data["results"]);
        setFilms(response.data["results"].map(result => {
            const film = {
                title: result.title
            }
            return film;
        }));
    }

    return (
    <div className="section">
        <p>Grab Films Now</p>
        {console.log("in return films")}
        {console.log(films)}
        {films && films.map((film, index) => {
            return (
            <div key={index} className="film">
                <p>{film.title}</p>
                <p>----------------------------------------</p>
            </div>
            )
    })}
    </div>
    )
}

export default BodyContent