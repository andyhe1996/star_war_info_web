import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Characters from './detailComponent/Characters';
import Starships from './detailComponent/Starships';
import Vehicles from './detailComponent/Vehicles';
import Planets from './detailComponent/Planets';
import Species from './detailComponent/Species';
import {bulkGet, getCharacters, getPlanets, getSpecies, getStarships, getVehicles} from './Util'

function DetailOfFilm({detailURLs}) {
    const [isOpen, setIsOpen] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        console.log("re-render")
    });

    function getMoreDetails() {
        if (isOpen === false) {
            setIsOpen(true);
            if (detailURLs !== null){
                getCharacters(detailURLs.characterURLs, setCharacters);
                getPlanets(detailURLs.planetURLs, setPlanets);
                getSpecies(detailURLs.speciesURLs, setSpecies);
                getStarships(detailURLs.starshipURLs, setStarships);
                getVehicles(detailURLs.vehicleURLs, setVehicles);
            }
        } else if (characters.length === 0 || planets.length === 0 || species.length === 0 || starships.length === 0 || vehicles.length === 0){
            // do nothing, button click again when previous requests haven't come back
        } 
        else {
            setIsOpen(false);
            setCharacters([]);
            setPlanets([]);
            setSpecies([]);
            setStarships([]);
            setVehicles([]);
        }
    }

    function buttonTextChange() {
        if (isOpen) {
            return "Close Details";
        } else {
            return "More Details";
        }
    }

    return (
        <div className="section">
            <Button variant="secondary" size="lg" onClick={() => getMoreDetails()}>{buttonTextChange()}</Button>
            <div class="row">
                <div class="col-sm-6">
                    <Planets planetsData={planets} isOpen={isOpen}/>
                </div>
                <div class="col-sm-6">
                    <Species speciesData={species} isOpen={isOpen}/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <Characters charactersData={characters} isOpen={isOpen}/>
                </div>
                <div class="col-sm-4">
                    <Starships starshipsData={starships} isOpen={isOpen}/>
                </div>
                <div class="col-sm-4">
                    <Vehicles vehiclesData={vehicles} isOpen={isOpen}/>
                </div>
            </div>
        </div>
    );
}

export default DetailOfFilm