import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco()
    const { nombre, imagen, precio, id } = producto

  return (
    <div
        id={id}
        className="border p-3 shadow bg-white"
    >
        <img 
            src={`/img/${imagen}.jpg`} 
            alt={`Imagen de ${nombre}`} 
            className="w-full"
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold h-14">{nombre}</h3>
            <p className="mt-5 text-4xl font-black text-amber-500">{formatearDinero(precio)}</p>

            {botonDisponible && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => handleClickProductoAgotado(id)}
                >
                    Disponible
                </button>
            )}

            {botonAgregar && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            )}
            
        </div>
    </div>
  )
}
