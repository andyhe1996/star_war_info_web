import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// character fields
// {
//     id,
//     name,
//     gender,
//     height,
//     mass,
//     birth_year,
//     skin_color,
//     hair_color,
//     eye_color,
// }

function Characters({charactersData=[], isOpen=false}) {
    function displayTitle() {
        if(isOpen){
            return (
            <h4>Characters</h4>
            );
        }
        return
    }
    return (
        <div className="characters">
            {displayTitle()}
            <Accordion defaultActiveKey="0">
                {charactersData && charactersData.map((character, index) => {
                    return (
                        <Card key={index} >
                            <Card.Header class="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {character.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body class="text-dark">
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Text>
                                        <b>Gender: </b>{character.gender}<br/>
                                        <b>Height: </b>{character.height}<br/>
                                        <b>Mass: </b>{character.mass}<br/>
                                        <b>Birth Year: </b>{character.birth_year}<br/>
                                        <b>Skin Color: </b>{character.skin_color}<br/>
                                        <b>Hair Color: </b>{character.hair_color}<br/>
                                        <b>Eye Color: </b>{character.eye_color}<br/>
                                    </Card.Text>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>
        </div>
    );
}

export default Characters