import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap';
import {getAllPages} from './Util';


function PlanetsPage() {
    const [planets, setPlanets] = useState([]);
    const URL = 'https://swapi.dev/api/'

    useEffect(() => {
        getPlanets();
    }, []);

    async function getPlanets() {
        const allPlanets = URL + "planets/";
        try {
            const results = await getAllPages(allPlanets);
            setPlanets(results.map(result => {
                const planet = {
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
                return planet;
            }));
        } catch(error) {
            console.log(error);
        }
        
    }
    return (
        <div className="planetspage">
           {planets && planets.map((planet, index) => {
                const planetID = index + 1;
                const planetLink = "/planets/" + planetID;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                            <Row>
                                <Col xs={8}>
                                    <div key={index} className="planet">
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
                            <Button variant="secondary" size="lg" href={planetLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default PlanetsPage