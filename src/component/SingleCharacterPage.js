import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Starships from './detailComponent/Starships';
import Vehicles from './detailComponent/Vehicles';
import Planets from './detailComponent/Planets';
import Species from './detailComponent/Species';
import {getFilms, getPlanets, getSpecies, getStarships, getVehicles} from './Util';
import axios from 'axios';
import Films from './detailComponent/Films';

function SingleCharacterPage() {
    const [character, setCharacter] = useState({});
    const [films, setFilms] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const baseURL = 'https://swapi.dev/api/'
    let { id } = useParams();

    useEffect(() => {
        getCharacterById();
    }, []);

    async function getCharacterById() {
        const thisCharacterURL = baseURL + "people/" + id;
        try {
            const response = await axios.get(thisCharacterURL);
            const result = response.data;
            console.log(response);
            const thisCharacter = {
                name: result.name,
                gender: result.gender,
                height: result.height,
                mass: result.mass,
                birth_year: result.birth_year,
                skin_color: result.skin_color,
                hair_color: result.hair_color,
                eye_color: result.eye_color,
                detailURLs: {
                    filmURLs: result.films,
                    planetURLs: [result.homeworld],
                    speciesURLs: result.species,
                    starshipURLs: result.starships,
                    vehicleURLs: result.vehicles,
                },
            }
            setCharacter(thisCharacter);

            // grab other details
            getFilms(thisCharacter.detailURLs.filmURLs, setFilms);
            getPlanets(thisCharacter.detailURLs.planetURLs, setPlanets);
            getSpecies(thisCharacter.detailURLs.speciesURLs, setSpecies);
            getStarships(thisCharacter.detailURLs.starshipURLs, setStarships);
            getVehicles(thisCharacter.detailURLs.vehicleURLs, setVehicles);
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className="characterpage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="character">
                            <h2>{character.name}</h2>
                            <b>Gender: </b>{character.gender}<br/>
                            <b>Height: </b>{character.height}<br/>
                            <b>Mass: </b>{character.mass}<br/>
                            <b>Birth Year: </b>{character.birth_year}<br/>
                            <b>Skin Color: </b>{character.skin_color}<br/>
                            <b>Hair Color: </b>{character.hair_color}<br/>
                            <b>Eye Color: </b>{character.eye_color}<br/>
                        </div>
                    </Col>
                    <Col>
                        <p>leave space here</p>
                    </Col>
                </Row>
                <hr/>
                <Films filmsData={films}/>
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

export default SingleCharacterPage