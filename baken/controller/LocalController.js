import{LocalModel}from "../models/LocalModel.js"

export const createL = async (req, res) => {
  try {
    const { name,dueño,latitud,longitud } = req.body;
    if (!name ||!dueño||!latitud||!longitud) {
      res.status(400).json({ message: " is required" });
    }
    const types = await LocalModel.create(req.body);
    res.status(201).json({ message: "create", types });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};