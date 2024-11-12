"use client"
import axios from "axios";

async function nuevoProducto(e){
    e.preventDefault();
    console.log("Estas en nuevoProducto");
    const url="http://localhost:3000/productos/nuevoProducto";
    const datos={
        producto:document.getElementById("producto").value,
        descripcion:document.getElementById("descripcion").value,
        precio:document.getElementById("precio").value
    }
    // console.log(datos);
    const respuesta = await axios.post(url, datos);
    location.replace("http://localhost:3001/productos/mostrar");
    
}

export default function Nuevo() {
    return (
        <>
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5 mb-5 centrar" onSubmit={nuevoProducto} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Producto</h1>
                    </div>
                    <div className="card-body"></div>
                        <input id="producto" placeholder="Producto" autoFocus type="text" className="form-control" />
                        <input id="descripcion" placeholder="Descripción" autoFocus type="text" className="form-control" />
                        <input id="precio" placeholder="Precio del Producto" autoFocus type="text" className="form-control mb-4" />
                    <div className="card-footer">
                        <button className="btn  btn-outline-success col-12 mt-3 mb-3" type="submit">Agregar Producto</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}