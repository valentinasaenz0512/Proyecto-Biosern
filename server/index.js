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
    const { Nombres, Apellidos, Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria } = req.body;

    // Validación básica para asegurarse de que todos los campos requeridos están presentes
    if (!Nombres || !Apellidos || !Cedula) {
        return res.status(400).send("Faltan campos obligatorios.");
    }

    db.query(
        'INSERT INTO historiaclinica (Nombres, Apellidos, Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Nombres, Apellidos, Cedula, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria],
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
    const { Numero, Nombres, Apellidos, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria } = req.body;
    db.query(
        'UPDATE historiaclinica SET Nombres=?, Apellidos=?, Enfermedadesbase=?, Virus=?, Bacterias=?, Hongos=?, Parasitos=?, Emociones=?, Brujeria=? WHERE Numero=?',
        [Nombres, Apellidos, Enfermedadesbase, Virus, Bacterias, Hongos, Parasitos, Emociones, Brujeria, Numero],
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
app.post("/citas/create", (req, res) => {
    const {cedulapac, fechacita, hora, numerohis, tipo, motivo, estado, nota, } = req.body;
    db.query(
        'INSERT INTO citas (cedulapac, fechacita, hora, numerohis, tipo, motivo, estado, nota) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [cedulapac, fechacita, hora, numerohis, tipo, motivo, estado, nota],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar la cita.");
            } else {
                res.send("Cita registrada con éxito!");
            }
        }
    );
});

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

app.put("/citas/update", (req, res) => {
    const { cedulapac, fechacita, hora,  numerohis, tipo,  motivo, estado, nota } = req.body;
    db.query(
        'UPDATE citas SET cedulapac=?, fechacita=?, hora=?, tipo=?, motivo=?, estado=?, nota=? WHERE numerohis=?',
        [cedulapac, fechacita, hora, tipo, motivo, estado, nota, numerohis],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar la cita.");
            } else {
                res.send("Cita actualizada con éxito!");
            }
        }
    );
});

app.delete("/citas/delete/:numerohis", (req, res) => {
    const numerohis = req.params.numerohis;
    db.query('DELETE FROM citas WHERE numerohis = ?', [numerohis], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar la cita.");
        } else {
            res.send("Cita eliminada con éxito!");
        }
    });
});
