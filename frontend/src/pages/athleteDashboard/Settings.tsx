import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { deleteUser } from '../../features/login/athleteSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';
import SidebarAthlete from './Sidebar';

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
`;

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
`;

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const user= useSelector((state: RootState) => state.auth.user);
  const dispatch:ThunkDispatch<any, any, AnyAction>=useDispatch();
const navigate=useNavigate();
  const handleDeleteClick = () => {
    setShowConfirm(true);
  }
const handleConfirmClick = async () => {
    try {
        await dispatch(deleteUser(user?._id));
         navigate("/");
    } catch (error) {
          console.log(error)
    } 
}

  return (
    <><SidebarAthlete/>
    <div style={{marginTop:"50px"}}>
      <h1>Delete Profile</h1>
      <p>Are you sure you want to delete your profile?</p>
      {showConfirm ? (
        <div>
          <h5 style={{color:"red"}}>Deleting your profile is a permanent action and cannot be undone.</h5>
          <ConfirmButton onClick={handleConfirmClick}>Confirm Delete</ConfirmButton>
        </div>
      ) : (
        <DeleteButton onClick={handleDeleteClick}>Delete Profile</DeleteButton>
      )}
    </div>
    </>
  );
};

export default Settings;

