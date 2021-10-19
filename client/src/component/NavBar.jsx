import React, { useContext } from 'react'
import { userContext } from '../App'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const {state}=useContext(userContext);

    const RenderMenu=()=>{
        if (state) {
          return(<>
          <li className="nav-item">
          <NavLink className="nav-link active"  to="/">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link active"  to="/About">About</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link active"  to="/Contact">Contact</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/Logout">
          <button type="button" className="btn btn-outline-danger">Logout</button>
          </NavLink>
        </li>
          </>)
        }
        else{
          return(<>
          <li className="nav-item">
          <NavLink className="nav-link active"  to="/">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link active"  to="/About">About</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link active"  to="/Contact">Contact</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/Login">
          <button type="button" className="btn btn-outline-primary">Login</button>
          </NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink to="/Signup">
          <button type="button" className="btn btn-outline-warning">SignUp</button>
          </NavLink>
        </li>
          </>)
        }
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Profiler</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <RenderMenu/>
      </ul>
  
    </div>
  </div>
</nav>
        </>
    )
}

export default NavBar
