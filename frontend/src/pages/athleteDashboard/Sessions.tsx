// import React from 'react'
import { useSelector } from 'react-redux'
import ModelSessions from './ModelSession'
import SessionCard from './SessionCard'
import SidebarAthlete from './Sidebar'

const Sessions = () => {
  const sessions: any = useSelector((state: any) => state.session.sessions)
  const sessionsCard = sessions.map((session: any, index: number) => (
    <SessionCard session={session} key={index} />
  ))
  // console.log(sessions);
  return (
    <>
      <SidebarAthlete />
      <div style={{ marginTop: '50px' }}>
        <div>
          <h1>
            <center> Sessions </center>
          </h1>
          <ModelSessions />
          <div style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}>
            {sessionsCard}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sessions
