import { Request, Response, NextFunction } from 'express';
import { UsuarioRepositorio } from '../../persistencia/Usuario/usuarioRepositorio';

export class LoginController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = req.body.usuario;
            const senha = req.body.senha;

            const resultado = await UsuarioRepositorio.login(usuario, senha);
            if(resultado){
                res.status(200).json({msg: "Ok", usuario: resultado.usuario, cargo: resultado.cargo});
            }else {
                res.status(400).json({msg: "Falha no login"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

}