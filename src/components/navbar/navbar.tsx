import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"

export const NavBar = () => {
    return (
        <Navbar className='nav-container' collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="/home" className="nav-link1">Space Hunt</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/explore" className="nav-link">Explore</Nav.Link>
                        <Nav.Link href="/create" className="nav-link">Create</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/register" className="nav-link">Register</Nav.Link>
                        <Nav.Link href="/login" className="nav-link">Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}