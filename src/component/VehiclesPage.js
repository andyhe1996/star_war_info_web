import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap';
import {getAllPages, getIDFromURL} from './Util';


function VehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
    const URL = 'https://swapi.dev/api/'

    useEffect(() => {
        getVehicles();
    }, []);

    async function getVehicles() {
        const allVehicles = URL + "vehicles/";
        try {
            const results = await getAllPages(allVehicles);
            setVehicles(results.map(result => {
                const vehicle = {
                    id:                     getIDFromURL(result.url),
                    name:                   result.name,
                    model:                  result.model,
                    vehicle_class:          result.vehicle_class,
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
                return vehicle;
            }));
        } catch(error) {
            console.log(error);
        }
        
    }
    return (
        <div className="vehiclespage">
           {vehicles && vehicles.map((vehicle, index) => {
                const vehicleLink = "/vehicles/" + vehicle.id;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                            <Row>
                                <Col xs={8}>
                                    <div key={index} className="vehicle">
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
                            <Button variant="secondary" size="lg" href={vehicleLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default VehiclesPage