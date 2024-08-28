import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Citas() {
    const [citas, setCitas] = useState([]);
    const [formData, setFormData] = useState({
        codigocita: "",
        cedulapac: "",
        codterapeuta: "",
        fechacita: "",
        hora: "",
        telefono: "",
        numerohis: "",
        tipo: "",
        correo: "",
        motivo: "",
        estado: "",
        nota: "",
        nombre: "",
        apellido: ""
    });

    const fetchCitas = () => {
        axios.get("http://localhost:3001/citas").then((response) => {
            setCitas(response.data);
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró obtener la lista de citas!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/citas/create", formData)
            .then(() => {
                fetchCitas();
                setFormData({
                    codigocita: "",
                    cedulapac: "",
                    codterapeuta: "",
                    fechacita: "",
                    hora: "",
                    telefono: "",
                    numerohis: "",
                    tipo: "",
                    correo: "",
                    motivo: "",
                    estado: "",
                    nota: "",
                    nombre: "",
                    apellido: ""
                });
                Swal.fire({
                    title: "<strong>Registro exitoso</strong>",
                    html: "<i>La cita fue registrada con éxito</i>",
                    icon: 'success',
                    timer: 2000,
                });
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se logró registrar la cita!",
                    footer: error.message === "Network Error" ? "Intente más tarde" : error.message
                });
            });
    };

    const handleDelete = (codigocita) => {
        Swal.fire({
            title: "Confirmar eliminación?",
            html: "<i>Realmente desea eliminar la cita con código <strong>" + codigocita + "</strong>?</i>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/citas/delete/${codigocita}`).then(() => {
                    fetchCitas();
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se logró eliminar la cita!",
                        footer: error.message === "Network Error" ? "Intente más tarde" : error.message
                    });
                });
            }
        });
    };

    return (
        <div>
            <h2>Crear Nueva Cita</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="codigocita" value={formData.codigocita} onChange={handleChange} placeholder="Código de Cita" required />
                <input type="text" name="cedulapac" value={formData.cedulapac} onChange={handleChange} placeholder="Cédula del Paciente" required />
                <input type="text" name="codterapeuta" value={formData.codterapeuta} onChange={handleChange} placeholder="Código del Terapeuta" required />
                <input type="date" name="fechacita" value={formData.fechacita} onChange={handleChange} required />
                <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
                <input type="text" name="numerohis" value={formData.numerohis} onChange={handleChange} placeholder="Número de Historia" required />
                <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Tipo" required />
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
                <input type="text" name="motivo" value={formData.motivo} onChange={handleChange} placeholder="Motivo" required />
                <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado" required />
                <input type="text" name="nota" value={formData.nota} onChange={handleChange} placeholder="Nota" />
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
                <button type="submit">Registrar Cita</button>
            </form>

            <h2>Lista de Citas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Código de Cita</th>
                        <th>Paciente</th>
                        <th>Terapeuta</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Teléfono</th>
                        <th>Historia</th>
                        <th>Tipo</th>
                        <th>Correo</th>
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Nota</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita) => (
                        <tr key={cita.codigocita}>
                            <td>{cita.codigocita}</td>
                            <td>{cita.cedulapac}</td>
                            <td>{cita.codterapeuta}</td>
                            <td>{cita.fechacita}</td>
                            <td>{cita.hora}</td>
                            <td>{cita.telefono}</td>
                            <td>{cita.numerohis}</td>
                            <td>{cita.tipo}</td>
                            <td>{cita.correo}</td>
                            <td>{cita.motivo}</td>
                            <td>{cita.estado}</td>
                            <td>{cita.nota}</td>
                            <td>{cita.nombre}</td>
                            <td>{cita.apellido}</td>
                            <td>
                                <button onClick={() => handleDelete(cita.codigocita)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Citas;
