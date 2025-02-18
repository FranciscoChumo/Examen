import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const LocalModel = sequelize.define(
  "local",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueño: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitud: {
        type: DataTypes.STRING,
        allowNull: false,
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



