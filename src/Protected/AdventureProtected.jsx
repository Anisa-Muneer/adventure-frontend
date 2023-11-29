import { Outlet,Navigate } from "react-router-dom"

function AdventureProtected() {
  if(localStorage.getItem('currentAdventure')){
    return <Outlet/>
  }else{
    console.log('You have no account,please login');
    return <Navigate to='/adventure/login'/>
  }
}

export default AdventureProtected
