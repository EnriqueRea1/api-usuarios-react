"use client"
import axios from "axios";
import { useState, useEffect } from "react";

export default function Nuevo() {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [showUsuariosList, setShowUsuariosList] = useState(false);
    const [showProductosList, setShowProductosList] = useState(false);
    const [formData, setFormData] = useState({
        nombreUsuario: '',
        nombreProducto: '',
        cantidad: ''
    });

    // Cargar usuarios y productos al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Ajusta estas URLs según tu API
                const [usuariosRes, productosRes] = await Promise.all([
                    axios.get('http://localhost:3000/'),
                    axios.get('http://localhost:3000/productos')
                ]);
                
                setUsuarios(usuariosRes.data);
                setProductos(productosRes.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                alert("Error al cargar la lista de usuarios y productos");
            }
        };

        cargarDatos();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Filtrar las listas según el input
        if (id === 'nombreUsuario') {
            const filtrados = usuarios.filter(usuario => 
                usuario.nombre.toLowerCase().includes(value.toLowerCase())
            );
            setUsuariosFiltrados(filtrados);
            setShowUsuariosList(true);
        } else if (id === 'nombreProducto') {
            const filtrados = productos.filter(producto => 
                producto.producto.toLowerCase().includes(value.toLowerCase())
            );
            setProductosFiltrados(filtrados);
            setShowProductosList(true);
        }
    };

    const seleccionarUsuario = (nombre) => {
        setFormData(prev => ({
            ...prev,
            nombreUsuario: nombre
        }));
        setShowUsuariosList(false);
    };

    const seleccionarProducto = (producto) => {
        setFormData(prev => ({
            ...prev,
            nombreProducto: producto
        }));
        setShowProductosList(false);
    };

    const nuevaVenta = async (e) => {
        e.preventDefault();
        
        const url = "http://localhost:3000/ventas/nuevaVenta";

        try {
            const respuesta = await axios.post(url, formData);

            if (respuesta.status === 200 && respuesta.data === true) {
                console.log("Venta creada exitosamente");
                location.replace("http://localhost:3001/ventas/mostrar");
            } else {
                console.log("Error al crear la venta");
                alert("Error al crear la venta. Verifica que los datos sean correctos.");
            }
        } catch (error) {
            console.error("Hubo un error con la solicitud:", error);
            alert("Hubo un error al procesar la venta. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5 mb-5 centrar" onSubmit={nuevaVenta}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <div className="position-relative mb-3">
                            <input
                                id="nombreUsuario"
                                placeholder="Nombre del Usuario"
                                type="text"
                                className="form-control"
                                value={formData.nombreUsuario}
                                onChange={handleInputChange}
                                onFocus={() => setShowUsuariosList(true)}
                            />
                            {showUsuariosList && usuariosFiltrados.length > 0 && (
                                <ul className="list-group position-absolute w-100" style={{zIndex: 1000}}>
                                    {usuariosFiltrados.map((usuario, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => seleccionarUsuario(usuario.nombre)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            {usuario.nombre}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="position-relative mb-3">
                            <input
                                id="nombreProducto"
                                placeholder="Nombre del Producto"
                                type="text"
                                className="form-control"
                                value={formData.nombreProducto}
                                onChange={handleInputChange}
                                onFocus={() => setShowProductosList(true)}
                            />
                            {showProductosList && productosFiltrados.length > 0 && (
                                <ul className="list-group position-absolute w-100" style={{zIndex: 1000}}>
                                    {productosFiltrados.map((producto, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => seleccionarProducto(producto.producto)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            {producto.producto}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <input
                            id="cantidad"
                            placeholder="Cantidad a Comprar"
                            type="number"
                            className="form-control mb-4"
                            value={formData.cantidad}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-outline-success col-12 mt-3 mb-3" type="submit">
                            Vender
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}