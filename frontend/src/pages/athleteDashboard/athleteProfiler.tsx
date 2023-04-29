import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SidebarAthlete from './Sidebar';

const AthleteProfiler=()=>{
  const user:any = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <SidebarAthlete/>
      <div style={{marginTop:"50px"}}>
          {user ? (
              <>
                <p>Name: {`${user.firstName} ${user.lastName}`}</p>
                <p>Email: {user.email}</p>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
            </div>
    </div>
  )
}

export default AthleteProfiler