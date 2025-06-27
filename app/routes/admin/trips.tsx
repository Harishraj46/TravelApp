import { useSearchParams, type LoaderFunctionArgs } from "react-router"
import { Header, Tripcards } from 'components'
import type { Route } from "./+types/trips"
import { parseTripData } from '~/lib/utils'
import { getAllTrips } from '~/appwrite/trip'
import { useState } from "react"
import { PagerComponent } from "@syncfusion/ej2-react-grids"


export const loader=async({request}:LoaderFunctionArgs)=>{
   const limit=8
   const url=new URL(request.url)
   const page=parseInt(url.searchParams.get('page') || "1",10)
   const offset=(page-1)*limit     
   const {allTrips,total}=await getAllTrips(limit,offset)
       return {
   
        trips: allTrips.map(({ $id, tripDetail, imageUrl }) => ({
            id: $id,
            ...parseTripData(tripDetail),
            imageUrl: imageUrl ?? []
        })),
        total
    }
}

const Trips = ({loaderData}:Route.ComponentProps) => {

   const trips=loaderData.trips as Trip[] | []

     const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1')

    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.search = `?page=${page}`
    }
    
  return (
   <main className="all-users wrapper">
            <Header
                title="Manage Users"
                description="AI Generated Travel Plans "
                ctaText='create a trip'
                ctaUrl='/trips/create'
            />

            <section className="p-24-semibold text-dark-100">
              <h1 className="mb-4">Manage Created Trips</h1>

             <div className="trip-grid">
                    {trips.map(({id,name,imageUrl,itinerary,interests,travelStyle,estimatedPrice}) => (
                        
                        <Tripcards
                            key={id}
                            id={id}
                            name={name}
                            imageUrl={imageUrl[0]}
                            location={itinerary?.[0]?.location ?? ""}
                            tags={[interests, travelStyle]}
                            price={estimatedPrice}
                        />
                    ))}
                </div>

                 {/* <PagerComponent
                    totalRecordsCount={loaderData.total}
                    pageSize={8}
                    currentPage={currentPage}
                    click={(args) => handlePageChange(args.currentPage)}
                    cssClass="!mb-4"
                /> */}

            </section>
            
            </main>

  )
}

export default Trips