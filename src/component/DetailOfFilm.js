import React, {useState, useEffect} from 'react';
import axios from 'axios';

function DetailOfFilm({detailURLs}) {
    const [isOpen, setIsOpen] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const baseURL = 'https://swapi.dev/api/'

    useEffect(() => {
        console.log("re-render")
    });

    function getMoreDetails() {
        if (isOpen === false) {
            setIsOpen(true);
            getCharacters();
            getPlanets();
            getSpecies();
            getStarships();
            getVehicles();
        } else {
            setIsOpen(false);
            setCharacters([]);
            setPlanets([]);
            setSpecies([]);
            setStarships([]);
            setVehicles([]);
        }
    }

    function getCharacters() {
        console.log("in getCharacters()")
        
        if (detailURLs == null || detailURLs.characterURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.characterURLs)
            bulkGet(detailURLs.characterURLs).then((characterResponses) => {
                setCharacters(characterResponses.map((response) => {
                    const characterData = response.data;
                    return ({
                        id: response.id,
                        name: characterData.name,
                        gender: characterData.gender,
                        height: characterData.height,
                        mass: characterData.mass,
                        birth_year: characterData.birth_year,
                        skin_color: characterData.skin_color,
                        hair_color: characterData.hair_color,
                        eye_color: characterData.eye_color,
                    });
                }));
            });
        }
    }

    function getPlanets() {
        console.log("in getPlanets()")
        
        if (detailURLs == null || detailURLs.planetURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.planetURLs)
            bulkGet(detailURLs.planetURLs).then((planetResponses) => {
                setPlanets(planetResponses.map((response) => {
                    const planetData = response.data;
                    return ({
                        id: response.id,
                        name: planetData.name,
                        diameter: planetData.diameter,
                        rotation_period: planetData.rotation_period,
                        orbital_period: planetData.orbital_period,
                        gravity: planetData.gravity,
                        population: planetData.population,
                        climate: planetData.climate,
                        terrain: planetData.terrain,
                        surface_water: planetData.surface_water,
                    });
                }));
            });
        }
    }

    function getSpecies() {
        console.log("in getSpecies()")
        
        if (detailURLs == null || detailURLs.speciesURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.speciesURLs)
            bulkGet(detailURLs.speciesURLs).then((speciesResponses) => {
                setSpecies(speciesResponses.map((response) => {
                    const speciesData = response.data;
                    return ({
                        id: response.id,
                        name: speciesData.name,
                        classification: speciesData.classification,
                        designation: speciesData.designation,
                        average_height: speciesData.average_height,
                        average_lifespan: speciesData.average_lifespan,
                        skin_color: speciesData.skin_color,
                        hair_color: speciesData.hair_color,
                        eye_color: speciesData.eye_color,
                        language: speciesData.language,
                    });
                }));
            });
        }
    }

    function getStarships() {
        console.log("in get starships")
        
        if (detailURLs == null || detailURLs.starshipURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.starshipURLs)
            bulkGet(detailURLs.starshipURLs).then((starshipResponses) => {
                setStarships(starshipResponses.map((response) => {
                    const starshipData = response.data;
                    return ({
                        id: response.id,
                        name: starshipData.name,
                        model: starshipData.model,
                        starship_class: starshipData.starship_class,
                        manufacturer: starshipData.manufacturer,
                        cost: starshipData.cost_in_credits,
                        length: starshipData.length,
                        minimum_crew: starshipData.crew,
                        maximum_passengers: starshipData.passengers,
                        max_atmosphering_speed: starshipData.max_atmosphering_speed,
                        hyperdrive_rating: starshipData.hyperdrive_rating,
                        MGLT: starshipData.MGLT,
                        cargo_capacity: starshipData.cargo_capacity,
                        supply_capacity: starshipData.consumables,
                    });
                }));
            });
        }
    }

    function getVehicles() {
        console.log("in get vehicles")
        
        if (detailURLs == null || detailURLs.vehicleURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.vehicleURLs)
            bulkGet(detailURLs.vehicleURLs).then((vehicleResponses) => {
                setVehicles(vehicleResponses.map((response) => {
                    const vehicleData = response.data;
                    return ({
                        id: response.id,
                        name: vehicleData.name,
                        model: vehicleData.model,
                        vehicle_class: vehicleData.vehicle_class,
                        manufacturer: vehicleData.manufacturer,
                        cost: vehicleData.cost_in_credits,
                        length: vehicleData.length,
                        minimum_crew: vehicleData.crew,
                        maximum_passengers: vehicleData.passengers,
                        max_atmosphering_speed: vehicleData.max_atmosphering_speed,
                        cargo_capacity: vehicleData.cargo_capacity,
                        supply_capacity: vehicleData.consumables,
                    });
                }));
            });
        }
    }

    function bulkGet(URLs) {
        const responses = [];
        const requests = URLs.map((thisURL, index) => {
            return axios.get(thisURL).then(response => {
                console.log(response);
                responses.push({
                    id:     index,
                    data:   response.data,
                });
            });    
        });
        return Promise.all(requests).then(() => {
            responses.sort((a, b) => {
                return a.id - b.id;
            })
            return responses;
        });
    }

    return (
        <div className="section">
            <button onClick={() => getMoreDetails()}>More Details</button>
            {characters && characters.map((character, index) => {
                return (
                <div key={index} className="character">
                    <p>{character.name}</p>
                </div>
                )
            })}
        </div>
    );
}

export default DetailOfFilm