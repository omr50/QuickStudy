import { useEffect, useState } from "react"
import { deleteCardSetApi, retrieveAllCardSetsForUsernameApi, retrieveCardsForSetApi } from "./api/FlashcardApiService"
import { useAuth } from "./security/AuthContext"
import { Button, Card, Dropdown, FormControl, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function FlashcardComponent() {
    const authContext = useAuth()
    const username = authContext.username
    const [cardSets, setFlashCardSets] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => refreshFlashcards(), []
    )
    function refreshFlashcards() {
        console.log('REQUEST')
        retrieveAllCardSetsForUsernameApi(username)
            .then(response => {
                console.log(response)
                setFlashCardSets(response.data)
            })
            .catch(error => console.log(error))
    }
    
    function retrieveAllCards(id, setname){
        navigate(`/flashcards/${setname}/${id}`)
    }


    function deleteflashCardSet(id) {
        deleteCardSetApi(username, id)
        .then(
            () => {
                // 1. display message
                // 2. update flashCardSets list
                refreshFlashcards()
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }
    return (
        <div>
            <h3 className="flashcard-title mb-2">Your Card Sets</h3>
            <p className="p-button">
                    <div className="circular-button" onClick={()=>{ navigate("/cardset-form/-1")}}> + </div> 
            </p>

            <div className="cardset-container">
            {cardSets.map((flashCardSet)=>{
                return (
                //     <Card className="custom-card" key={flashCardSet.id} onClick={() => {retrieveAllCards(flashCardSet.id, flashCardSet.setName)}}>
                //     <Card.Body>
                //       <Card.Title className="card-title" style={{paddingTop:'0px'}}>{flashCardSet.setName}</Card.Title>
                //       <Card.Text className="card-text">{flashCardSet.setDescription}</Card.Text>
                //       {/* <td><Button className="btn-danger" onClick={()=>{deleteflashCardSet(flashCardSet.id)}}>&#x2715;</Button></td> */}
                //     {/* <td><Button className="btn-primary" onClick={()=>{updateflashCardSet(flashCardSet.id)}}><span style={{fontSize:'20px'}}>&#x27F3;</span></Button></td> */}
                //     </Card.Body>
                //   </Card>


            <Card className="custom-card" key={flashCardSet.id} onClick={() => {retrieveAllCards(flashCardSet.id, flashCardSet.setName)}}>
            {/* <div className="d-flex justify-content-between">
                <Button variant="outline-danger" size="lg" onClick={(event)=>{deleteflashCardSet(flashCardSet.id); event.stopPropagation();}} style={{'borderRadius':'100%'}}>
                &#10005;
                </Button>
                <Button variant="outline-dark" size="lg" onClick={(event)=>{navigate(`/cardset-form/${flashCardSet.id}`); event.stopPropagation();}} style={{'borderRadius':'100%'}}>
                &#9998;
                </Button>
            </div> */}

            <div style={{'position':'relative', 'marginTop':'25px'}}>
                <div style={{"position":'absolute', 'right':'0', 'bottom':'0'}}>
                    <Dropdown onClick={(event)=>{event.stopPropagation();}} className="drop-menu">
                        <Dropdown.Toggle id="dropdown-button-light-example1" variant="white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light">
                        <Dropdown.Item onClick={(event)=>{navigate(`/cardset-form/${flashCardSet.id}`); event.stopPropagation();}}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={(event)=>{deleteflashCardSet(flashCardSet.id); event.stopPropagation();}}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Card.Title style={{'fontSize':'50px'}}>{flashCardSet.setName}</Card.Title>
            <Card.Body>
            <Card.Text>{flashCardSet.setDescription}</Card.Text>
            </Card.Body>
            </Card> 
                )
            }
                
            )

        }
        </div>

        </div>
    )
 }
