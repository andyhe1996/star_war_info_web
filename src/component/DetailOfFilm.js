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
        if (isOpen == false) {
            setIsOpen(true);
            getCharacters();
        } else {
            setIsOpen(false);
            setCharacters([]);
        }
    }

    function getCharacters() {
        console.log("in get characters")
        
        if (detailURLs == null || detailURLs.characterURLs == null) {
            // nothing
            console.log("nothing here")
        }
        else {
            // console.log(detailURLs.characterURLs)
            const charactersDetail = [];
            const charactersDetailRequest = detailURLs.characterURLs.map((characterURL, index) => {
                return axios.get(characterURL).then(response => {
                    console.log(response)
                    const characterData = response.data;
                    const character = {
                        id: index,
                        name: characterData.name,
                        gender: characterData.gender,
                        height: characterData.height,
                        mass: characterData.mass,
                        birth_year: characterData.birth_year,
                        skin_color: characterData.skin_color,
                        hair_color: characterData.hair_color,
                        eye_color: characterData.eye_color,
                    };
                    charactersDetail.push(character);
                });
                
            });
            Promise.all(charactersDetailRequest).then(() => {
                charactersDetail.sort((a, b) => {
                    return a.id - b.id;
                })
                setCharacters(charactersDetail)
            });
        }
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
    )
}

export default DetailOfFilm