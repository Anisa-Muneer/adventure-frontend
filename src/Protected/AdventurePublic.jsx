import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

function AdventurePublic() {
  if(localStorage.getItem('currentAdventure')){
    return <Navigate to='/adventure'/>
  }else{
    console.log('return case');
    return <Outlet/>

  }
}

export default AdventurePublic
