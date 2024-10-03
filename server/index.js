const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "biosern"
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

// Conectar a la base de datos al iniciar la aplicación
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos.');
});

// Rutas para la tabla paciente
app.post("/paciente/create", (req, res) => {
    const { Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo } = req.body;
    db.query(
        'INSERT INTO paciente (Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el paciente.");
            } else {
                res.json({ message: "Paciente registrado con éxito!" });
            }
        }
    );
});

app.get("/paciente", (req, res) => {
    db.query('SELECT * FROM paciente', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los pacientes.");
        } else {
            res.send(result);
        }
    });
});

app.put("/paciente/update", (req, res) => { 
    const { Nombres, Apellidos, Fechanac, Cedula, Telefono, Direccion, Correo } = req.body;
    db.query(
        'UPDATE paciente SET Nombres=?, Apellidos=?, Fechanac=?, Telefono=?, Direccion=?, Correo=? WHERE Cedula=?',
        [Nombres, Apellidos, Fechanac, Telefono, Direccion, Correo, Cedula],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el paciente.");
            } else {
                res.json({ message: "Paciente actualizado con éxito!"});
            }
        }
    );
});


app.delete("/paciente/delete/:Cedula", (req, res) => {
    const Cedula = req.params.Cedula;
    db.query('DELETE FROM paciente WHERE Cedula = ?', [Cedula], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el paciente.");
        } else {
            res.json({ message: "Paciente eliminado con éxito!"});
        }
    });
});

// Rutas para la tabla historiaclinica
app.post("/historiaclinica/create", (req, res) => {
    const {Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, SistemaEnergetico } = req.body;

    // Validación básica para asegurarse de que todos los campos requeridos están presentes
    if (!Nombres || !Apellidos || !Cedula) {
        return res.status(400).send("Faltan campos obligatorios.");
    }

    db.query(
        'INSERT INTO historiaclinica (Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, SistemaEnergetico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, SistemaEnergetico],
        (err, result) => {
            if (err) {
                console.error("Error al registrar la historia clínica:", err);
                return res.status(500).send("Error al registrar la historia clínica.");
            }
            res.json({ message: "Historia clínica creada con éxito!" });
        }
    );
});


app.get("/historiaclinica", (req, res) => {
    db.query('SELECT * FROM historiaclinica', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error obteniendo las historias clínicas.");
        } else {
            res.json(result);
        }
    });
});
app.get("/historiaclinica/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    db.query('SELECT * FROM historiaclinica WHERE cedula = ?', [cedula], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error obteniendo la historia clínica.");
        } else {
            res.json(result);
        }
    });
});

app.put("/historiaclinica/update", (req, res) => {
    const { Numero, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, SistemaEnergetico } = req.body;
    db.query(
        'UPDATE historiaclinica SET Enfermedadesbase=?, Virus=?, Bacterias=?, Hongos=?, Parasitos=?, Emociones=?, SistemaEnergetico=? WHERE Numero=?',
        [Nombres, Apellidos, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, SistemaEnergetico, Numero],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar la historia clínica.");
            } else {
                res.json({ message: "Historia clinica actualizada con éxito!"});
            }
        }
    );
});

app.delete("/historiaclinica/delete/:numero", (req, res) => {
    const Numero = req.params.numero;
    db.query('DELETE FROM historiaclinica WHERE Numero = ?', [Numero], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar la historia clínica.");
        } else {
            res.json({ message: "Historia clinica eliminada con éxito!"});
        }
    });
});

// Rutas para la tabla citas
// Obtener todas las citas
app.get("/citas", (req, res) => {
    db.query('SELECT * FROM citas', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las citas.");
        } else {
            res.send(result);
        }
    });
});

// Crear una nueva cita
app.post("/citas/create", (req, res) => {
    const { cedula, fecha_cita, hora_cita, tipo_cita, motivo, estado_cita } = req.body;
    db.query(
        'INSERT INTO citas (cedula, fecha_cita, hora_cita, tipo_cita, motivo, estado_cita) VALUES (?, ?, ?, ?, ?, ?)',
        [cedula, fecha_cita, hora_cita, tipo_cita, motivo, estado_cita],
        (err, result) => {
            if (err) {
                console.error("Error al crear la cita:", err);
                return res.status(500).send("Error al crear la cita.");
            }
            res.json({ message: "Cita creada con éxito!" });
        }
    );
});

// Actualizar una cita existente
app.put("/citas/update", (req, res) => {
    const { cedula, fecha_cita, hora_cita, numeroCita, tipo_cita, motivo, estado_cita } = req.body;
    db.query(
        'UPDATE citas SET cedula=?, fecha_cita=?, hora_cita=?, tipo_cita=?, motivo=?, estado_cita=? WHERE numeroCita=?',
        [cedula, fecha_cita, hora_cita, tipo_cita, motivo, estado_cita, numeroCita],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar la cita:", err);
                return res.status(500).send("Error al actualizar la cita.");
            }
            res.json({ message: "Cita actualizada con éxito!" });
        }
    );
});

// Eliminar una cita
app.delete("/citas/delete/:numeroCita", (req, res) => {
    const numeroCita = req.params.numeroCita;
    db.query('DELETE FROM citas WHERE numeroCita = ?', [numeroCita], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar la cita.");
        } else {
            res.json({ message: "Cita eliminada con éxito!"});
        }
    });
});
