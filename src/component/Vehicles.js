import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// vehicle fields
// {
//     id: response.id,
//     name: vehicleData.name,
//     model: vehicleData.model,
//     vehicle_class: vehicleData.vehicle_class,
//     manufacturer: vehicleData.manufacturer,
//     cost: vehicleData.cost_in_credits,
//     length: vehicleData.length,
//     minimum_crew: vehicleData.crew,
//     maximum_passengers: vehicleData.passengers,
//     max_atmosphering_speed: vehicleData.max_atmosphering_speed,
//     hyperdrive_rating: vehicleData.hyperdrive_rating,
//     MGLT: vehicleData.MGLT,
//     cargo_capacity: vehicleData.cargo_capacity,
//     supply_capacity: vehicleData.consumables,
// }

function Vehicles({vehiclesData=[], isOpen=false}) {
    function displayTitle() {
        if(isOpen){
            return (
            <h4>Vehicles</h4>
            );
        }
        return
    }
    return (
        <div className="vehicles">
            {displayTitle()}
            <Accordion defaultActiveKey="0">
                {vehiclesData && vehiclesData.map((vehicle, index) => {
                    return (
                        <Card key={index} >
                            <Card.Header class="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {vehicle.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body class="text-dark">
                                    <Card.Title>{vehicle.name}</Card.Title>
                                    <Card.Text>
                                        <b>Model: </b>{vehicle.model}<br/>
                                        <b>Class: </b>{vehicle.vehicle_class}<br/>
                                        <b>Manufacturer: </b>{vehicle.manufacturer}<br/>
                                        <b>Cost: </b>{vehicle.cost}<br/>
                                        <b>Length: </b>{vehicle.length}<br/>
                                        <b>Minimum Crew: </b>{vehicle.minimum_crew}<br/>
                                        <b>Maximum Passengers: </b>{vehicle.maximum_passengers}<br/>
                                        <b>Max Atmo Speed: </b>{vehicle.max_atmosphering_speed}<br/>
                                        <b>Cargo Capacity: </b>{vehicle.cargo_capacity}<br/>
                                        <b>Supply Capacity: </b>{vehicle.supply_capacity}<br/>
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

export default Vehicles