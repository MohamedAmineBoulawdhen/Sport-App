import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SidebarAthlete from './Sidebar';

const AthleteProfiler=()=>{
  const athlete:any = useSelector((state: RootState) => state.auth.athlete);
  return (
    <div>
      <SidebarAthlete/>
      <div style={{marginTop:"50px"}}>
          {athlete ? (
              <>
                <p>Name: {`${athlete.firstName} ${athlete.lastName}`}</p>
                <p>Email: {athlete.email}</p>
              </>
            ) : (
              <p>Loading athlete data...</p>
            )}
            </div>
    </div>
  )
}

export default AthleteProfiler