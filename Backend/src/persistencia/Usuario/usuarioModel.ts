import { Usuario } from "../../entidades/usuario";
import { Model, model, Schema, Document } from "mongoose";


interface UsuarioDocument extends Usuario, Document { }

export const UsuarioModel: Model<UsuarioDocument> = model<UsuarioDocument>('Usuario', new Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true 
    },
    cargo:{
        type: String,
        required: true 
    }

}), 'Usuario');