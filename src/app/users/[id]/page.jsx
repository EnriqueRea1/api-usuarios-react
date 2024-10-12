import axios from "axios";



async function getUsuario(id) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const usuario = await axios.get(url);
  return usuario.data;
}

export default async function UsuarioPage({ params }) {
  const usuario = await getUsuario(params.id);

  return (
    <div>  
      <h1>Datos de {usuario.name}</h1>
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Usuario:</strong> {usuario.username}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      
      {/* Tabla para la dirección */}
      <h3>Dirección</h3>
      <table border="1" cellPadding="5">
        <tbody>
          <tr>
            <td><strong>Calle:</strong></td>
            <td>{usuario.address.street}</td>
          </tr>
          <tr>
            <td><strong>Suite:</strong></td>
            <td>{usuario.address.suite}</td>
          </tr>
          <tr>
            <td><strong>Ciudad:</strong></td>
            <td>{usuario.address.city}</td>
          </tr>
          <tr>
            <td><strong>Código Postal:</strong></td>
            <td>{usuario.address.zipcode}</td>
          </tr>
          <tr>
            <td><strong>Geo:</strong></td>
            <td>Lat: {usuario.address.geo.lat}, Lng: {usuario.address.geo.lng}</td>
          </tr>
        </tbody>
      </table>

      {/* Teléfono y Sitio Web */}
      <p><strong>Teléfono:</strong> {usuario.phone}</p>
      <p><strong>Sitio Web:</strong> <a href={`http://${usuario.website}`} target="_blank">{usuario.website}</a></p>
      
      {/* Tabla para la compañía */}
      <h3>Compañía</h3>
      <table border="1" cellPadding="5">
        <tbody>
          <tr>
            <td><strong>Nombre:</strong></td>
            <td>{usuario.company.name}</td>
          </tr>
          <tr>
            <td><strong>Eslogan:</strong></td>
            <td><em>{usuario.company.catchPhrase}</em></td>
          </tr>
          <tr>
            <td><strong>Especialización:</strong></td>
            <td>{usuario.company.bs}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
