import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Pacientes = () => {
    const [Nombres, setNombres] = useState("");
    const [Apellidos, setApellidos] = useState("");
    const [Fechanac, setFechanac] = useState("");
    const [Cedula, setCedula] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [Correo, setCorreo] = useState("");
    const [editar, setEditar] = useState(false);

    const [pacienteList, setPaciente] = useState([]);

    const addPaciente = () => {
        axios.post("http://localhost:3001/create", {
            Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo
        }).then(() => {
            getPaciente();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Registro exitoso</strong>",
                html: "<i>El paciente <strong>" + Nombres + "</strong> fue registrado con éxito</i>",
                icon: 'success',
                timer: 2000,
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró registrar el paciente!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    const updatePaciente = () => {
        axios.put("http://localhost:3001/update", {
            Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo
        }).then(() => {
            getPaciente();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Actualización exitosa</strong>",
                html: "<i>El paciente <strong>" + Nombres + "</strong> fue actualizado con éxito</i>",
                icon: 'success',
                timer: 2000,
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró actualizar el paciente!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    const deletePaciente = (Cedula) => {
        Swal.fire({
            title: "Confirmar eliminación?",
            html: "<i>Realmente desea eliminar al paciente <strong>" + Cedula + "</strong>?</i>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/delete/${Cedula}`).then(() => {
                    getPaciente();
                    limpiarCampos();
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
                        text: "No se logró eliminar el paciente!",
                        footer: error.message === "Network Error" ? "Intente más tarde" : error.message
                    });
                });
            }
        });
    };

    const limpiarCampos = () => {
        setNombres("");
        setApellidos("");
        setFechanac("");
        setCedula("");
        setTelefono("");
        setDireccion("");
        setCorreo("");
        setEditar(false);
    };

    const getPaciente = () => {
        axios.get("http://localhost:3001/paciente").then((response) => {
            setPaciente(response.data);
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró obtener la lista de pacientes!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    useEffect(() => {
        getPaciente();
    }, []);

    return (
        <div>
            <h2>{editar ? "Actualizar Paciente" : "Agregar Paciente"}</h2>
            <form>
                <input type="text" value={Nombres} onChange={(e) => setNombres(e.target.value)} placeholder="Nombres" />
                <input type="text" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Apellidos" />
                <input type="date" value={Fechanac} onChange={(e) => setFechanac(e.target.value)} placeholder="Fecha de Nacimiento" />
                <input type="text" value={Cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cédula" />
                <input type="text" value={Telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
                <input type="text" value={Direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" />
                <input type="email" value={Correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
                <button type="button" onClick={editar ? updatePaciente : addPaciente}>
                    {editar ? "Actualizar" : "Registrar"}
                </button>
                {editar && <button type="button" onClick={limpiarCampos}>Cancelar</button>}
            </form>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacienteList.map((paciente) => (
                        <tr key={paciente.Cedula}>
                            <td>{paciente.Nombres}</td>
                            <td>{paciente.Apellidos}</td>
                            <td>{paciente.Fechanac}</td>
                            <td>{paciente.Cedula}</td>
                            <td>{paciente.Telefono}</td>
                            <td>{paciente.Direccion}</td>
                            <td>{paciente.Correo}</td>
                            <td>
                                <button onClick={() => {
                                    setNombres(paciente.Nombres);
                                    setApellidos(paciente.Apellidos);
                                    setFechanac(paciente.Fechanac);
                                    setCedula(paciente.Cedula);
                                    setTelefono(paciente.Telefono);
                                    setDireccion(paciente.Direccion);
                                    setCorreo(paciente.Correo);
                                    setEditar(true);
                                }}>Editar</button>
                                <button onClick={() => deletePaciente(paciente.Cedula)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pacientes;
