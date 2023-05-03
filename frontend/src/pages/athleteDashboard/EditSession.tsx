import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { Alert, Snackbar } from '@mui/material'
import mongoose from 'mongoose';
import  "../../styles/model.css";
import { FaEdit } from 'react-icons/fa';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { UpdateSession } from '../../features/session/sessionSlice';
import formatedDate from '../../util/formatedDate';


export interface FormValues {
  _id:any;
  name: string;
  description: string;
  startDate: string;
  completionDate: string;
  startTime: String;
  endTime: string;
  locationName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  coaches?: mongoose.Types.ObjectId[];
  admin?: mongoose.Types.ObjectId[];
  maximumAthletes?: number;
  athletes?:mongoose.Types.ObjectId[];
  notes?: string;
  status?: "confirmed" | "pending" | "canceled"| "completed";
  type?: "event" | "personal training" | "nutrition plan"| "competition"| "group training";
}


function EditSession({session}: {session: FormValues}) {
const [show, setShow] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const dispatch:ThunkDispatch<any, any, AnyAction> = useDispatch();
let  {startDate,completionDate} = session
startDate = formatedDate(startDate)
completionDate = formatedDate(completionDate)
session={...session,startDate,completionDate}
// console.log(startDate,completionDate)
const { register, handleSubmit, formState: { errors } , reset } = useForm<FormValues>({defaultValues:session})


const onSubmit = async (data:any) => { 
  // console.log(data)
  let _id: any ;
  let rest: object;
 ({ _id, ...rest } = data);
// console.log(_id,rest)
  try {
    const response= await dispatch(UpdateSession({ _id,  rest }));
    console.log(response);
    setShowAlert(true);
    setTimeout(()=>{setShowAlert(false)},3000);
  } catch (error) {
    console.log(error)
  }
}
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} style={{ float: "right" ,fontWeight:'bold'}}>
          Edit {" "}
          <FaEdit style={{marginTop:"-4"}}/>
        </Button>

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>

      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the name of the session"
          {...register("name", {
            required: { value: true, message: "Name is required" }
          })}
        />
        <Form.Text as={Form.Group}>
        {errors?.name &&  typeof errors.name.message === 'string' &&<Alert severity="error"className='alert'>{errors.name.message }</Alert>}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea" rows={3} 
          placeholder="Description"
          {...register("description", {
            required: { value: true, message: "Description name is required" }
          })}         
        />
        <Form.Text as={Form.Group}>
        {errors?.description &&  typeof errors.description.message === 'string' &&<Alert severity="error"className='alert'>{errors.description.message }</Alert>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" {...register("startDate", {
          required: { value: true, message: "start Date name is required" }
        })} />
        {errors.startDate && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>

      <Form.Group controlId="completionDate">
        <Form.Label>Completion Date</Form.Label>
        <Form.Control type="date" {...register("completionDate", {
          required: { value: true, message: "completionDate is required" }
        })}/>
        {errors.completionDate && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>


      <Form.Group className="mb-3" controlId="startTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          {...register("startTime", {
            required: { value: true, message: "Start Time is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.startTime && typeof errors.startTime.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.startTime.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="startTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          {...register("endTime", {
            required: { value: true, message: "End Time is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.endTime && typeof errors.endTime.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.endTime.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          {...register("street", {
            required: { value: true, message: "Street is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.street && typeof errors.street.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.street.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
        type="text"
        {...register("city", {
          required: { value: true, message: "City is required" }
        })}
      />
        <Form.Text as={Form.Group}>
        {errors?.city && typeof errors.city.message === 'string' &&
          <Alert severity="error" className='alert'>
            {errors.city.message}
          </Alert>
        }
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          {...register("state", {
            required: { value: true, message: "State is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.state && typeof errors.state.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.state.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>

       <Form.Group className="mb-3" controlId="zip">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          type="text"
          {...register("zip", {
            required: { value: true, message: "Zip is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.zip && typeof errors.zip.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.zip.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="maximumAthletes">
        <Form.Label>Maximum Athletes</Form.Label>
        <Form.Control
          type="number"
          min={1}
          {...register("maximumAthletes", {
            required: { value: true, message: "Maximum Athletes is required" }
          })}
        />
        <Form.Text as={Form.Group}>
          {errors?.maximumAthletes && typeof errors.maximumAthletes.message === 'string' &&
            <Alert severity="error" className='alert'>
              {errors.maximumAthletes.message}
            </Alert>
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          {...register("notes")}
        />
      </Form.Group> 

            <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          {...register("status", {
            required: { value: true, message: "Status is required" },
          })}
        >
          <option value="">--Select--</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </Form.Control>
        <Form.Text as={Form.Group}>
          {errors?.status && typeof errors.status.message === "string" && (
            <Alert severity="error" className="alert">
              {errors.status.message}
            </Alert>
          )}
        </Form.Text>
      </Form.Group>

            <Form.Group className="mb-3" controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          {...register("type", {
            required: { value: true, message: "Type is required" },
          })}
        >
          <option value="">--Select--</option>
          <option value="event">Event</option>
          <option value="personal training">Personal Training</option>
          <option value="nutrition plan">Nutrition Plan</option>
          <option value="competition">Competition</option>
          <option value="group training">Group Training</option>
        </Form.Control>
        <Form.Text as={Form.Group}>
          {errors?.type && typeof errors.type.message === "string" && (
            <Alert severity="error" className="alert">
              {errors.type.message}
            </Alert>
          )}
        </Form.Text>
      </Form.Group>     

      <Button variant="primary" type="submit">
        Save
      </Button>
      <Snackbar open={showAlert} autoHideDuration={2000} onClose={()=>showAlert}>
        <Alert  severity="success">
        Your changes have been saved.
        </Alert>
        </Snackbar>
    </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditSession;