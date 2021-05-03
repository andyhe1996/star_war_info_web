import {Accordion, Button, Card} from 'react-bootstrap';

function Films({filmsData=[]}) {
    return (
        <div className="films">
            <h4>Films</h4>
            <Accordion defaultActiveKey="0">
                {filmsData && filmsData.map((film, index) => {
                    const filmLink = "/films/" + film.id;
                    return (
                        <Card key={index} >
                            <Card.Header className="bg-secondary text-white">
                                <Accordion.Toggle as={Button} variant="secondary" eventKey={index.toString()}>
                                    {film.title}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body className="text-dark">
                                    <Card.Title>{film.title}</Card.Title>
                                    <Card.Text>
                                        <b>Release Date: </b>{film.releaseDate}<br/>
                                        <b>Description: </b>{film.description}<br/>
                                        <b>Director: </b>{film.director}<br/>
                                        <b>Producer: </b>{film.producer}<br/>
                                    </Card.Text>
                                    <Card.Link href={filmLink}>For more Info</Card.Link>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>
        </div>
    );
}

export default Films