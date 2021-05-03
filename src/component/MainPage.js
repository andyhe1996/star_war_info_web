import React, {useState, useEffect} from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import DetailOfFilm from './DetailOfFilm'

function MainPage() {
    const [films, setFilms] = useState([]);
    const URL = 'https://swapi.dev/api/'

    useEffect(() => {
        getFilms();
    }, []);

    async function getFilms() {
        const allFilms = URL + "films/";
        try {
            const response = await axios.get(allFilms);
            console.log(response.data["results"]);
            setFilms(response.data["results"].map(result => {
                const film = {
                    title: result.title,
                    releaseDate: result.release_date,
                    description: result.opening_crawl,
                    director: result.director,
                    producer: result.producer,
                    detailURLs: {
                        characterURLs: result.characters,
                        planetURLs: result.planets,
                        speciesURLs: result.species,
                        starshipURLs: result.starships,
                        vehicleURLs: result.vehicles,
                    },
                }
                return film;
            }));
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className="mainpage">
            {console.log("in return films")}
            {console.log(films)}
            {films && films.map((film, index) => {
                return (
                    <Container className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                        <div class="row">
                            <div class="col-sm-8">
                                <div key={index} className="film">
                                    <h2>{film.title}</h2>
                                    <b>Release Date: </b><text>{film.releaseDate}<br/></text>
                                    <b>Description: </b><text>{film.description}<br/></text>
                                    <b>Director: </b><text>{film.director}<br/></text>
                                    <b>Producer: </b><text>{film.producer}<br/></text> 
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <p>leave space here</p>
                            </div>
                        </div>
                        <DetailOfFilm detailURLs={film.detailURLs}/>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default MainPage