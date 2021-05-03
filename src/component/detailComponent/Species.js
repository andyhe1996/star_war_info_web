import {Accordion, Button, Card} from 'react-bootstrap';

// // singleSpecies fields
// // {
//     id: response.id,
//     name: speciesData.name,
//     classification: speciesData.classification,
//     designation: speciesData.designation,
//     average_height: speciesData.average_height,
//     average_lifespan: speciesData.average_lifespan,
//     skin_color: speciesData.skin_color,
//     hair_color: speciesData.hair_color,
//     eye_color: speciesData.eye_color,
//     language: speciesData.language,
// // }

function Species({speciesData=[]}) {
    return (
        <div className="species">
            <h4>Species</h4>
            <Accordion defaultActiveKey="0">
                {speciesData && speciesData.map((singleSpecies, index) => {
                    return (
                        <Card key={index} >
                            <Card.Header className="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {singleSpecies.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body className="text-dark">
                                    <Card.Title>{singleSpecies.name}</Card.Title>
                                    <Card.Text>
                                        <b>Classification: </b>{singleSpecies.classification}<br/>
                                        <b>Designation: </b>{singleSpecies.designation}<br/>
                                        <b>Average Height: </b>{singleSpecies.average_height}<br/>
                                        <b>Average Lifespan: </b>{singleSpecies.average_lifespan}<br/>
                                        <b>Skin Colors: </b>{singleSpecies.skin_colors}<br/>
                                        <b>Hair Colors: </b>{singleSpecies.hair_colors}<br/>
                                        <b>Eye Colors: </b>{singleSpecies.eye_colors}<br/>
                                        <b>Language: </b>{singleSpecies.language}<br/>
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

export default Species