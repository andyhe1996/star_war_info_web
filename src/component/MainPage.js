import React, {useState, useEffect} from 'react';
import {Container, Jumbotron, Row, Col, Button, Form} from 'react-bootstrap';
import {checkKeyInString, getAllPages, getIDFromURL} from './Util';

function MainPage() {
    const [films, setFilms] = useState([]);
    const [displayFilms, setDisplayFilms] = useState([]);
    const [searchField, setSearchField] = useState("");
    const baseURL = 'https://swapi.dev/api/';

    useEffect(() => {
        getFilms();
    }, []);

    async function getFilms() {
        const FilmsURL = baseURL + "films/";
        try {
            const results = await getAllPages(FilmsURL);
            const allFilms = results.map(result => {
                const film = {
                    id:                 getIDFromURL(result.url),
                    title:              result.title,
                    releaseDate:        result.release_date,
                    description:        result.opening_crawl,
                    director:           result.director,
                    producer:           result.producer,
                    detailURLs: {
                        characterURLs:  result.characters,
                        planetURLs:     result.planets,
                        speciesURLs:    result.species,
                        starshipURLs:   result.starships,
                        vehicleURLs:    result.vehicles,
                    },
                }
                return film;
            });
            setFilms(allFilms);
            setDisplayFilms(allFilms);
        } catch(error) {
            console.log(error);
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = event.target.value;
        setSearchField(searchValue);
        const filteredFilms = films.filter((film) => {
            const isInTitle = checkKeyInString(film.title, searchValue);
            const isInDescription = checkKeyInString(film.description, searchValue);
            return isInTitle || isInDescription;
        });
        
        setDisplayFilms(filteredFilms);
    }

    return (
        <div className="mainpage">
            <Container className="p-3 my-3 bg-dark text-white">
                <Form>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" value={searchField} onChange={handleSearch}/>
                </Form>
            </Container>
            {displayFilms && displayFilms.map((film, index) => {
                const filmLink = "/films/" + film.id;
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
                                <p>leave space here for image</p>
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