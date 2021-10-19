import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {

const {dispatch}=useContext(userContext);
const history=useHistory();

const [user,setUser]=useState({
  name:"",
  phone:"",
  work:"",
  email:"",
  password:"",
  cpassword:""
})

let name,value;
const handleInput=(e)=>{
   name=e.target.name;
   value=e.target.value;

   setUser({...user,[name]:value})
}

const PostData=async(e)=>{
   e.preventDefault();

   const { name,
   phone,
   work,
   email,
   password,
   cpassword}=user;

   const res=await fetch("/register",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({name,email,phone,work,password,cpassword})
  })
  
  
  if (res.status === 422 || !res) {
  
    const diffToast=()=>{
      toast.error("Registration unsucessfull",{
          position:"top-center",
          theme:"colored"
      })
  }
  diffToast();
  } else {
    dispatch({type:"USER",payload:true})

    const diffToast=()=>{
      toast.success("Registration sucessfull",{
          position:"top-center",
          theme:"colored"
      })
  }
  diffToast();
    
  setTimeout(()=>{
    history.push("/");
  },7000)
  
  }
}
    return (
        <>
        <form method="POST" className="container">

        <div className="mb-3">
    <label  className="form-label">Your Name</label>
    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInput} />
  </div>

  <div className="mb-3">
    <label className="form-label">Your Phone</label>
    <input type="tel" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInput}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Your Work</label>
    <input type="text" className="form-control" id="work" name="work" value={user.work} onChange={handleInput} />
  </div>


  <div className="mt-3 mb-3">
    <label className="form-label">Your Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={user.email} onChange={handleInput}/>
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword2" name="cpassword" value={user.cpassword} onChange={handleInput}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" >Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={PostData}>Register</button>
</form>

<ToastContainer/>
        </>
    )
}

export default Signup
