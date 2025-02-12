import useQuiosco  from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"
import Categoria from "./Categoria"

export default function Sidebar() {

    const { categorias } = useQuiosco()
    const { logout, user } = useAuth({ middleware: 'auth', url: '/auth/login' })

  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img 
                src="img/logo.svg" 
                alt="Logo" 
                className="w-40 m-auto"
            />
        </div>

        <p className="my-5 font-bold text-center">
            Hola: {user?.name}
        </p>

        <div className="mt-10">
            {categorias.map(categoria => (
                <Categoria key={categoria.id} categoria={categoria} />
            ))}
        </div>

        <div className="my-5 px-5">
            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 transition-colors cursor-pointer font-bold w-full p-3 text-white truncate"
                onClick={logout}
            >
                Cancelar Orden
            </button>
        </div>
    </aside>
  )
}
