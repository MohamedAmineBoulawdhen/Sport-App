import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/white.png';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAthlete } from '../features/athlete/athleteSlice';

function NavBar() {
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logoutAthlete());
  };
  const styleCurrentLoccation=(n:number)=>{
    return n==1?{ fontWeight: 'bold', color: 'white' }:{fontWeight: 'bold', color: 'black' };
  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg"
    className="shadow-sm"
    style={{ marginBottom: '5px' }}
    >
      <Container>
      <img
    alt="Fitness Profiler logo"
    src={logo}
    width="70"
    height="60"
    style={{ "marginRight": "15px" }}
    className="d-inline-block align-top"
  />{' '}
        <Navbar.Brand as={Link} to="/">
Fitness Profiler</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={location.pathname === '/' ? styleCurrentLoccation(1): {}}>Home</Nav.Link>
            <Nav.Link as={Link} to="/explore" style={location.pathname === '/explore' ? styleCurrentLoccation(1): {}}>Explore</Nav.Link>
            <Nav.Link as={Link} to="/about" style={location.pathname === '/about' ? styleCurrentLoccation(1): {}}>About</Nav.Link>
            <NavDropdown title="Feature" id="basic-nav-dropdown" >
              <NavDropdown.Item as={Link} to="/workout" style={location.pathname === '/workout' ? styleCurrentLoccation(2): {}}>Workouts</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/nutrition" style={location.pathname === '/nutrition' ? styleCurrentLoccation(2): {}}>
                Nutrition
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sportevent" style={location.pathname === '/sportevent' ? styleCurrentLoccation(2): {}}>Sport Event</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pricing" style={location.pathname === '/pricing' ? styleCurrentLoccation(2): {}}>
                Pricing
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>


          {isAuthenticated ? (
          <>
          <Nav>
          <NavLink to="/athleteProfiler" className="nav-link">
          <button className="btn btn-primary" style={{width: "auto"}}>
                 Dashboard
          </button>
            {/* <Button variant="outline-light"></Button> */}
          </NavLink>
          <NavLink to="/login" className="nav-link">
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </NavLink>
          </Nav>
          </>
        ) : (
          <>
          <Nav>
          <NavLink to="/login" className="nav-link">
          <button className="btn btn-primary" style={{width: "auto"}}>
                <FaLock />{' '} Login
          </button>
            {/* <Button variant="outline-light"></Button> */}
          </NavLink>
          <NavLink to="/signup" className="nav-link">
            <Button variant="outline-light">Signup</Button>
          </NavLink>
        </Nav>

          </>
        )}












        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
