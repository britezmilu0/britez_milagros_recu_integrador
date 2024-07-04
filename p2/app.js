const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.post("/students", (req, res) => {
  let { fullName, age, curse } = req.body;
  age = parseInt(age);

  if (!fullName || !age || !curse) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (
    typeof fullName != "string" ||
    typeof age != "number" ||
    typeof curse != "string"
  ) {
    return res.send("dato incorrecto");
  }

 
  if (age < 5 || age > 12) {
    return res
      .status(400)
      .json({ error: "La edad debe ser mayor a 6 años y menor a 12 años" });
  }
  
  const estudExist = db.find((estudiante) => estudiante.fullName === fullName);

  if (estudExist) {
    return res.status(400).json({ error: "El estudiante ya existe" });
  }
  const id = new Date().getTime();
  const nuevoEstudiante = {
    id: id,
    fullName: fullName,
    age: age,
    curse: curse,
  };
  db.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

app.get("/students", (req, res) => {
  res.json(db);
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const estudiante = db.find((estudiante) => estudiante.id === parseInt(id));
  if (!estudiante) {
    return res.status(404).json({ error: "El estudiante no existe" });
  }
  res.json(estudiante);
});


app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const estudiante = db.find((estudiante) => estudiante.id === parseInt(id));
  if (!estudiante) {
    return res.status(404).json({ error: "El estudiante no existe" });
  }
  
  const { fullName, age, curse } = req.body;
  if (!fullName || !age || !curse) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (
    typeof fullName != "string" ||
    typeof age != "number" ||
    typeof curse != "string"
  ) {
    return res.send("dato incorrecto");
  }
  if (age < 5 || age > 12) {
    return res
      .status(400)
      .json({ error: "La edad debe ser mayor a 6 años y menor a 12 años" });
  }
  estudiante.fullName = fullName;
  estudiante.age = age;
  estudiante.curse = curse;
  res.json(estudiante);
}),

//eliminar por su id 
app.delete('/students/:id', (req,res)=> {
    const {id}= req.params; 
    const estudiante = db.find((estudiante) => estudiante.id === parseInt(id));
    if (!estudiante) {
      return res.status(404).json({ error: "El estudiante no existe" });
    }
    const estudIndex = db.indexOf(estudiante => estudiante.id === parseInt(id)); 
    db.splice(estudIndex, 1);
    res.send('estudiante eliminado con existo');
})



  app.listen(4321, (req, res) =>
    console.log("servidor corriendo en el puerto 4321")
  );
