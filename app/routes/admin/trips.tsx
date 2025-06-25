import React from 'react'
import { Header } from 'components'

const Trips = () => {
  return (
   <main className="all-users wrapper">
            <Header
                title="Manage Users"
                description="AI Generated Travel Plans "
                ctaText='create a trip'
                ctaUrl='/trips/create'
            />
            
            </main>

  )
}

export default Trips