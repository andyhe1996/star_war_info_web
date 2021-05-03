import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function MainPage() {
    const [films, setFilms] = useState([]);
    const baseURL = 'https://swapi.dev/api/'

    useEffect(() => {
        getFilms();
    }, []);

    async function getFilms() {
        const allFilms = baseURL + "films/";
        try {
            let response = await axios.get(allFilms);
            let results = response.data["results"];
            console.log(response);
            // keep grab next page if exist
            while (response.data["next"]) {
                const nextPage = response.data["next"];
                response = await axios.get(nextPage);
                results = results.concat(response.data["results"]);
                console.log(response);
            }
            setFilms(results.map(result => {
                const film = {
                    title: result.title,
                    releaseDate: result.release_date,
                    description: result.opening_crawl,
                    director: result.director,
                    producer: result.producer,
                    detailURLs: {
                        characterURLs: result.characters,
                        planetURLs: result.planets,
                        speciesURLs: result.species,
                        starshipURLs: result.starships,
                        vehicleURLs: result.vehicles,
                    },
                }
                return film;
            }));
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className="mainpage">
            {console.log("in return films")}
            {console.log(films)}
            {films && films.map((film, index) => {
                const filmID = index + 1;
                const filmLink = "/films/" + filmID;
                return (
                    <Container key={index} className="p-3 my-3 bg-dark text-white">
                        <Jumbotron>
                        <Row>
                            <Col xs={8}>
                                <div key={index} className="film">
                                    <h2>{film.title}</h2>
                                    <b>Release Date: </b>{film.releaseDate}<br/>
                                    <b>Description: </b>{film.description}<br/>
                                    <b>Director: </b>{film.director}<br/>
                                    <b>Producer: </b>{film.producer}<br/>
                                </div>
                            </Col>
                            <Col>
                                <p>leave space here</p>
                            </Col>
                        </Row>
                        <Button variant="secondary" size="lg" href={filmLink}>More Details</Button>
                        </Jumbotron>
                    </Container>
                );
            })}
        </div>
    );
}

export default MainPage