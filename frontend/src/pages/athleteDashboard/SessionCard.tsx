import React from 'react'
import { Card } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNotesMedical,
  faInfoCircle,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'
import '../../styles/sessionCard.css'
import { deleteSession } from '../../features/session/sessionSlice'
import DeleteSessionModal from './DeleteSessionModal'
import { FormValues } from './ModelSession'
import EditSession from './EditSession'
import formatedDate from '../../util/formatedDate'

type Props = {
  session: FormValues
}

const SessionCard: React.FC<Props> = ({ session }) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
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
    _id,
  } = session
  const handleDelete = async (e: any) => {
    // console.log(_id)
    try {
      const response = await dispatch(deleteSession({ _id }))
      // console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Card className="card">
      <Card.Header>
        <EditSession session={session} />
        <Card.Title style={{ lineHeight: '2rem' }}>{name}</Card.Title>
      </Card.Header>
      <Card.Body
        style={{
          backgroundColor: '#f2f2f2',
          padding: '20px',
          lineHeight: '2.5',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Card.Subtitle>{description}</Card.Subtitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faCaretRight}
            style={{ marginRight: '10px', color: '#333333' }}
          />
          <Card.Text>{`Type: ${type}`}</Card.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaClock size={16} />
          <Card.Text style={{ marginLeft: 8 }}>{`${formatedDate(
            startDate,
          )} - ${formatedDate(
            completionDate,
          )} | ${startTime} - ${endTime}`}</Card.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaMapMarkerAlt size={16} />
          <Card.Text style={{ marginLeft: 8 }}>
            {locationName}
            {`,${street}, ${city}, ${state} ${zip}`}
          </Card.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaUsers size={16} />
          <Card.Text
            style={{ marginLeft: 8 }}
          >{`Max Athletes: ${maximumAthletes}`}</Card.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ marginRight: '10px', color: '#333333' }}
          />
          <Card.Text>{`Status: ${status}`}</Card.Text>
        </div>
        <Card.Text>
          <FontAwesomeIcon icon={faNotesMedical} /> {`Notes: ${notes}`}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className="text-muted"
        style={{
          opacity: 0.6,
          backgroundColor: '#f2f2f2',
          filter: 'brightness(0.9)',
        }}
      >
        <IconButton aria-label="delete" style={{ float: 'right' }}>
          <DeleteSessionModal onDelete={handleDelete} />
        </IconButton>
      </Card.Footer>
    </Card>
  )
}

export default SessionCard
