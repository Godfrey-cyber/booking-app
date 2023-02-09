import React from 'react'
import useFetch from '../utilities/useFetch'
import {data} from "../utilities/utiles"

const Destinations = () => {
   const {data1, loading, error } = useFetch("/hotels/countByType")
  return (
    <section className="w-full h-full bg-white flex py-8 flex-col px-12 sm:px-24">
        <div className="flex flex-col space-y-4 items-center">
            <h3 className="text-4xl font-mono text-gray-900 text-center">Popular Destinations</h3>
            <p className="text-sm font-semibold text-gray-600 font-['Montserrat'] w-1/3 sm:w-4/5 text-center align-center">Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
        </div>
        <div className="grid grid-cols-12 gap-4 my-14">
        {data.map((place, i) => (
          <div className="flex flex-col sm:col-span-6 col-span-12 group xl:col-span-4 items-center align-center h-60 relative hover:animate-pulse transition delay-200 cursor-pointer w-auto rounded-md" key={place.id}>
            <img src={place.image} className="w-full h-full object-fit rounded-md" alt="helloplace" />
            <div className="flex space-x-2 items-center absolute bottom-6 left-6">
              <p className="text-xl text-white font-['Montserrat'] font-bold group-hover:text-red-600 transition delay-200">{place.location}</p>
              <span className="py-1 px-3 bg-teal-500 rounded-xl text-white text-xs group-hover:bg-red-600 transition delay-200">{place.hotels} hotels</span>
            </div>
          </div> 
        ))}
        </div>

    </section>
  )
}

export default Destinations