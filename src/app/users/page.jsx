import axios from "axios";
import Link from "next/link";

async function getNoticias(){
    const url="https://jsonplaceholder.typicode.com/users"
    axios.get(url);
    const usuarios = await axios.get(url);
    //console.log(usuarios.data);
    return usuarios.data;
}

//noticias();

export default async function Usuarios(){
    const usuarios = await getNoticias();
    return(
        <>
<h1>Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Link href={`/users/${usuario.id}`}>
                  {usuario.name}
                </Link>
              </td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}