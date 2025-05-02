import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
/* Pages */
import HomePage from "./pages/publicpages/Home";
import Login from "./pages/admin/login";
import VerifyLogin from "./pages/admin/loginverify";
import Dashboard from "./pages/admin/Dashboard";
import UpdateBlogPost from "./components/admin/Blogs/updateBlog";
import Aboutus from "./pages/admin/Aboutus/Aboutus";
import AdminBlog from "./pages/admin/Blogs/adminBlog";
import DashboardNav from "./components/admin/dashboardnav";
import { store } from "./stores/naethitStore.ts";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "loginverify",
        element: <VerifyLogin />,
      },
      {
        element:<DashboardNav/>,
        children:[
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "dashboard/blogs",
            element:<AdminBlog/>
          },
          {
            path:"dashboard/blogs/update/:postId",
            element:<UpdateBlogPost/>
          },
          {
            path:"dashboard/aboutus",
            element:<Aboutus/>
          }
        ]
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
