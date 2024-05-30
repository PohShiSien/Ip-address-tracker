"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Data from "@/components/Data";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

export default function Home() {
  const [address, setAddress] = useState('');
  const [center, setCenter] = useState([51.505, -0.09]);
  const [location, setLocation] = useState([]);
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleInputChange= (event) => {
    setAddress(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_3oGNOrX7Bfypsf94o8vpleqWeuNC9&ipAddress=${address}`)
      const data = await response.json();

      setCenter([data.location.lat, data.location.lng]);
      setLocation([data.location.country, data.location.region, data.location.postalCode]);
      setClicked(true);
      setTimezone(data.location.timezone);
      setIsp(data.isp);
    } catch (error) {
      console.log('Error fetching geolocation data:', error);
    }
  };

  return (
    <div>
      <div className='-z-20 hidden sm:block w-full h-20'>
        <Image
          src="/images/pattern-bg-desktop.png"
          alt='background image'
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='-z-20 sm:hidden w-full h-20'>
        <Image
          src="/images/pattern-bg-mobile.png"
          layout='fill'
          objectFit='cover'
          alt='background image'
        />
      </div>
  
      <div className='relative z-10 flex justify-center flex-col items-center'>
        <h1 className='text-2xl mb-4 font-500 text-white'>IP Address Tracker</h1>
        
        <form className='flex flex-row sm:w-4/12 pt-3 h-16 mb-4 sm:mb-10'>
          <input
            type='text'
            value={address}
            onChange={handleInputChange}
            placeholder='Search for any IP address or domain'
            className='flex-grow rounded-l-xl text-sm text-start p-5'
          />
          <button onClick={handleFormSubmit} className='bg-black rounded-r-xl w-10 flex items-center justify-center'>
            <Image
              src="/images/icon-arrow.svg"
              width={10}
              height={10}
              alt='arrow'
            />
          </button>
        </form>
        <Data clicked={clicked} address={address} location={location} timezone={timezone} isp={isp} />

        <Map center={center} />

      </div>
    </div>
  );
}
