"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Para navegar y obtener el ID de la URL

// Función para obtener los datos de la venta
async function getVenta(id) {
  try {
    const url = `http://localhost:3000/ventas/buscarVentaPorId/${id}`;
    const venta = await axios.get(url);
    console.log("Datos obtenidos de la venta:", venta.data); // Log aquí
    return venta.data;
  } catch (error) {
    console.error("Error al obtener los datos de la venta:", error); // Log en caso de error
    return null;
  }
}

// Función para obtener usuarios y productos
async function obtenerUsuariosYProductos() {
  try {
    const usuariosResponse = await axios.get("http://localhost:3000/");
    const productosResponse = await axios.get("http://localhost:3000/productos");
    console.log("Usuarios obtenidos:", usuariosResponse.data); // Log para verificar usuarios
    console.log("Productos obtenidos:", productosResponse.data); // Log para verificar productos
    return {
      usuarios: usuariosResponse.data,
      productos: productosResponse.data,
    };
  } catch (error) {
    console.error("Error al obtener usuarios o productos:", error);
    return { usuarios: [], productos: [] };
  }
}

// Función para actualizar la venta
async function actualizarVenta(e, id, datosVenta) {
  e.preventDefault();
  try {
    console.log("Actualizando venta con los datos:", datosVenta);
    const url = `http://localhost:3000/ventas/editarVenta/${id}`;
    const datos = {
      nombreUsuario: datosVenta.nombreUsuario,
      nombreProducto: datosVenta.nombreProducto,
      cantidad: datosVenta.cantidad,
    };
    await axios.put(url, datos);
    window.location.replace("http://localhost:3001/ventas/mostrar");
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
  }
}

export default function EditarVentaPage({ params }) {
  const [datosVenta, setDatosVenta] = useState({
    nombreUsuario: "",
    nombreProducto: "",
    cantidad: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [showUsuariosList, setShowUsuariosList] = useState(false);
  const [showProductosList, setShowProductosList] = useState(false);

  const router = useRouter();
  const { id } = params; // Obtener el ID desde los params que vienen al componente

  // Obtener los datos de la venta y cargar usuarios y productos cuando el componente se monta
  useEffect(() => {
    if (id) {
      getVenta(id).then((data) => {
        console.log("Venta obtenida:", data);
        setDatosVenta({
          nombreUsuario: data?.nombreUsuario || "",
          nombreProducto: data?.nombreProducto || "",
          cantidad: data?.cantidad || "",
        });
      });

      // Cargar usuarios y productos
      obtenerUsuariosYProductos().then(({ usuarios, productos }) => {
        setUsuarios(usuarios);
        setProductos(productos);
        console.log("Usuarios después de la carga:", usuarios);
        console.log("Productos después de la carga:", productos);
      });
    }
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatosVenta((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Filtrar usuarios y productos
    if (id === "nombreUsuario") {
      const filtrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
      setShowUsuariosList(true);
      console.log("Filtrados usuarios:", filtrados); // Log aquí
    } else if (id === "nombreProducto") {
      const filtrados = productos.filter((producto) =>
        producto.producto.toLowerCase().includes(value.toLowerCase())
      );
      setProductosFiltrados(filtrados);
      setShowProductosList(true);
      console.log("Filtrados productos:", filtrados); // Log aquí
    }
  };

  // Seleccionar usuario
  const seleccionarUsuario = (nombre) => {
    setDatosVenta((prevState) => ({
      ...prevState,
      nombreUsuario: nombre,
    }));
    setShowUsuariosList(false);
    console.log("Usuario seleccionado:", nombre); // Log aquí
  };

  // Seleccionar producto
  const seleccionarProducto = (producto) => {
    setDatosVenta((prevState) => ({
      ...prevState,
      nombreProducto: producto,
    }));
    setShowProductosList(false);
    console.log("Producto seleccionado:", producto); // Log aquí
  };

  return (
    <>
      <div className="m-0 row justify-content-center">
        <form
          className="col-6 mt-5 mb-5 centrar"
          onSubmit={(e) => actualizarVenta(e, id, datosVenta)}
        >
          <div className="card">
            <div className="card-header">
              <h1>Editar Venta</h1>
            </div>
            <div className="card-body">
              <div className="position-relative mb-3">
                <input
                  id="nombreUsuario"
                  placeholder="Nombre del Usuario"
                  type="text"
                  className="form-control"
                  value={datosVenta.nombreUsuario}
                  onChange={handleInputChange}
                  onFocus={() => setShowUsuariosList(true)}
                  autoComplete="off"
                />
                {showUsuariosList && usuariosFiltrados.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{ zIndex: 1000 }}
                  >
                    {usuariosFiltrados.map((usuario, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onClick={() => seleccionarUsuario(usuario.nombre)}
                        style={{ cursor: "pointer" }}
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
                  value={datosVenta.nombreProducto}
                  onChange={handleInputChange}
                  onFocus={() => setShowProductosList(true)}
                  autoComplete="off"
                />
                {showProductosList && productosFiltrados.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{ zIndex: 1000 }}
                  >
                    {productosFiltrados.map((producto, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onClick={() => seleccionarProducto(producto.producto)}
                        style={{ cursor: "pointer" }}
                      >
                        {producto.producto}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                id="cantidad"
                placeholder="Cantidad"
                type="number"
                className="form-control mb-4"
                value={datosVenta.cantidad}
                onChange={handleInputChange}
              />
            </div>
            <div className="card-footer d-flex gap-2">
              <button className="btn btn-outline-primary flex-grow-1" type="submit">
                Guardar Cambios
              </button>
              <button
                className="btn btn-outline-secondary flex-grow-1"
                type="button"
                onClick={() => router.push("/ventas/mostrar")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
