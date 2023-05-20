import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { retrieveHelloWorldBean, retrieveHelloWorldPath, retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";
import {Container, Card, Col, Row} from "react-bootstrap";
import SignUpComponent from "./SignUpComponent";
function WelcomeComponent() {
    const authContext = useAuth()
    const token = authContext.token
    const username = authContext.username
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date());
    const AuthContext = useAuth();
    const isAuthenticated = AuthContext.isAuthenticated;

    function logout() {
        AuthContext.logout()
    }
    useEffect( () => {
        setInterval(() => {
            setCurrentDate(new Date());
          }, 1000);
    }, [])
    return (
        // if user is not logged in then display the cards and the sign up tab in columns
        <div className="homepage">
            <br></br>
            <br></br>
        <Container style={{'height':'50vh !important'}}>
          {(token == null) ? 
            (
          <Row className="justify-content-center" style={{'height':'40%'}}>
            <Col>
            {(token == null) ? (<h1 className="homepage-title mb-2" style={{'textAlign':'left', 'color':'#1A7CFA'}}>Study!</h1>) : (<h1 className="homepage-title mb-2 mt-2">Hello, {username}</h1>) }

              <div className="homepage-button-group">
                
            <div>
                <div style={{ 'paddingTop':'10px', 'borderRadius':'10px'}}>
                    <p className="homepage-description mb-3 pb-3" style={{'textAlign':'left'}}>
                        Create flash cards to help you review and study for your exams.
                    </p>
                <p className="homepage-description mb-3 pb-3 " style={{'textAlign':'left'}}>
                    Keep track of your deadlines by creating todos.
                </p>
                </div>
                    {/* <Button variant="primary" size="lg" className="homepage-login-button mb-5" onClick={()=>{navigate("/login")}}>
                        Log in
                    </Button>
                    <Button variant="secondary" size="lg" className="homepage-signup-button mb-5">
                        Sign up
                    </Button> */}
                </div>
            </div>
            </Col>

            <Col>
                
                <div style={{'backgroundColor':'#EAEFF2', 'borderRadius':'10px', 'maxWidth':'500px', 'paddingTop':'15px'}}>
                    <SignUpComponent/>
                </div>
            </Col>
            </Row>
            )

            :
                        // if the user is logged in then we want to show the card links
                        // to the todos/flashcards and also add in the + button so that
                        // they can add new ones.
            (
            <div>
                <h1>Dashboard</h1>
            <Row className="justify-content-center pt-5" style={{'height':'40%'}}>
                <Col>
                <div style={{'backgroundColor':'#eeeeee ', 'paddingTop':'10px', 'borderRadius':'10px', 'minHeight':'180px'}} className="front-card" onClick={()=>{navigate("/flashcards")}}>
                <h2 style={{'color':'#4255ff'}}>Flash Cards</h2>
                <p className="homepage-description mb-4 pb-3 text-center p-3">
                    Click to go to your flashcards page.
                </p>
                </div>
                </Col>

                <Col>  

                <div style={{'backgroundColor':'#eeeeee', 'paddingTop':'10px', 'borderRadius':'10px', 'minHeight':'180px'}} className="front-card" onClick={()=>{navigate("/todos")}}>
                
                <h2 style={{'color':'#4255ff'}}>Tasks</h2>
                <p className="homepage-description mb-4 pb-3 text-center p-3">
                    Go to your tasks page.
                </p>
                </div>

                </Col>
                {/* <Button variant="primary" size="lg" className="homepage-login-button mb-5" onClick={()=>{navigate("/login")}}>
                    Log in
                </Button>
                <Button variant="secondary" size="lg" className="homepage-signup-button mb-5">
                    Sign up
                </Button> */}
            </Row>
            <Row>
                <Col className="bg-light m-3" style={{'borderRadius':'10px'}}>
                    <div style={{'color':'#B12B24', 'fontSize':'40px'}}>Create</div>

                    <div className="mb-2 fs-5">New Todo</div>

                <p className="p-button">
                    <div className="circular-button mb-2 fs-5" onClick={(event)=>{navigate("/todo/-1"); event.stopPropagation();}}> + </div> 
                </p>
                    <div className="mb-2 fs-5">New study set</div>

                <p className="p-button">
                    <div className="circular-button mb-2 fs-5" onClick={(event)=>{navigate("/cardset-form/-1"); event.stopPropagation();}}> + </div> 
                </p>
                </Col>
                <Col className="bg-light m-3" style={{'borderRadius':'10px'}}>
                <Row>
                    <div className="mt-5">
                        <h3>Current Date and Time</h3>
                        <p>{currentDate.toLocaleString()}</p>
                    </div>
                </Row>
                <Row>
                    <h2 style={{'minHeight':'70px'}}>Leave App?</h2>
                    <p>
                    <Button className="homepage-login-button" style={{'width':'fitContent'}} onClick={logout}>Log out</Button>
                    </p>
                </Row>
                </Col>
            </Row>
            </div>
            )    }
            
        </Container>
      </div>
    )
}

export default WelcomeComponent;