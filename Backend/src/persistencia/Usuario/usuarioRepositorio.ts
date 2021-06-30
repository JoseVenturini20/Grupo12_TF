import { Usuario } from "../../entidades/usuario";
import { UsuarioModel } from './usuarioModel';

export class UsuarioRepositorio {
    static async adduser(usuario: String, senha: String): Promise<void>{
        const user = await UsuarioModel.create({
            usuario,
            senha,
            cargo: "normal"
        });
    }
    static async login(usuario: String, senha: String): Promise<Usuario | null>{
        const user = await UsuarioModel.findOne({
            usuario,
            senha
        });
        return user
    }
    static async getAllUsers(): Promise<Array<Usuario>>{
        const users = await UsuarioModel.find({}, {
        projection: {
            usuario: 1,
            cargo: 1
        }});
        return users
    }
}

