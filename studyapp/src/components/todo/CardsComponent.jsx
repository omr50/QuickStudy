import { useState, useEffect } from "react"
import { useAuth } from "./security/AuthContext"
import { Button, Card, Dropdown, Table, DropdownButton, Container, Col, Row } from "react-bootstrap"
import { deleteCardApi, retrieveCardsForSetApi } from "./api/FlashcardApiService"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Cards() {
    const authContext = useAuth()
    const username = authContext.username
    const [allCards, setCards] = useState([])
    const [currCard, setCurrCard] = useState(0);

    const [side, setSide] = useState(true)
    const {setname, id} = useParams()
    const [studyMode, setStudyMode] = useState('view')
    const navigate = useNavigate()
    function getCards(username, id) {
        retrieveCardsForSetApi(username, id)
        .then(response => {
            console.log(response.data)
            setCards(response.data)
        })
        .catch(error => console.log(error))
    }

    function deleteCard(cardId) {
        deleteCardApi(username, cardId)
        .then(
            () => {
                // 1. display message
                // 2. update flashCardSets list
                getCards(username, id)
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }

    useEffect(() =>getCards(username, id), [])

    const decrementCard = () => {
        setSide(true)
        if (currCard == 0)
            setCurrCard(allCards.length-1)
        else{
            const newVal = currCard - 1
            setCurrCard(newVal)
        }
    }

    const incrementCard = () => {
        setSide(true)
        if (currCard == allCards.length-1)
            setCurrCard(0)
        else{
            const newVal = currCard + 1
            setCurrCard(newVal)
        }
    }

    if (studyMode == 'view')
        return (
            <div>
                <br></br>
                <h1 style={{'fontSize':'60px', 'color':'#1A7CFA'}}>{setname}</h1>
                <br></br>
                <p className="p-button">
                    <div className="circular-button mb-2" onClick={()=>{navigate(`/card-form/-1/${setname}/${id}`)}} style={{'marginRight':'20px'}}> + </div>
                    <span className="hover-btn" style={{'backgroundColor':'#E32227'}} onClick={()=>{if (!allCards.length){alert('Cannot review an empty set!')} else setStudyMode('test')}}>Study</span>
                </p>
                <br></br>
                <br></br>
                <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
                </div>
                <div style={{'display':'flex','justifyContent':'center'}}>
                        <Container>
                        <Row>
                            <Col><h2>Word</h2></Col>
                            <Col><h2>Definition</h2></Col>
                            <Col><h3>Settings</h3></Col>
                        </Row>
                        <hr></hr>
                        <br></br>

                        {allCards.map((card)=> (
                                <div key={card.id}>
                                <Row>
                                <Col>
                                <span style={{'fontSize':'20px', 'marginRight':'20px'}}>{card.word}</span>
                                </Col>
                                <Col>
                                <span style={{'fontSize':'20px'}}>{card.definition}</span>
                                </Col>
                                <Col>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-button-light-example1" variant="white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="light">
                                    <Dropdown.Item onClick={()=>{navigate(`/card-form/${card.id}/${setname}/${id}`)}}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={(event)=>{deleteCard(card.id); event.stopPropagation();}}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Col>
                                </Row>
                                <br></br>

                                </div>
                            ))}
                            </Container>

                    </div>    
    </div>
    )
    // test study mode
    else
        return (
            <div>
                <br></br>
                <h1>Study Mode</h1>
                
                <div style={{'display':'flex', 'flexDirection':'row', 'justifyContent':'center', 'alignItems':'center', 'paddingTop':'50px'}}>
                    <span style={{'fontSize':'40px', 'cursor':'pointer'}} onClick={decrementCard} className="arrow"> &#x3c; </span>
                    <Card className="custom-card front-card" onClick={()=>{setSide(!side)}} style={{'minHeight':'300px'}}>
                        <h9>{currCard+1}/{allCards.length}</h9>
                        <Card.Body>
                            <Card.Title><br></br></Card.Title>
                            {side ? 
                            <Card.Text style={{paddingTop:'0px', 'fontSize':'40px', 'width':'540px'}}>{allCards[currCard].word}</Card.Text>
                            :
                            <Card.Text style={{paddingTop:'0px', 'fontSize':'30px', 'width':'540px'}}>{allCards[currCard].definition}</Card.Text>
                            }   
                        </Card.Body>
                    </Card>
                    <span style={{'fontSize':'40px', 'cursor':'pointer'}}  onClick={incrementCard} className="arrow"> &#x3e; </span>


                    {/* <Card className="custom-card" key={card.id}>
                        <Card.Body>
                            <Card.Title><br></br></Card.Title>
                            <Card.Text className="card-title" style={{paddingTop:'0px'}}>{card.definition}</Card.Text>
                        </Card.Body>
                    </Card> */}

                </div>

                <br></br>
                <div>
                    <h6 className="text-secondary">Click the card to see the definition. Go to next or previous card with arrows.</h6>
                    <Button variant="warning m-2" onClick={()=>{setStudyMode('view'); setCurrCard(0)}}>Exit</Button>
                </div>
            </div>
        )
}

export default Cards