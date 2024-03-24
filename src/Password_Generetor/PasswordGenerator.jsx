import React, { useEffect, useState } from 'react'
import { MdOutlineContentCopy,MdOutlineRestartAlt,MdOutlineDoneAll } from "react-icons/md";
import { axiosInstance } from '../Service/axiosConfig';



function PasswordGenerator() {

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);
  let attributeOBJ = {
    'number' : true,
    'upperCase' : true,
    'lowerCase' : true,
    'symbol' : true
  }
  const [attributes, setAttributes] = useState(attributeOBJ);

  

  const generatePassword = () => {
      axiosInstance.post('/password/',{attributes,length}).then((res)=>{
        console.log(res) 
        setPassword(res.data.password)
      })
  };

  const refreshPassword = ()=> generatePassword()
  const copyToClipboard = ()=> {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }


  useEffect(() => {
    generatePassword()
    
  }, [attributes,length]);

  const handleChnage = (e)=>{
    let attribute = e.target.id
    try{
      const allFalse = Object.entries(attributes).filter(([key,_]) => key !== attribute ).every(([_,value]) => value === false);
      if(allFalse) return

      setAttributes(prevState => ({
        ...prevState,
        [attribute]: !prevState[attribute] 
      }));
    
      
      
    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <div className="flex flex-col mt-32 justify-center items-center">
      <h1 className="text-5xl font-semibold mb-4">Random Password Generator</h1>
      <p className='text-xl'>Create strong and secure passwords to keep your account safe online.</p>
      <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center h-12 w-96 border my-5 rounded-xl bg-gray-100'>
        <div className='flex mx-auto w-full justify-center items-center'>
        {password}
        </div>
        <div className='ml-auto p2 w-8 '><MdOutlineRestartAlt onClick={refreshPassword} size={22} className='cursor-pointer'/></div>
        </div>
      {!copied ? <MdOutlineContentCopy onClick={copyToClipboard} size={20} className='mx-3'/> : <MdOutlineDoneAll size={20} className='mx-3'/>}
      </div>
      

      <div className="mb-4">
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-64"
        />
        <p>Length: {length}</p>
      </div>

      <div className='flex'>
    <div className="mb-4">
    <input
    id='upperCase'
    type="checkbox"
    checked={attributes['upperCase']}
    onChange={handleChnage}
  />
  <label className="ml-2 mr-5" htmlFor='upper'>Uppercase</label>
</div>

<div className="mb-4">
  <input
    id='lowerCase'
    type="checkbox"
    checked={attributes['lowerCase']}
    onChange={handleChnage}
  />
  <label className="ml-2 mr-5" htmlFor="lowercase">Lowercase</label>
</div>

<div className="mb-4">
  <input
    id='number'
    type="checkbox"
    checked={attributes['number']}
    onChange={handleChnage}
  />
  <label className="ml-2 mr-5" htmlFor="number">Numbers</label>
</div>

<div className="mb-4">
  <input
  id='symbol'
    type="checkbox"
    checked={attributes['symbol']}
    onChange={handleChnage}
  />
  <label className="ml-2"  htmlFor="symbel" >Symbols</label>
</div>
</div>
{/* <button className='bg-blue-500 hover:bg-blue-600 text-lg text-white px-3 py-1 mt-8 font-medium rounded'>Save</button> */}
</div>
  )
}

export default PasswordGenerator