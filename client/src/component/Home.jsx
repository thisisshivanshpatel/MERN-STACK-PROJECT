import React, { useEffect, useState } from 'react'


const Home = () => {
  const [user,setUser]=useState({});
  const [show,setShow]=useState(false);

  useEffect(()=>{
     callHomePage();
  },[])

   const callHomePage=async()=>{

    try {
      
      const res=await fetch('/getdata',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "content-Type":"application/json"
        },
        credentials:"include"
      })
      
      const data=await res.json();
      setUser(data);
      setShow(true);

      if (!res.status === 200) {
        const error=new Error(res.error);
        throw error; 
   }

    } catch (error) {
      console.log(error); 
    }

   }
    return (
        <div>
      <h1 className="mt-5 text-center text-white font-monospace">welcome {user.name}</h1>            
       
      <h2 className="mt-3 text-center font-monospace text-white">{show ? 'Happy to see you back':'we are the MERN Devloper'}</h2>
        </div>
    )
}

export default Home
