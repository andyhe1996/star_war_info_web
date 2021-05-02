import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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
    }

    return (
        <div className="section">
            {console.log("in return films")}
            {console.log(films)}
            {films && films.map((film, index) => {
                return (
                    <Container className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                        <div class="row">
                            <div class="col-sm-8">
                                <div key={index} className="film">
                                    <h3>{film.title}</h3>
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