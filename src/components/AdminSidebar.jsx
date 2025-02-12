import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminSidebar() {

    const { logout, user } = useAuth({ middleware: 'auth', url: '/auth/login' })

  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4">
            <img src="/img/logo.svg" alt="imagen logotipo" 
                className="w-40 mx-auto"
            />
        </div>

        <p className="my-5 font-bold text-center">
            Hola: {user?.name}
        </p>

        <nav className="flex flex-col p-4">
            <Link to="/admin" className="font-bold text-lg">Ordenes</Link>
            <Link to="/admin/productos" className="font-bold text-lg">Productos</Link>
        </nav>

        <div className="my-5 px-5">
            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 transition-colors cursor-pointer font-bold w-full p-3 text-white truncate"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </div>

    </aside>
  )
}
