import { FormEvent ,useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Username: ", username);
      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("Confirm Password: ", confirmPassword);
    };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ fontSize: '1.2rem',padding:"10px 2px" }}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required value={email} onChange={e =>{console.log(e.target.type); setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontSize: '1.2rem',padding:"10px 2px" }}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label style={{ fontSize: '1.2rem',padding:"10px 2px" }}>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I agree to the terms and conditions" style={{ fontSize: '1.2rem',padding:"10px 30px" }}/>
            </Form.Group>

            <Button variant="primary" type="submit" >
              Sign Up
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
