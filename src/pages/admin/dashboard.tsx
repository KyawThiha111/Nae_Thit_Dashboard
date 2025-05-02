/* Navbar */
import Navbar from "../../components/nav.tsx";
import { Outlet } from "react-router";
import DashboardNav from "../../components/admin/dashboardnav.tsx";
import AdminDashboard from "../../components/dashboard.tsx";

const Dashboard=()=>{
  return (
    <div>
      <AdminDashboard />
    </div>
  )
}

export default Dashboard;
