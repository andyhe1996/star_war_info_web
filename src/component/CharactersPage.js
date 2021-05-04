import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button, Image} from 'react-bootstrap';
import {bulkGet, getAllPages, getIDFromURL} from './Util';


function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const URL = 'https://swapi.dev/api/';
    const imageBaseURL = 'https://akabab.github.io/starwars-api/api/id/';

    useEffect(() => {
        getCharacters();
    }, []);

    async function getCharacters() {
        const allCharactersURL = URL + "people/";
        try {
            const results = await getAllPages(allCharactersURL);
            const allCharacters = results.map(result => {
                const character = {
                    id:                 getIDFromURL(result.url),
                    name:               result.name,
                    gender:             result.gender,
                    birth_year:         result.birth_year,
                    height:             result.height,
                    mass:               result.mass,
                    skin_color:         result.skin_color,
                    hair_color:         result.hair_color,
                    eye_color:          result.eye_color,
                    image_src:          "",                       
                    detailURLs: {
                        filmURLs:       result.films,
                        planetURLs:     result.homeworld,
                        speciesURLs:    result.species,
                        starshipURLs:   result.starships,
                        vehicleURLs:    result.vehicles,
                    },
                }
                return character;
            })
            // setCharacters(allCharacters);

            // get the image Src
            const allCharactersImageURL = allCharacters.map((character) => {
                return imageBaseURL + character.id + ".json";
            });
            const responses = await bulkGet(allCharactersImageURL)
            setCharacters(allCharacters.map((character, index) => {
                character.image_src = responses[index].data["image"];
                return character;
            }));
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <div className="characterspage">
           {characters && characters.map((character, index) => {
                const characterLink = "/characters/" + character.id;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                            <Row>
                                <Col xs={8}>
                                    <div key={index} className="character">
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
                                    <Image src={character.image_src} fluid />
                                </Col>
                            </Row>
                            <Button variant="secondary" size="lg" href={characterLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default CharactersPage