import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useNavigate } from 'react-router-dom'
import { deleteAthlete } from '../../features/athlete/athleteSlice'
import SidebarAthlete from './Sidebar'

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`

const ConfirmButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: darkgreen;
  }
`

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const athlete = useSelector((state: any) => state?.auth.athlete)
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
  const navigate = useNavigate()
  const handleDeleteClick = () => {
    setShowConfirm(true)
  }
  const handleConfirmClick = async () => {
    try {
      await dispatch(deleteAthlete(athlete?._id))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SidebarAthlete />
      <div style={{ marginTop: '50px' }}>
        <h1>Delete Profile</h1>
        <p>Are you sure you want to delete your profile?</p>
        {showConfirm ? (
          <div>
            <h5 style={{ color: 'red' }}>
              Deleting your profile is a permanent action and cannot be undone.
            </h5>
            <DeleteButton onClick={handleConfirmClick}>
              Confirm Delete
            </DeleteButton>
          </div>
        ) : (
          <DeleteButton onClick={handleDeleteClick}>
            Delete Profile
          </DeleteButton>
        )}
      </div>
    </>
  )
}

export default Settings
