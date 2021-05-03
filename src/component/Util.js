import axios from "axios";

// get all response from all URLs
function bulkGet(URLs) {
    const responses = [];
    const requests = URLs.map((thisURL, index) => {
        return axios.get(thisURL).then(response => {
            console.log(response);
            responses.push({
                id:     index,
                error:  false,
                data:   response.data,
            });
        }).catch((error) => {
            console.log(error);
            responses.push({
                id:     index,
                error:  true,
                data:   {},
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

// get all films and update the component films state by passing the setFilms function
function getFilms(filmURLs, setFilms) {
    console.log("in getFilms()")
    
    if (filmURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(filmURLs)
        bulkGet(filmURLs).then((filmResponses) => {
            setFilms(filmResponses.map((response) => {
                const filmData = response.data;
                return ({
                    id: response.id,
                    title: filmData.title,
                    releaseDate: filmData.release_date,
                    description: filmData.opening_crawl,
                    director: filmData.director,
                    producer: filmData.producer,
                });
            }));
        });
    }
}

// get all characters and update the component characters state by passing the setCharacters function
function getCharacters(characterURLs, setCharacters) {
    console.log("in getCharacters()")
    
    if (characterURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(characterURLs)
        bulkGet(characterURLs).then((characterResponses) => {
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

// get all planets and update the component planets state by passing the setPlanets function
function getPlanets(planetURLs, setPlanets) {
    console.log("in getPlanets()")
    
    if (planetURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(planetURLs)
        bulkGet(planetURLs).then((planetResponses) => {
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

// get all species and update the component species state by passing the setSpecies function
function getSpecies(speciesURLs, setSpecies) {
    console.log("in getSpecies()")
    
    if (speciesURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(speciesURLs)
        bulkGet(speciesURLs).then((speciesResponses) => {
            setSpecies(speciesResponses.map((response) => {
                const speciesData = response.data;
                return ({
                    id: response.id,
                    name: speciesData.name,
                    classification: speciesData.classification,
                    designation: speciesData.designation,
                    average_height: speciesData.average_height,
                    average_lifespan: speciesData.average_lifespan,
                    skin_colors: speciesData.skin_colors,
                    hair_colors: speciesData.hair_colors,
                    eye_colors: speciesData.eye_colors,
                    language: speciesData.language,
                });
            }));
        });
    }
}

// get all starships and update the component starships state by passing the setStarships function
function getStarships(starshipURLs, setStarships) {
    console.log("in get starships")
    
    if (starshipURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(starshipURLs)
        bulkGet(starshipURLs).then((starshipResponses) => {
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

// get all vehicles and update the component vehicles state by passing the setVehicles function
function getVehicles(vechicleURLs, setVehicles) {
    console.log("in get vehicles")
    
    if (vechicleURLs == null) {
        // nothing
        console.log("nothing here")
    }
    else {
        // console.log(vehicleURLs)
        bulkGet(vechicleURLs).then((vehicleResponses) => {
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

export {bulkGet, getFilms, getCharacters, getPlanets, getSpecies, getStarships, getVehicles}