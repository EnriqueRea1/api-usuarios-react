"use client"
const axios = require("axios")
async function validarLogin(e){
    e.preventDefault();
    console.log("Estas en validar login");
    const url = "http://localhost:3000/login";
    const datos = {
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    const usuario = await axios.post(url,datos);
    console.log(usuario.data);
    
}
export default function Login() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form onSubmit={validarLogin} className="col-6 mt-5" action="">
                    <div className="card">
                        <div className="card-header">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <input className="form-control mb-3" type="text" id="usuario" placeholder="Usuario" autoFocus />
                            <input className="form-control mb-3" type="text" id="password" placeholder="Password" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12" type="submit">Iniciar Sesión</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}