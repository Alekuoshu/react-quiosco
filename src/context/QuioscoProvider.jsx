import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import clienteAxios from "../config/axios";
// import { categorias as categoriasDB } from "../data/categorias"

const QuioscoContext = createContext();

const QuiscoProvider = ({children}) => {

    // const [ categorias, setCategorias ] = useState(categoriasDB);
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ producto, setProducto ] = useState({});
    const [ pedido, setPedido ] = useState([]);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        // const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/categorias')
            setCategorias(data?.data)
            setCategoriaActual(data?.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = (producto) => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Cambios Guardados')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        // if(pedido.some(prod => prod.id === producto.id)) {
        //     // Actualizar la cantidad
        //     const pedidoActualizado = pedido.map(prod => {
        //         if(prod.id === producto.id) {
        //             prod.cantidad = prod.cantidad + producto.cantidad
        //         }
        //         return prod
        //     })
        //     setPedido(pedidoActualizado)
        // } else {
        //     setPedido([...pedido, producto])
        // }
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(prod => prod.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto Eliminado')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos', {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // mensaje
            toast.success(data.message)

            // limpiar pedido
            setTimeout(() => {
                setPedido([])
            }, 1000)

            // Cerrar la sesión del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN')
                logout()
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Pedido Completado')
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleClickProductoAgotado = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // toast.success('Pedido Completado')
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEliminarProducto,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export { QuiscoProvider }

export default QuioscoContext