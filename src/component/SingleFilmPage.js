import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Characters from './detailComponent/Characters';
import Starships from './detailComponent/Starships';
import Vehicles from './detailComponent/Vehicles';
import Planets from './detailComponent/Planets';
import Species from './detailComponent/Species';
import {getCharacters, getPlanets, getSpecies, getStarships, getVehicles} from './Util'
import axios from 'axios';

function SingleFilmPage() {
    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const baseURL = 'https://swapi.dev/api/'
    let { id } = useParams();

    useEffect(() => {
        getFilmById();
    }, []);

    async function getFilmById() {
        const thisFilmURL = baseURL + "films/" + id;
        try {
            const response = await axios.get(thisFilmURL);
            const result = response.data;
            console.log(response);
            const thisFilm = {
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
            setFilm(thisFilm);

            // grab other details
            getCharacters(thisFilm.detailURLs.characterURLs, setCharacters);
            getPlanets(thisFilm.detailURLs.planetURLs, setPlanets);
            getSpecies(thisFilm.detailURLs.speciesURLs, setSpecies);
            getStarships(thisFilm.detailURLs.starshipURLs, setStarships);
            getVehicles(thisFilm.detailURLs.vehicleURLs, setVehicles);
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className="filmpage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="film">
                            <h2>{film.title}</h2>
                            <b>Release Date: </b>{film.releaseDate}<br/>
                            <b>Description: </b>{film.description}<br/>
                            <b>Director: </b>{film.director}<br/>
                            <b>Producer: </b>{film.producer}<br/>
                        </div>
                    </Col>
                    <Col>
                        <p>leave space here</p>
                    </Col>
                </Row>
                <hr/>
                <Characters charactersData={characters}/>
                <hr/>
                <Row>
                    <Col xs={6}>
                        <Planets planetsData={planets}/>
                    </Col>
                    <Col xs={6}>
                        <Species speciesData={species}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs={6}>
                        <Starships starshipsData={starships}/>
                    </Col>
                    <Col xs={6}>
                        <Vehicles vehiclesData={vehicles}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SingleFilmPage