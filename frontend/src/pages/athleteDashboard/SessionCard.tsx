import React from "react";
import { Button, Card } from "react-bootstrap";
import { FormValues } from "./ModelSession";
import { FaEdit } from 'react-icons/fa';
import EditSession from "./EditSession";
type Props = {
  session: FormValues;
};

const SessionCard: React.FC<Props> = ({ session }) => {
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
    coaches,
    admin,
    maximumAthletes,
    athletes,
    notes,
    status,
    type,
  } = session;
const onEditClick=(e:any)=>{}

  return (
    <Card style={{margin:"20px"}}>
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
      </Card.Body>
    </Card>
  );
};

export default SessionCard;
