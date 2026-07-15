
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const ProtectRoute=()=>{
    // let token= sessionStorage.getItem('token')

    // if(!token){
    //     return  <Navigate to={`/login`} replace />
    // }

    const {loggedIn}=  useAuth()

   return loggedIn ? <Outlet/> : <Navigate to={"/"} replace />
}

export default ProtectRoute