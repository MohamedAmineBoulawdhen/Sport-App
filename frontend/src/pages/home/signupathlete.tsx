import { useEffect, useState } from 'react';
import  { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {Typography } from "@material-ui/core";
import "../../styles/signupathlete.css"
import { registerUser, setError } from '../../features/login/athleteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/store';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';


export default  function Signupathlete(){
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData,setFormData]=useState({});
  const errorToRegister:any = useSelector((state: RootState) => state.auth.error);
  const [showSuccess,setshowSuccess] = useState(false);
  const dispatch:ThunkDispatch<any, any, AnyAction>=useDispatch();
  const navigate=useNavigate();
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidated(true);
    if (form.checkValidity() === true) {
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
      console.log(formData)
      const response= await dispatch(registerUser({...formData}));
      if ('error' in response) {
        console.log(response.error);
      } else {
        setshowSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        formRef?.current?.reset();
      }
    } 
  };
  //////
    useEffect(() => {
      return () => {
        dispatch(setError(null))
      };
    }, []);
    /////

  return (
    <div className="root" style={{padding:30,minHeight:"75vh"}}>
      <Typography variant="h6" style={{fontSize:25,fontWeight:"bold"}}> Sign up</Typography>
      {errorToRegister&&!errorToRegister.error &&(errorToRegister?.msg!="bad credentials") && <Alert variant="danger">
        {errorToRegister?.msg}
      </Alert>} 
      {showSuccess && <Alert variant="info">
      You're officially registered!
      </Alert>} 
    <Form noValidate validated={validated} onSubmit={handleSubmit} name="form" ref={formRef}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            minLength={3}
            name="firstName"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            minLength={3}
            name='lastName'
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" 
          name="email"
          required onChange={handleInputChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
  <Form.Group as={Col} md="6" controlId="validationCustomPassword">
    <Form.Label>Password</Form.Label>
    <InputGroup hasValidation>
      <Form.Control type="password" placeholder="Password" 
      name="password"
      minLength={8}
      required onChange={handleInputChange}/>
      <Form.Control.Feedback type="invalid">
        Please choose a password.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
  <Form.Group as={Col} md="6" controlId="validationCustomPasswordConfirmation">
    <Form.Label style={{width:"100%"}}>Confirm Password</Form.Label>
    <InputGroup hasValidation>
      <Form.Control type="password" placeholder="Confirm Password" required pattern="^.{8,}$" 
      onChange={(e) => {
        const passwordConfirmation = e.target.value;
        const password = (document.getElementById("validationCustomPassword")as HTMLInputElement)?.value;
        if (passwordConfirmation !== password) {
          e.target.setCustomValidity("Passwords do not match!");
        } else {
          e.target.setCustomValidity("");
        }
      }}
      />
      <Form.Control.Feedback type="invalid">
        Please confirm your password. It should be at least 8 characters long.
      </Form.Control.Feedback>
      <Form.Control.Feedback >
        Passwords match!
      </Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Passwords do not match.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
</Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" 
          name="city"
          required onChange={handleInputChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomState">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" 
          name="state"
          required onChange={handleInputChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" 
          name="zip"
          required onChange={handleInputChange}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="12" controlId="validationCustomGender">
      <Form.Label>Gender</Form.Label>
      <Form.Select aria-label="gender" required onChange={handleInputChange} name="gender">
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        Please select a gender.
      </Form.Control.Feedback>
      </Form.Group>
      </Row>
      <Row className="mb-3" style={{marginTop:5}}>
    <Form.Group as={Col} md="4" controlId="validationCustomBirthday">
      <Form.Label>Birthday</Form.Label>
      <Form.Control type="date" placeholder="Birthday" name="dateOfBirth" required onChange={handleInputChange}/>
      <Form.Control.Feedback type="invalid">
        Please provide a valid date of birth.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="validationCustomHeight">
      <Form.Label style={{width:"100%"}}>Height (cm)</Form.Label>
      <Form.Control type="number" placeholder="Height" name="height" required min= {100}onChange={handleInputChange}/>
      <Form.Control.Feedback type="invalid">
        Please provide a valid height in centimeters(minimum 100).
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="validationCustomWeight">
      <Form.Label style={{width:"100%"}}>Weight (kg)</Form.Label>
      <Form.Control type="number" placeholder="Weight" 
      name="weight"
      required min= {40} onChange={handleInputChange}/>
      <Form.Control.Feedback type="invalid">
        Please provide a valid weight in kg(minimum 40)
        </Form.Control.Feedback>
      </Form.Group>
      </Row>



      <Form.Group as={Row} className="mb-4" controlId="formGridCheckbox">
      <Form.Check
      inline
      required
      label=" Agree to terms and conditions"
      feedback="You must agree before submitting."
      feedbackType="invalid"
      style={{ whiteSpace: 'nowrap',position:"relative",top:"5px" }}
       />
      </Form.Group>
      <Button type="submit" className='submit-btn'>Submit</Button>
    </Form>
    </div>
  );
}

