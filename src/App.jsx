import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdventureRoutes from './Routes/AdventureRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import ChatUserProvider from './components/User/Chat/components/Context/ChatProvider'
import ChatProvider from './components/Adventure/Chat/components/Context/ChatProvider'

function App() {
  return (
  
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/*' element = {<ChatUserProvider>  <UserRoutes/> </ChatUserProvider>} />
            <Route path='/adventure/*' element = {<ChatProvider><AdventureRoutes/></ChatProvider>  }/>
            <Route path='/admin/*' element={ <AdminRoutes/> }/>
          </Routes>

      </BrowserRouter>
      
    </div>
  
  )
}

export default App
