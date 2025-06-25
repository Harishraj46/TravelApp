import {Header, StatsCards, Tripcards} from "../../../components";
import { dashboardStats,user,allTrips } from "~/constants";
import React from 'react'
import TripCard from "components/Tripcards";
import { getUser } from "~/appwrite/auth";
import type { Route } from "./+types/Dashboard";

  const{totalUsers,usersjoined,totaltrip,tripscreated,userrole}=dashboardStats

  export const clientLoader=async()=>await getUser()

const Dashboard = ({loaderData}:Route.ComponentProps) => {
  const user=loaderData as User | null
   
  return (
    <main className='dashboard wrapper'>
        <Header
        title={`welcome ${user?.name ?? 'Guest'}`}
        description="Track Activity"
        />

        <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <StatsCards
                 headerTitle="Total Users"
                 total={totalUsers}
                 currentMonthCount={usersjoined.currentmonth}
                 lastMonthCount={usersjoined.lastmonth}

                />

                <StatsCards
                 headerTitle="Total Trips"
                 total={totaltrip}
                 currentMonthCount={tripscreated.currentmonth}
                 lastMonthCount={tripscreated.lastmonth}

                />

                <StatsCards
                 headerTitle="Active Users"
                 total={userrole.total}
                 currentMonthCount={userrole.currentmonth}
                 lastMonthCount={userrole.lastmonth}

                />
            </div>

        </section>

        <section className="container">
           <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
           
           <div className="trip-grid">
            {allTrips.slice(0,4).map(({id,name,imageUrls,itinerary,tags,estimatedPrice})=>(
               <TripCard
               key={id}
               id={id.toString()}
               name={name}
               imageUrl={imageUrls[0]}
               location={itinerary?.[0]?.location ?? ''}
               tags={tags}
               price={estimatedPrice}
               />
            ))}
           </div>
        </section>

        
        

    </main>
  )
}

export default Dashboard