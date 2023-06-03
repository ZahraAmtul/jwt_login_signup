import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Home({user}) {
  
  if(!user){
  return <Navigate to="/Login"/>  
  }

  return (

    <div>Home</div>
  )
}
