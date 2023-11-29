
import  Footer  from "../../components/common/User/Footer"
import { Outlet } from "react-router-dom"
import UNavBar from "../../components/common/User/UNavBar"

function Layout() {
    return (
      <>
   
          <div >
            <UNavBar/>
          </div>
          <div className='h-auto min-h-screen'>
            <Outlet/>
          </div>
          <div>
            <Footer/>
          </div>
      </>
    )
  }
  
  export default Layout