import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"


let seed="shivansh";
const sprite="avataaars";


const About = () => {
    const history=useHistory();
    const [userdata,setUserdata]=useState({});
    
    useEffect(()=>{
        callAboutPage();
    },[])

    const callAboutPage=async()=>{
        try {
            const res=await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            const data=await res.json();
            setUserdata(data);
            

        if (!res.status === 200) {
             const error=new Error(res.error);
             throw error; 
        }

        } catch (error) {
            console.log(error);
             history.push("/Login")       
        }
    }


    return (
        <div align="center">
              <div style={{width:"70vw",height:"70vh",
              backgroundColor:"black",borderRadius:"15px",marginTop:"85px"}}>
                  <img src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`} loading="lazy" height="150px" width="150px" alt="avatar" />
                <br /><br />
               <span className="fs-3 font-monospace text-white">Name:{userdata.name}</span> <br />
               <span className="fs-3 font-monospace text-white">Profession:{userdata.work}</span> <br />
               <span className="fs-3 font-monospace text-white">Phone:{userdata.phone}</span>  <br />
               <span className="fs-4 font-monospace text-white">Email:{userdata.email}</span>  <br />

              </div>
        </div>
    )
}

export default About
