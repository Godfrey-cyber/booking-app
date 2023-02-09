// import { ClockIcon } from '@heroicons/react/outline'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useFetch from '../utilities/useFetch'
import { cityData } from '../utilities/utiles'

const Featured = () => {
    const {data1, loading, error } = useFetch("/hotels?featured=true&limit=4")
  return (
    <section className="w-full h-full bg-gray-50 py-24 flex flex-col px-12 sm:px-24">
        <div className="flex flex-col space-y-4 items-center">
            <h3 className="text-4xl font-mono text-gray-900 text-center">Featured Places</h3>
            <p className="font-['Montserrat'] text-sm text-gray-600 w-1/3 sm:w-4/5 text-center align-center">Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
        </div>
        <div className="grid grid-cols-12 gap-6 my-14">
        {data1.map((city, i) => (
                <div key={city.id} className="flex flex-col sm:col-span-6 col-span-12 group xl:col-span-4 items-center align-center h-80 relative hover:animate-pulse transition delay-200 cursor-pointer w-auto rounded-t-md" key={city._id}>
                <span className="bg-teal-400 py-1 px-3 rounded-xl text-white text-sm group-hover:bg-red-600 transition delay-200 absolute top-6 left-6">$ {city.cheapestPrice} / Night</span>
                <img src={cityData[0].image} className="w-full h-3/5 object-fit rounded-t-md" alt="helloplace" />
                {/* <div className="flex space-x-2 items-center absolute bottom-6 left-6">
                    <p className="text-xl text-white font-medium group-hover:text-red-600 transition delay-200">{city.country}</p>
                    <span className="py-1 px-3 bg-teal-500 rounded-xl text-white text-xs group-hover:bg-red-600 transition delay-200">{city.city}</span>
                </div> */}
                <div className="flex flex-col space-y-2 rounded-b-md bg-white shadow hover:shadow-gray-200 w-full h-2/5 py-2 px-4">
                    <p className="text-xl text-gray-800 font-mono group-hover:text-red-600">{city.city}</p>
                    <p className="text-sm text-gray-500">{city?.name}</p>
                    <span className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm">({city?.reviews}) Reviews</p>
                        <span className="flex space-x-2 items-center">
                            {/* <ClockIcon className="text-gray-400 text-yellow h-4" /> */}
                            <FontAwesomeIcon className="group-hover:text-red-400" icon={faClock} />
                            <p className="text-gray-500 text-sm">{city?.time}</p>
                        </span>
                    </span>
                </div>
            </div>
        ))}
        </div>
    </section>
  )
}

export default Featured