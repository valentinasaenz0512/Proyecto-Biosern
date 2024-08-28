import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Inicio</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/pacientes">Pacientes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/historia-clinica">Historia Clínica</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/crear-cita">Crear Cita</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
