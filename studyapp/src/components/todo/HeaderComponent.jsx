import {Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "./security/AuthContext";
function HeaderComponent() {
    const AuthContext = useAuth();
    const isAuthenticated = AuthContext.isAuthenticated;

    function logout() {
        AuthContext.logout()
    }
    return (
        <Navbar bg="light" expand="lg" style={{padding:"10px"}}>
        <Link to="/" className='nav-link'>
            <Navbar.Brand className='ms-2 fs-1 fw-bold navcolor'>Study</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link to="/todos" className='nav-link nav-link2 fs-5'>Tasks</Link>
          <Link to="/flashcards" className='nav-link nav-link2 fs-5'>Flashcards</Link>
            {/* <Nav.Link href="#contact">Contact</Nav.Link> */}
          </Nav>
          <Nav className="auth-buttons">
            {!isAuthenticated && <Link to="/login" className='nav-link nav-link2 fs-5'>Log In</Link>}
            {!isAuthenticated && <Link to="/signup" className='nav-link nav-link2 fs-5'>Sign Up</Link>}
            {isAuthenticated && <Link to='/logout' className='nav-link nav-link2 fs-5' onClick={logout}>Log Out</Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}


export default HeaderComponent;