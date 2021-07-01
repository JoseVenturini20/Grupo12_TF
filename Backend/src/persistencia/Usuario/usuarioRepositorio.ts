import { Usuario } from "../../entidades/usuario";
import { UsuarioModel } from './usuarioModel';

export class UsuarioRepositorio {
    static async adduser(usuario: Usuario): Promise<Boolean>{
        const user = await UsuarioModel.create(usuario);
        return true;
    }
    static async login(usuario: String, senha: String): Promise<Usuario | null>{
        const user = await UsuarioModel.findOne({
            usuario,
            senha
        });
        return user
    }
    static async getAllUsers(): Promise<Array<Usuario>>{
        const users = await UsuarioModel.find({});
        return users
    }
}

