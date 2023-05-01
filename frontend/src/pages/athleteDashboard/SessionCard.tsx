import React from "react";
import { Button, Card } from "react-bootstrap";
import { FormValues } from "./ModelSession";
import EditSession from "./EditSession";
import "../../styles/sessionCard.css";
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@mui/icons-material';
import DeleteSessionModal from "./DeleteSessionModal";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { deleteSession } from "../../features/session/sessionSlice";

type Props = {
  session: FormValues;
};

const SessionCard: React.FC<Props> = ({ session }) => {
const dispatch:ThunkDispatch<any, any, AnyAction>=useDispatch();
  const {
    name,
    description,
    startDate,
    completionDate,
    startTime,
    endTime,
    locationName,
    street,
    city,
    state,
    zip,
    maximumAthletes,
    notes,
    status,
    type,
    _id
  } = session;
const handleDelete=async(e:any)=>{
  console.log(_id);
  try {
    const response= await dispatch(deleteSession({_id}));
    console.log(response);
  } catch (error:any) {
    console.log(error);
  };
}

  return (
    <Card className="card">
        <Card.Header>
        <EditSession session={session}/>
        <Card.Title style={{lineHeight: "2rem"}}>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>{description}</Card.Subtitle>
        <Card.Text>{`${startDate} - ${completionDate}`}</Card.Text>
        <Card.Text>{`${startTime} - ${endTime}`}</Card.Text>
        <Card.Text>{locationName}</Card.Text>
        <Card.Text>{`${street}, ${city}, ${state} ${zip}`}</Card.Text>
        {/* <Card.Text>{`Coaches: ${coaches?.join(", ")}`}</Card.Text>
        <Card.Text>{`Admins: ${admin?.join(", ")}`}</Card.Text> */}
        <Card.Text>{`Max Athletes: ${maximumAthletes || 10}`}</Card.Text>
        {/* <Card.Text>{`Athletes: ${athletes?.join(", ")}`}</Card.Text> */}
        <Card.Text>{`Notes: ${notes}`}</Card.Text>
        <Card.Text>{`Status: ${status}`}</Card.Text>
        <Card.Text>{`Type: ${type}`}</Card.Text>
        <IconButton aria-label="delete" style={{float:"right"}}>
          <DeleteSessionModal onDelete={handleDelete} />
        </IconButton>
      </Card.Body>
    </Card>
  );
};

export default SessionCard;
