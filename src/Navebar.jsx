import React from 'react'
// import Login from './login/Login'

function Navebar() {
  return (
    <nav className="flex items-center  bg-gray-200 p-2 justify-between">
    <span className="font-semibold text-xl text-black">Password Generator</span>
      <div className="flex items-center text-white mr-6 ">
        {/* <Login /> */}
      </div>
      
      
    </nav>
  )
}

export default Navebar