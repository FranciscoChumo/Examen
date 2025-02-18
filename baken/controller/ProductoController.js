import{ProductModel}from "../models/ProductoModel.js"
export const createP = async (req, res) => {
    try {
      const { codigo, nombre, descripcion, precio,cantidad,categoria, } = req.body;
      console.log("Datos recibidos:", req.body);
  
      if (!codigo || !nombre || !descripcion || !precio ||!cantidad ||!categoria) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Verifica si el archivo se ha subido correctamente
      const foto = req.file ? req.file.filename : null;
      console.log("Imagen subida:", foto);
  
      const newp = await ProductModel.create({
        codigo, nombre, descripcion, precio,cantidad,categoria,foto,
      });
  
      res.status(201).json({
        message: " created successfully",
        bus: newp,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error uploading image or creating  record",
        details: error.message,
      });
    }
  };

  export const search = async (req, res) => {
    try {
      const { nombre, categoria } = req.body;
  
      // Creamos un objeto de filtro vacío
      const filter = {};
  
      // Si 'nombre' está definido, lo agregamos al filtro
      if (nombre) {
        filter.nombre = nombre;
      }
  
      // Si 'categoria' está definida, lo agregamos al filtro
      if (categoria) {
        filter.categoria = categoria;
      }
  
      // Realizamos la búsqueda con el filtro dinámico
      const Bus = await ProductModel.findAll({ where: filter });
      res.status(200).json({ Buss: Bus });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error search" });
    }
  }
  