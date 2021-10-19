import React, { useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import {Formik,Field, Form, ErrorMessage} from "formik";


const defaultDetails={
    email:"",
    password:""
}


const Login = () => {

let email="",password="";

const {dispatch}=useContext(userContext);
const history=useHistory();

const LoginSchema=Yup.object().shape({
    email:Yup.string().email('Invalid email address').required(),
    password:Yup.string().min(2,"Too short !")
    .max(9,"Too Long password length should be 8").required()
})


const loginuser=async()=>{

    const res=await fetch("/signin",{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })

    const data=await res.json();
    const {error,message}=data;
    if (res.status ===400 || !data) {
      const diffToast=()=>{
        toast.warning(error,{
            position:"top-center",
            theme:"colored"
        })
    }
    diffToast();
    } else {
        dispatch({type:"USER",payload:true})
        
        const diffToast=()=>{
        toast.success(message,{
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
    <Formik
     initialValues={defaultDetails}
     validationSchema={LoginSchema}
     onSubmit={(values)=>{
     email=values.email;
     password=values.password;
       
       loginuser();
    }}
    >   
<Form  className="container">

<div className="mt-5 mb-3">
<label  className="form-label">Your Email address</label>
<Field name="email" type="email" className="form-control" />
<ErrorMessage name="email" />
</div>

<div className="mb-3">
<label className="form-label">Password</label>
<Field name="password" type="password" className="form-control"/>
<ErrorMessage name="password"/>
</div>

<button type="submit" className="btn btn-primary">Login</button>
</Form>
</Formik>
<ToastContainer/>
        </>
    )
}

export default Login
