import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
/* Pages */
import Home from './pages/publicpages/Home.tsx';
import Aboutus from './pages/publicpages/Aboutus.tsx'
import Login from './pages/admin/login.tsx'
import VerifyLogin from './pages/admin/loginverify.tsx'
import Blog from './pages/publicpages/Blog.tsx'
import AdminDashBoard from './pages/admin/dashboard.tsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"aboutus",
        element:<Aboutus/>
      },
      {
        path:"/blogs",
        element:<Blog/>
      }
    ]
  },
  {
    path:"/admin",
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"loginverify",
        element:<VerifyLogin/>
      },
      {
        path:"dashboard",
        element:<AdminDashBoard/>
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
