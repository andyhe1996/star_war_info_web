import {Accordion, Button, Card} from 'react-bootstrap';

// starship fields
// {
//     id: response.id,
//     name: starshipData.name,
//     model: starshipData.model,
//     starship_class: starshipData.starship_class,
//     manufacturer: starshipData.manufacturer,
//     cost: starshipData.cost_in_credits,
//     length: starshipData.length,
//     minimum_crew: starshipData.crew,
//     maximum_passengers: starshipData.passengers,
//     max_atmosphering_speed: starshipData.max_atmosphering_speed,
//     hyperdrive_rating: starshipData.hyperdrive_rating,
//     MGLT: starshipData.MGLT,
//     cargo_capacity: starshipData.cargo_capacity,
//     supply_capacity: starshipData.consumables,
// }

function Starships({starshipsData=[]}) {
    return (
        <div className="starships">
            <h4>Starships</h4>
            <Accordion defaultActiveKey="0">
                {starshipsData && starshipsData.map((starship, index) => {
                    return (
                        <Card key={index} >
                            <Card.Header className="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {starship.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body className="text-dark">
                                    <Card.Title>{starship.name}</Card.Title>
                                    <Card.Text>
                                        <b>Model: </b>{starship.model}<br/>
                                        <b>Class: </b>{starship.starship_class}<br/>
                                        <b>Manufacturer: </b>{starship.manufacturer}<br/>
                                        <b>Cost: </b>{starship.cost}<br/>
                                        <b>Length: </b>{starship.length}<br/>
                                        <b>Minimum Crew: </b>{starship.minimum_crew}<br/>
                                        <b>Maximum Passengers: </b>{starship.maximum_passengers}<br/>
                                        <b>Max Atmo Speed: </b>{starship.max_atmosphering_speed}<br/>
                                        <b>Hyperdrive Rating: </b>{starship.hyperdrive_rating}<br/>
                                        <b>MGLT: </b>{starship.MGLT}<br/>
                                        <b>Cargo Capacity: </b>{starship.cargo_capacity}<br/>
                                        <b>Supply Capacity: </b>{starship.supply_capacity}<br/>
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

export default Starships