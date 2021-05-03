import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {getCharacters, getFilms} from './Util';
import axios from 'axios';
import Films from './detailComponent/Films';
import Characters from './detailComponent/Characters';

function SingleVehiclePage() {
    const [vehicle, setVehicle] = useState({});
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);

    const baseURL = 'https://swapi.dev/api/';
    let { id } = useParams();

    useEffect(() => {
        getVehicleById();
    }, []);

    async function getVehicleById() {
        const thisVehicleURL = baseURL + "vehicles/" + id;
        try {
            const response = await axios.get(thisVehicleURL);
            const result = response.data;
            console.log(response);
            const thisVehicle = {
                name:                   result.name,
                model:                  result.model,
                vehicle_class:         result.vehicle_class,
                manufacturer:           result.manufacturer,
                cost:                   result.cost_in_credits,
                length:                 result.length,
                minimum_crew:           result.crew,
                maximum_passengers:     result.passengers,
                max_atmosphering_speed: result.max_atmosphering_speed,
                cargo_capacity:         result.cargo_capacity,
                supply_capacity:        result.consumables,          
                detailURLs: {
                    filmURLs:           result.films,
                    characterURLs:      result.pilots,
                },
            }
            setVehicle(thisVehicle);

            // grab other details
            getFilms(thisVehicle.detailURLs.filmURLs, setFilms);
            getCharacters(thisVehicle.detailURLs.characterURLs, setCharacters);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="vehiclepage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="vehicle">
                            <h2>{vehicle.name}</h2>
                            <b>Model: </b>{vehicle.model}<br/>
                            <b>Class: </b>{vehicle.vehicle_class}<br/>
                            <b>Manufacturer: </b>{vehicle.manufacturer}<br/>
                            <b>Cost: </b>{vehicle.cost}<br/>
                            <b>Length: </b>{vehicle.length}<br/>
                            <b>Minimum Crew: </b>{vehicle.minimum_crew}<br/>
                            <b>Maximum Passengers: </b>{vehicle.maximum_passengers}<br/>
                            <b>Max Atmo Speed: </b>{vehicle.max_atmosphering_speed}<br/>
                            <b>Cargo Capacity: </b>{vehicle.cargo_capacity}<br/>
                            <b>Supply Capacity: </b>{vehicle.supply_capacity}<br/>
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

export default SingleVehiclePage