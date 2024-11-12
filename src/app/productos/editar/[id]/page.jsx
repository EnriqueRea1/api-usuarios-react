"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Para navegar y obtener el ID de la URL


// Función para obtener los datos del usuario
async function getProducto(id) {
    try {
      const url = `http://localhost:3000/productos/buscarProductoPorId/${id}`;
      const producto = await axios.get(url);
      console.log("Datos obtenidos del producto:", producto.data); // Agregar log aquí
      return producto.data;
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error); // Log en caso de error
      return null;
    }
  }
  

// Función para actualizar el usuario
async function actualizarProducto(e, id, datosProducto) {
  e.preventDefault();
  try {
    console.log("Actualizando producto...");
    const url = `http://localhost:3000/productos/actualizarProducto/${id}`;
    const datos = {
      producto: datosProducto.producto,
      descripcion: datosProducto.descripcion,
      precio: datosProducto.precio,
    };
    await axios.patch(url, datos);
    window.location.replace("http://localhost:3001/productos/mostrar");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
}

export default function ProductoPage({ params }) {
  const [datosProducto, setDatosProducto] = useState({
    producto: "",
    descripcion: "",
    precio: "",
  });

  const router = useRouter();
  const { id } = params; // Obtener el ID desde los params que vienen al componente

  // Obtener los datos del usuario cuando el componente se monta
  useEffect(() => {
    if (id) {
      getProducto(id).then((data) => {
        setDatosProducto({
          producto: data.producto || "", 
          descripcion: data.descripcion || "",
          precio: data.precio || "", 
        });
      });
    }
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatosProducto((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="m-0 row justify-content-center">
        <form
          className="col-6 mt-5 mb-5 centrar"
          onSubmit={(e) => actualizarProducto(e, id, datosProducto)}
          method="patch"
        >
          <div className="card">
            <div className="card-header">
              <h1>Editar Producto</h1>
            </div>
            <div className="card-body">
              <input
                id="producto"
                placeholder="Producto"
                type="text"
                className="form-control"
                value={datosProducto.producto}
                onChange={handleInputChange}
                autoFocus
              />
              <input
                id="descripcion"
                placeholder="Descripcion"
                type="text"
                className="form-control"
                value={datosProducto.descripcion}
                onChange={handleInputChange}
              />
              <input
                id="precio"
                placeholder="Precio"
                type="text"
                className="form-control mb-4"
                value={datosProducto.precio}
                onChange={handleInputChange}
              />
            </div>
            <div className="card-footer">
              <button
                className="btn btn-outline-secondary col-12 mt-3 mb-3"
                type="submit">Editar producto</button>
            </div>
          </div>
        </form>
      </div>

      {/* Vista previa de los datos del usuario */}
      <div>
        <h1>Datos de {datosProducto.producto}</h1>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Descripcion:</strong> {datosProducto.descripcion}</p>
        <p><strong>Password:</strong> {datosProducto.precio}</p>
      </div>
    </>
  );
}