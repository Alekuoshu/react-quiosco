import { Outlet } from 'react-router-dom'
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from '../hooks/useAuth';
import { ToastContainer } from "react-toastify"

export default function AdminLayout() {

    useAuth({ middleware: 'admin', url: '/' });

  return (
    <div className="md:flex">
        <AdminSidebar />

        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
            <Outlet />
        </main>

        <ToastContainer 
          position="top-center"
          autoClose={3000}
        />
    </div>
  )
}
