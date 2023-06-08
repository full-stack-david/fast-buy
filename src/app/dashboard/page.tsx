"use client"

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import StatsTiles from '@/components/StatsTiles';
import data from '@/Tiles';

interface userData {
  email : String, 
  role :String , 
  _id: String,
  name : String
}

export default function Dashboard() {
  const Router = useRouter();
  
  useEffect(() => {
    const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');

    if(!Cookies.get('token') || user?.role !== 'admin'){
      Router.push('/')
    }
  });

  return (
    <div className='w-full min-h-screen flex bg-base-200'>
      <AdminSidebar />
      <div className='w-full min-h-screen'>
        <AdminNavbar />
        <div className='w-full grid grid-cols-2 md:grid-cols-3 px-4 py-2'>
          {data?.map((tile, index) => {
            return (
              <StatsTiles key={index}
                Icon={tile.icon}
                title={tile.title}
                count={tile.count}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}