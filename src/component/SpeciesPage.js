import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap';
import {getAllPages} from './Util';


function SpeciesPage() {
    const [species, setSpecies] = useState([]);
    const URL = 'https://swapi.dev/api/'

    useEffect(() => {
        getSpecies();
    }, []);

    async function getSpecies() {
        const allSpecies = URL + "species/";
        try {
            const results = await getAllPages(allSpecies);
            setSpecies(results.map(result => {
                const singleSpecies = {
                    name:               result.name,
                    classification:     result.classification,
                    designation:        result.designation,
                    average_height:     result.average_height,
                    average_lifespan:   result.average_lifespan,
                    skin_colors:        result.skin_colors,
                    hair_colors:        result.hair_colors,
                    eye_colors:         result.eye_colors,
                    language:           result.language,          
                    detailURLs: {
                        filmURLs:       result.films,
                        characterURLs:  result.people,
                        planetURLs:     [result.homeworld],
                    },
                }
                return singleSpecies;
            }));
        } catch(error) {
            console.log(error);
        }
        
    }
    return (
        <div className="speciespage">
           {species && species.map((singleSpecies, index) => {
                const specieID = index + 1;
                const specieLink = "/species/" + specieID;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                            <Row>
                                <Col xs={8}>
                                    <div key={index} className="singleSpecies">
                                        <h2>{singleSpecies.name}</h2>
                                        <b>Classification: </b>{singleSpecies.classification}<br/>
                                        <b>Designation: </b>{singleSpecies.designation}<br/>
                                        <b>Average Height: </b>{singleSpecies.average_height}<br/>
                                        <b>Average Lifespan: </b>{singleSpecies.average_lifespan}<br/>
                                        <b>Skin Colors: </b>{singleSpecies.skin_colors}<br/>
                                        <b>Hair Colors: </b>{singleSpecies.hair_colors}<br/>
                                        <b>Eye Colors: </b>{singleSpecies.eye_colors}<br/>
                                        <b>Language: </b>{singleSpecies.language}<br/>
                                    </div>
                                </Col>
                                <Col>
                                    <p>leave space here for image</p>
                                </Col>
                            </Row>
                            <Button variant="secondary" size="lg" href={specieLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default SpeciesPage