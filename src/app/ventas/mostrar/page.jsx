import EstatusVenta from "@/components/estatusVenta";
import axios from "axios";
import Link from "next/link";

async function getVentas(){
    const url="http://localhost:3000/ventas"
    //const url="http://universities.hipolabs.com/search?country=Mexico"
    axios.get(url);
    const ventas = await axios.get(url);
    //console.log(productos);
    return ventas.data;
}

//console.log({process.env.BASE_URL})
//noticias();

export default async function Ventas(){

    const ventas = await getVentas();
    return(
        <>
        
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estatus</th>
                        <th>Actualizar estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{venta.nombreUsuario}</td>
                                <td>{venta.nombreProducto}</td>
                                <td>{venta.cantidad}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.hora}</td>
                                <td>{venta.estatus}</td>
                                <td>
                                    <EstatusVenta id={(venta.id)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
        <Link href={`/ventas/nuevo/`}>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-plus-lg"></i> Nueva Venta
          </button>
        </Link>
      </div>
        </>
    );
}