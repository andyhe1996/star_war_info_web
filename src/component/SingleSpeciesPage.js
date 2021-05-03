import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Characters from './detailComponent/Characters';
import {getCharacters, getFilms, getPlanets} from './Util';
import axios from 'axios';
import Films from './detailComponent/Films';

function SingleSpeciesPage() {
    const [singleSpecies, setSingleSpecies] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [films, setFilms] = useState([]);

    const baseURL = 'https://swapi.dev/api/';
    let { id } = useParams();

    useEffect(() => {
        getSingleSpeciesById();
    }, []);

    async function getSingleSpeciesById() {
        const thisSpeciesURL = baseURL + "species/" + id;
        try {
            const response = await axios.get(thisSpeciesURL);
            const result = response.data;
            console.log(response);
            const thisSpecies = {
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
            setSingleSpecies(thisSpecies);

            // grab other details
            getFilms(thisSpecies.detailURLs.filmURLs, setFilms)
            getCharacters(thisSpecies.detailURLs.characterURLs, setCharacters);
            getPlanets(thisSpecies.detailURLs.planetURLs, setPlanets);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="speciespage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Row>
                    <Col xs={8}>
                        <div className="singlespecies">
                            <h2>{singleSpecies.name}</h2>
                            <b>Classification: </b>{singleSpecies.classification}<br/>
                            <b>Designation: </b>{singleSpecies.designation}<br/>
                            <b>Average Height: </b>{singleSpecies.average_height}<br/>
                            <b>Average Lifespan: </b>{singleSpecies.average_lifespan}<br/>
                            <b>Skin Colors: </b>{singleSpecies.skin_colors}<br/>
                            <b>Hair Colors: </b>{singleSpecies.hair_colors}<br/>
                            <b>Eye Colors: </b>{singleSpecies.eye_colors}<br/>
                            <b>Language: </b>{singleSpecies.language}<br/>
                            <b>Home Planet:</b><br/>
                        </div>
                    </Col>
                    <Col>
                        <p>leave space here for image</p>
                    </Col>
                </Row>
                <hr/>
                <Characters charactersData={characters}/>
                <hr/>
                <Films filmsData={films}/>
            </Container>
        </div>
    );
}

export default SingleSpeciesPage