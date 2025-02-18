import express from 'express';
import multer from 'multer'; 
import { createP,search } from '../controller/ProductoController.js';
import { createL } from '../controller/LocalController.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especificamos la carpeta de destino para las imágenes subidas
      cb(null, './public/uploads/producto');
    },
    filename: (req, file, cb) => {
      // Especificamos el nombre del archivo con la fecha actual y el nombre original
      const{id}= req.params;
      cb(null, id+"-"+file.originalname);
    },
  });
var upload = multer({ storage: storage }); // Middleware de multer

router.post('/registerp', upload.single('foto'), createP);  
router.post('/registerl',  createL);  
router.post('/search',search);

export const RouterPL = router;
