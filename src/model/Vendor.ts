import {db} from "../config/config";
import { DataTypes, Model } from "sequelize";

export interface VendorModel {
    id: string,
    Name: string,
    email: string,
    Password: string,
    isSuspended: boolean,
    flags:number,
    vendorphone: string,
    salt: string
}

export class VendorInstance extends Model<VendorModel>{}

VendorInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
  
    Name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    isSuspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }, 
    flags: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    vendorphone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
},
{
    sequelize: db,
    tableName: 'Vendors'
}
)
