"use client"

import React from "react";

export default function Data({ clicked, address, location, timezone, isp }) {
    return (
        <div className="absolute top-32 sm:top-44 z-20 flex flex-col sm:flex-row bg-white h-1/3 sm:h-32 w-1/2 sm:w-2/3 p-6 border rounded-xl text-xs font-500 text-gray-400"> 
            <div className="flex-1 w-30 tracking-widest border-b-2 sm:border-b-0 sm:border-r-2 overflow-hidden pl-7 sm:pl-0">
                <p>IP ADDRESS</p>
                {clicked &&
                <h1 className="text-2xl text-black truncate">{address}</h1>
            }       
            </div>
            <div className="flex-1 w-30 tracking-widest border-b-2 sm:border-b-0 sm:border-r-2 pl-7">
                <p>LOCATION</p>
                {clicked &&
                <h1 className="text-2xl text-black">{location[0]}, {location[1]} <br></br> {location[2]}</h1>
                } 
            </div>
            <div className="flex-1 w-30 tracking-widest border-b-2 sm:border-b-0 sm:border-r-2 pl-7">
                <p>TIMEZONE</p>
                {clicked &&
                <h1 className="text-2xl text-black">UTC {timezone}</h1>
                }       
            </div>
            <div className="flex-1 w-30 tracking-widest pl-7">
                <p>ISP</p>
                <h1 className="text-2xl text-black">{isp}</h1>
            </div>
        </div>
    );
}