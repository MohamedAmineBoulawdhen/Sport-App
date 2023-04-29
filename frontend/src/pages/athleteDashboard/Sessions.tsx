import React from 'react'
import SidebarAthlete from './Sidebar';

const sessions=[]

const Sessions = () => {
  return (
    <>
    <SidebarAthlete/>
    <div style={{marginTop:"50px"}}>
        <div>
            <h1>Sessions</h1>
        <button> Add Sessions </button>
        </div>
    </div>
    </>
  )
}

export default Sessions