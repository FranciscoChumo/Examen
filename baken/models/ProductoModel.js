import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const ProductModel = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    cantidad:{
      type:DataTypes.STRING,
      allowNull:false,
      },
    categoria:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },
  {
    timestamps: false,
  }
);
