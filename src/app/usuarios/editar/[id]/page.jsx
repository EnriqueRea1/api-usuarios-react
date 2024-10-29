"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Para navegar y obtener el ID de la URL

// Función para obtener los datos del usuario
async function getUsuario(id) {
    try {
      const url = `http://localhost:3000/buscarUsuarioPorId/${id}`;
      const usuario = await axios.get(url);
      console.log("Datos obtenidos del usuario:", usuario.data); // Agregar log aquí
      return usuario.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error); // Log en caso de error
      return null;
    }
  }
  

// Función para actualizar el usuario
async function actualizarUsuario(e, id, datosUsuario) {
  e.preventDefault();
  try {
    console.log("Actualizando usuario...");
    const url = `http://localhost:3000/actualizarUsuario/${id}`;
    const datos = {
      nombre: datosUsuario.nombre,
      usuario: datosUsuario.usuario,
      password: datosUsuario.password,
    };
    await axios.patch(url, datos);
    window.location.replace("http://localhost:3001/usuarios/mostrar");
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
}

export default function UsuarioPage({ params }) {
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    usuario: "",
    password: "",
  });

  const router = useRouter();
  const { id } = params; // Obtener el ID desde los params que vienen al componente

  // Obtener los datos del usuario cuando el componente se monta
  useEffect(() => {
    if (id) {
      getUsuario(id).then((data) => {
        setDatosUsuario({
          nombre: data.nombre || "", // Asignamos 'nombre' al campo 'nombre'
          usuario: data.usuario || "", // Asignamos 'usuario' al campo 'usuario'
          password: data.password || "", // Este campo se deja vacío para permitir la edición
        });
      });
    }
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatosUsuario((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="m-0 row justify-content-center">
        <form
          className="col-6 mt-5 mb-5 centrar"
          onSubmit={(e) => actualizarUsuario(e, id, datosUsuario)}
          method="patch"
        >
          <div className="card">
            <div className="card-header">
              <h1>Editar Usuario</h1>
            </div>
            <div className="card-body">
              <input
                id="nombre"
                placeholder="Nombre"
                type="text"
                className="form-control"
                value={datosUsuario.nombre}
                onChange={handleInputChange}
                autoFocus
              />
              <input
                id="usuario"
                placeholder="Usuario"
                type="text"
                className="form-control"
                value={datosUsuario.usuario}
                onChange={handleInputChange}
              />
              <input
                id="password"
                placeholder="Password"
                type="text"
                className="form-control mb-4"
                value={datosUsuario.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="card-footer">
              <button
                className="btn btn-outline-secondary col-12 mt-3 mb-3"
                type="submit"
              >
                Editar Usuario
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Vista previa de los datos del usuario */}
      <div>
        <h1>Datos de {datosUsuario.nombre}</h1>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Usuario:</strong> {datosUsuario.usuario}</p>
        <p><strong>Password:</strong> {datosUsuario.password}</p>
      </div>
    </>
  );
}