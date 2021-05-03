import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {getCharacters, getFilms} from './Util';
import axios from 'axios';
import Films from './detailComponent/Films';
import Characters from './detailComponent/Characters';

function SingleStarshipPage() {
    const [starship, setStarship] = useState({});
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);

    const baseURL = 'https://swapi.dev/api/'
    let { id } = useParams();

    useEffect(() => {
        getStarshipById();
    }, []);

    async function getStarshipById() {
        const thisStarshipURL = baseURL + "starships/" + id;
        try {
            const response = await axios.get(thisStarshipURL);
            const result = response.data;
            console.log(response);
            const thisStarship = {
                name:                   result.name,
                model:                  result.model,
                starship_class:         result.starship_class,
                manufacturer:           result.manufacturer,
                cost:                   result.cost_in_credits,
                length:                 result.length,
                minimum_crew:           result.crew,
                maximum_passengers:     result.passengers,
                max_atmosphering_speed: result.max_atmosphering_speed,
                hyperdrive_rating:      result.hyperdrive_rating,
                MGLT:                   result.MGLT,
                cargo_capacity:         result.cargo_capacity,
                supply_capacity:        result.consumables,          
                detailURLs: {
                    filmURLs:           result.films,
                    characterURLs:      result.pilots,
                },
            }
            setStarship(thisStarship);

            // grab other details
            getFilms(thisStarship.detailURLs.filmURLs, setFilms);
            getCharacters(thisStarship.detailURLs.characterURLs, setCharacters);
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className="starshippage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="starship">
                            <h2>{starship.name}</h2>
                            <b>Model: </b>{starship.model}<br/>
                            <b>Class: </b>{starship.starship_class}<br/>
                            <b>Manufacturer: </b>{starship.manufacturer}<br/>
                            <b>Cost: </b>{starship.cost}<br/>
                            <b>Length: </b>{starship.length}<br/>
                            <b>Minimum Crew: </b>{starship.minimum_crew}<br/>
                            <b>Maximum Passengers: </b>{starship.maximum_passengers}<br/>
                            <b>Max Atmo Speed: </b>{starship.max_atmosphering_speed}<br/>
                            <b>Hyperdrive Rating: </b>{starship.hyperdrive_rating}<br/>
                            <b>MGLT: </b>{starship.MGLT}<br/>
                            <b>Cargo Capacity: </b>{starship.cargo_capacity}<br/>
                            <b>Supply Capacity: </b>{starship.supply_capacity}<br/>
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

export default SingleStarshipPage