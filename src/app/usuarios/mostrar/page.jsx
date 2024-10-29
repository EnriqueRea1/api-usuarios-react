import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import Link from "next/link";

async function getUsuarios(){
    const url="http://localhost:3000"
    //const url="http://universities.hipolabs.com/search?country=Mexico"
    axios.get(url);
    const usuarios = await axios.get(url);
    //console.log(usuarios);
    return usuarios.data;
}

//console.log({process.env.BASE_URL})
//noticias();

export default async function Usuarios(){

    const usuarios = await getUsuarios();
    return(
        <>
        
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Editar / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.usuario}</td>
                                <td>
                                    <BorrarUsuario id={(usuario.id)}/>
                                    <Link href={`/usuarios/editar/${usuario.id}`}>
                                    / Editar
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
        <Link href={`/usuarios/nuevo/`}>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-plus-lg"></i> Agregar Usuario
          </button>
        </Link>
      </div>
        </>
    );
}