
/* Navbar */
import Navbar from './components/nav'
import { Outlet } from 'react-router'
function App() {
  return (
    <div>
    <Navbar/>
    <Outlet/>
   </div>
  )
}

export default App
