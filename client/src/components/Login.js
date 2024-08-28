import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post("http://localhost:3001/login", { username, password })
            .then((response) => {
                Swal.fire({
                    title: "Login exitoso",
                    text: "Bienvenido!",
                    icon: 'success',
                    timer: 2000,
                });
                // Aquí puedes redirigir al usuario o guardar el token de sesión
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Credenciales incorrectas!",
                    footer: error.message === "Network Error" ? "Intente más tarde" : error.message
                });
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;
