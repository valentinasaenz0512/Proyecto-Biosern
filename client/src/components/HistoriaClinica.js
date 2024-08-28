import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HistoriaClinica = () => {
    const [Numero, setNumero] = useState("");
    const [Cedula, setCedula] = useState("");
    const [EnfermedadesBase, setEnfermedadesBase] = useState("");
    const [Virus, setVirus] = useState("");
    const [Bacterias, setBacterias] = useState("");
    const [Hongos, setHongos] = useState("");
    const [Parasitos, setParasitos] = useState("");
    const [Emociones, setEmociones] = useState("");
    const [Brujeria, setBrujeria] = useState("");
    const [editar, setEditar] = useState(false);

    const [historiaClinicaList, setHistoriaClinica] = useState([]);

    const addHistoriaClinica = () => {
        axios.post("http://localhost:3001/historiaclinica/create", {
            Numero, Cedula, EnfermedadesBase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria
        }).then(() => {
            getHistoriaClinica();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Registro exitoso</strong>",
                html: "<i>La historia clínica para el paciente <strong>" + Cedula + "</strong> fue registrada con éxito</i>",
                icon: 'success',
                timer: 2000,
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró registrar la historia clínica!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    const updateHistoriaClinica = () => {
        axios.put("http://localhost:3001/historiaclinica/update", {
            Numero, Cedula, EnfermedadesBase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria
        }).then(() => {
            getHistoriaClinica();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Actualización exitosa</strong>",
                html: "<i>La historia clínica del paciente <strong>" + Cedula + "</strong> fue actualizada con éxito</i>",
                icon: 'success',
                timer: 2000,
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró actualizar la historia clínica!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    const deleteHistoriaClinica = (Numero) => {
        Swal.fire({
            title: "Confirmar eliminación?",
            html: "<i>Realmente desea eliminar la historia clínica número <strong>" + Numero + "</strong>?</i>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/historiaclinica/delete/${Numero}`).then(() => {
                    getHistoriaClinica();
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
                        text: "No se logró eliminar la historia clínica!",
                        footer: error.message === "Network Error" ? "Intente más tarde" : error.message
                    });
                });
            }
        });
    };

    const limpiarCampos = () => {
        setNumero("");
        setCedula("");
        setEnfermedadesBase("");
        setVirus("");
        setBacterias("");
        setHongos("");
        setParasitos("");
        setEmociones("");
        setBrujeria("");
        setEditar(false);
    };

    const getHistoriaClinica = () => {
        axios.get("http://localhost:3001/historiaclinica").then((response) => {
            setHistoriaClinica(response.data);
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró obtener la lista de historias clínicas!",
                footer: error.message === "Network Error" ? "Intente más tarde" : error.message
            });
        });
    };

    useEffect(() => {
        getHistoriaClinica();
    }, []);

    return (
        <div>
            <h2>{editar ? "Actualizar Historia Clínica" : "Agregar Historia Clínica"}</h2>
            <form>
                <input type="text" value={Numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número" />
                <input type="text" value={Cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cédula" />
                <input type="text" value={EnfermedadesBase} onChange={(e) => setEnfermedadesBase(e.target.value)} placeholder="Enfermedades Base" />
                <input type="text" value={Virus} onChange={(e) => setVirus(e.target.value)} placeholder="Virus" />
                <input type="text" value={Bacterias} onChange={(e) => setBacterias(e.target.value)} placeholder="Bacterias" />
                <input type="text" value={Hongos} onChange={(e) => setHongos(e.target.value)} placeholder="Hongos" />
                <input type="text" value={Parasitos} onChange={(e) => setParasitos(e.target.value)} placeholder="Parásitos" />
                <input type="text" value={Emociones} onChange={(e) => setEmociones(e.target.value)} placeholder="Emociones" />
                <input type="text" value={Brujeria} onChange={(e) => setBrujeria(e.target.value)} placeholder="Brujería" />
                <button type="button" onClick={editar ? updateHistoriaClinica : addHistoriaClinica}>
                    {editar ? "Actualizar" : "Registrar"}
                </button>
                {editar && <button type="button" onClick={limpiarCampos}>Cancelar</button>}
            </form>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Cédula</th>
                        <th>Enfermedades Base</th>
                        <th>Virus</th>
                        <th>Bacterias</th>
                        <th>Hongos</th>
                        <th>Parásitos</th>
                        <th>Emociones</th>
                        <th>Brujería</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {historiaClinicaList.map((historia) => (
                        <tr key={historia.Numero}>
                            <td>{historia.Numero}</td>
                            <td>{historia.Cedula}</td>
                            <td>{historia.EnfermedadesBase}</td>
                            <td>{historia.Virus}</td>
                            <td>{historia.Bacterias}</td>
                            <td>{historia.Hongos}</td>
                            <td>{historia.Parasitos}</td>
                            <td>{historia.Emociones}</td>
                            <td>{historia.Brujeria}</td>
                            <td>
                                <button onClick={() => {
                                    setNumero(historia.Numero);
                                    setCedula(historia.Cedula);
                                    setEnfermedadesBase(historia.EnfermedadesBase);
                                    setVirus(historia.Virus);
                                    setBacterias(historia.Bacterias);
                                    setHongos(historia.Hongos);
                                    setParasitos(historia.Parasitos);
                                    setEmociones(historia.Emociones);
                                    setBrujeria(historia.Brujeria);
                                    setEditar(true);
                                }}>Editar</button>
                                <button onClick={() => deleteHistoriaClinica(historia.Numero)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoriaClinica;
