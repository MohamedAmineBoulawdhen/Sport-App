// import React from 'react'
import ModelSessions from './ModelSession';
import SessionCard from './SessionCard';
import SidebarAthlete from './Sidebar';

const sessionsexamples=[{
  name: "Group Training Session",
  description: "This is a group training session",
  startDate: "2022-01-01",
  completionDate: "2022-01-01",
  startTime: "08:00",
  endTime: "10:00",
  locationName: "Gym",
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
  // coaches: ["coach1", "coach2"],
  // admin: ["admin1"],
  maximumAthletes: 20,
  // athletes: ["athlete1", "athlete2"],
  notes: "Bring water and towel",
  status: "confirmed",
  type: "group training"
},
{
  name: "Personal Training Session",
  description: "This is a personal training session",
  startDate: "2022-05-15",
  completionDate: "2022-05-15",
  startTime: "10:00",
  endTime: "11:00",
  locationName: "Home",
  street: "456 Oak St",
  city: "Smallville",
  state: "TX",
  zip: "67890",
  // coaches: ["coach3"],
  // admin: ["admin2"],
  maximumAthletes: 1,
  // athletes: ["athlete3"],
  notes: "Bring workout clothes",
  status: "pending",
  type: "personal training"
},
{
  name: "Nutrition Plan",
  description: "This is a nutrition plan",
  startDate: "2022-06-01",
  completionDate: "2022-06-30",
  startTime: "",
  endTime: "",
  locationName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  // coaches: [],
  // admin: ["admin3"],
  maximumAthletes: 10,
  athletes: [],
  notes: "",
  status: "confirmed",
  type: "nutrition plan"
},
{
  name: "Competition",
  description: "This is a competition",
  startDate: "2022-07-10",
  completionDate: "2022-07-10",
  startTime: "12:00",
  endTime: "16:00",
  locationName: "Stadium",
  street: "789 Maple Ave",
  city: "Bigcity",
  state: "NY",
  zip: "54321",
  // coaches: ["coach4", "coach5"],
  // admin: ["admin4"],
  maximumAthletes: 50,
  // athletes: ["athlete4", "athlete5", "athlete6"],
  notes: "Arrive early for warm-up",
  status: "completed",
  type: "competition"
},
{
  name: "Nutrition Plan for Weight Loss",
  description: "A 12-week nutrition plan designed to help you lose weight.",
  startDate: "2023-05-01",
  completionDate: "2023-07-23",
  startTime: "10:00",
  endTime: "11:00",
  locationName: "Online",
  street: "",
  city: "",
  state: "",
  zip: "",
  // coaches: ["coach_id_1"],
  // admin: ["admin_id_1"],
  maximumAthletes: 1,
  // athletes: ["athlete_id_1"],
  notes: "Remember to log all of your meals in the provided food diary.",
  status: "confirmed",
  type: "nutrition plan"
},
{
  name: "Outdoor Bootcamp",
  description: "A 6-week outdoor bootcamp program for all fitness levels.",
  startDate: "2023-06-01",
  completionDate: "2023-07-15",
  startTime: "07:00",
  endTime: "08:00",
  locationName: "Central Park",
  street: "",
  city: "New York",
  state: "NY",
  zip: "10019",
  // coaches: ["coach_id_1", "coach_id_2"],
  // admin: ["admin_id_1"],
  maximumAthletes: 20,
  // athletes: ["athlete_id_1", "athlete_id_2", "athlete_id_3"],
  notes: "Please bring your own mat and water bottle.",
  status: "confirmed",
  type: "group training"
},
{
  name: "One-on-One Training",
  description: "A 12-session package of personalized one-on-one training sessions with a certified personal trainer.",
  startDate: "2023-05-01",
  completionDate: "2023-06-30",
  startTime: "15:00",
  endTime: "16:00",
  locationName: "Gym",
  street: "123 Main St",
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
  // coaches: ["coach_id_1"],
  // admin: ["admin_id_1"],
  maximumAthletes: 1,
  // athletes: ["athlete_id_1"],
  notes: "Please bring a towel and wear comfortable workout clothes.",
  status: "confirmed",
  type: "personal training"
}
];

const Sessions = () => {
const sessionsCard=sessionsexamples.map((session:any)=> <SessionCard session={session}/>)
  return (
    <>
    <SidebarAthlete/>
    <div style={{marginTop:"50px"}}>
        <div>
            <h1><center> Sessions </center></h1>
            <ModelSessions/>
            <div style={{margin:"20px"}}>
              {sessionsCard}
            </div>
        </div>
    </div>
    </>
  )
}

export default Sessions


