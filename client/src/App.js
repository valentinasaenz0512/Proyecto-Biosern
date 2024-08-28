import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';          // Componente para la página de inicio
import Citas from './components/Citas';        // Componente para gestionar citas
import Pacientes from './components/Pacientes'; // Componente para gestionar pacientes
import HistoriaClinica from './components/HistoriaClinica'; // Componente para la historia clínica
import Login from './components/Login';        // Componente para el login
import Navbar from './components/Navbar';      // Componente para la barra de navegación
import './App.css';                          // Archivo de estilos, si tienes uno

function App() {
    return (
        <Router>
            <Navbar /> {/* Barra de navegación visible en todas las páginas */}
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/citas" element={<Citas />} />
                    <Route path="/pacientes" element={<Pacientes />} />
                    <Route path="/historiaclinica" element={<HistoriaClinica />} />
                    <Route path="/login" element={<Login />} />
                    {/* Puedes agregar más rutas según tus necesidades */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
