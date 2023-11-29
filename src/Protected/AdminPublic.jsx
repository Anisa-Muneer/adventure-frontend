import { Navigate, Outlet } from 'react-router-dom'

function AdminPublic() {
 if(localStorage.getItem('currentAdmin')){
    return <Navigate to = '/admin/'/>
 }else{
    return <Outlet/>
 }
}

export default AdminPublic
