import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap';
import {getAllPages, getIDFromURL} from './Util';


function StarshipsPage() {
    const [starships, setStarships] = useState([]);
    const URL = 'https://swapi.dev/api/';

    useEffect(() => {
        getStarships();
    }, []);

    async function getStarships() {
        const allStarships = URL + "starships/";
        try {
            const results = await getAllPages(allStarships);
            setStarships(results.map(result => {
                const starship = {
                    id:                     getIDFromURL(result.url),
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
                return starship;
            }));
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <div className="starshipspage">
           {starships && starships.map((starship, index) => {
                const starshipLink = "/starships/" + starship.id;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                            <Row>
                                <Col xs={8}>
                                    <div key={index} className="starship">
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
                            <Button variant="secondary" size="lg" href={starshipLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default StarshipsPage