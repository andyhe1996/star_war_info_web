import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {getCharacters, getFilms} from './Util';
import axios from 'axios';
import Films from './detailComponent/Films';
import Characters from './detailComponent/Characters';

function SinglePlanetPage() {
    const [planet, setPlanet] = useState({});
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);

    const baseURL = 'https://swapi.dev/api/';
    let { id } = useParams();

    useEffect(() => {
        getPlanetById();
    }, []);

    async function getPlanetById() {
        const thisPlanetURL = baseURL + "planets/" + id;
        try {
            const response = await axios.get(thisPlanetURL);
            const result = response.data;
            console.log(response);
            const thisPlanet = {
                name:               result.name,
                diameter:           result.diameter,
                rotation_period:    result.rotation_period,
                orbital_period:     result.orbital_period,
                gravity:            result.gravity,
                population:         result.population,
                climate:            result.climate,
                terrain:            result.terrain,
                surface_water:      result.surface_water,           
                detailURLs: {
                    filmURLs:       result.films,
                    characterURLs:  result.residents,
                },
            }
            setPlanet(thisPlanet);

            // grab other details
            getFilms(thisPlanet.detailURLs.filmURLs, setFilms);
            getCharacters(thisPlanet.detailURLs.characterURLs, setCharacters);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="planetpage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="planet">
                            <h2>{planet.name}</h2>
                            <b>Diameter: </b>{planet.diameter}<br/>
                            <b>Rotation Period: </b>{planet.rotation_period}<br/>
                            <b>Orbital Period: </b>{planet.orbital_period}<br/>
                            <b>Gravity: </b>{planet.gravity}<br/>
                            <b>Population: </b>{planet.population}<br/>
                            <b>Climate: </b>{planet.climate}<br/>
                            <b>Terrain: </b>{planet.terrain}<br/>
                            <b>Surface Water: </b>{planet.surface_water}<br/>
                        </div>
                    </Col>
                    <Col>
                        <p>leave space here for image</p>
                    </Col>
                </Row>
                <hr/>
                <Films filmsData={films}/>
                <hr/>
                <Characters charactersData={characters}/>
            </Container>
        </div>
    );
}

export default SinglePlanetPage