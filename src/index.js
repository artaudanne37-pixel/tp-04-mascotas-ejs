
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const { leerJson } = require("./archivos");

const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
  const app = express();
  const mascotas = await leerJson(rutaDatos);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));

  app.use(expressLayouts);
  app.set("layout", "layouts/main");

  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.render("inicio", {
      titulo: "Mascotas en adopción",
    });
  });

  app.get("/mascotas", (req, res) => {
    res.render("mascotas/lista", {
      titulo: "Catálogo de Mascotas",
      mascotas,
    });
  });

  app.get("/mascotas/nueva", (req, res) => {
    res.render("mascotas/nueva", {
      titulo: "Registrar mascota",
      error: null,
      valores: {},
    });
  });

  app.post("/mascotas", (req, res) => {
    const { nombre, especie, edad, estado, descripcion } = req.body;
    const edadNumero = Number(edad);

    const estadosValidos = [
      "En adopción",
      "Reservada",
      "Adoptada",
    ];

    if (
      !nombre ||
      !especie ||
      !descripcion ||
      !estado ||
      !estadosValidos.includes(estado) ||
      !Number.isInteger(edadNumero) ||
      edadNumero < 0
    ) {
      return res.status(400).render("mascotas/nueva", {
        titulo: "Registrar mascota",
        error: "Completá todos los campos correctamente.",
        valores: {
          nombre,
          especie,
          edad,
          estado,
          descripcion,
        },
      });
    }

    const nuevoId =
      mascotas.length > 0
        ? Math.max(...mascotas.map((mascota) => mascota.id)) + 1
        : 1;

    mascotas.push({
      id: nuevoId,
      nombre,
      especie,
      edad: edadNumero,
      estado,
      descripcion,
      imagen: "/img/mascota.svg",
    });

    res.redirect("/mascotas");
  });

  app.get("/mascotas/:id", (req, res) => {
    const id = Number(req.params.id);
    const mascota = mascotas.find((elemento) => elemento.id === id);

    if (!mascota) {
      return res.status(404).render("no-encontrado", {
        titulo: "Mascota no encontrada",
        mensaje: "No existe una mascota con ese identificador.",
      });
    }

    res.render("mascotas/detalle", {
      titulo: mascota.nombre,
      mascota,
    });
  });

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exitCode = 1;
});