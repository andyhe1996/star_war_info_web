import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// planet fields
// {
//     id: response.id,
//     name: planetData.name,
//     diameter: planetData.diameter,
//     rotation_period: planetData.rotation_period,
//     orbital_period: planetData.orbital_period,
//     gravity: planetData.gravity,
//     population: planetData.population,
//     climate: planetData.climate,
//     terrain: planetData.terrain,
//     surface_water: planetData.surface_water,
// }

function Planets({planetsData=[], isOpen=false}) {
    function displayTitle() {
        if(isOpen){
            return (
            <h4>Planets</h4>
            );
        }
        return
    }
    return (
        <div className="planets">
            {displayTitle()}
            <Accordion defaultActiveKey="0">
                {planetsData && planetsData.map((planet, index) => {
                    return (
                        <Card key={index} >
                            <Card.Header class="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {planet.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body class="text-dark">
                                    <Card.Title>{planet.name}</Card.Title>
                                    <Card.Text>
                                        <b>Diameter: </b>{planet.diameter}<br/>
                                        <b>Rotation Period: </b>{planet.rotation_period}<br/>
                                        <b>Orbital Period: </b>{planet.orbital_period}<br/>
                                        <b>Gravity: </b>{planet.gravity}<br/>
                                        <b>Population: </b>{planet.population}<br/>
                                        <b>Climate: </b>{planet.climate}<br/>
                                        <b>Terrain: </b>{planet.terrain}<br/>
                                        <b>Surface Water: </b>{planet.surface_water}<br/>
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

export default Planets