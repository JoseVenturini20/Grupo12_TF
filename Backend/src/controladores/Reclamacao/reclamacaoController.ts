import { Request, Response, NextFunction } from 'express';
import { Reclamacao } from '../../entidades/reclamacao';
import { ReclamacaoRepositorio } from '../../persistencia/Reclamacao/reclamacaoRepositorio';

export class ReclamacaoController {
    static async novaReclamacao(req: Request, res: Response, next: NextFunction) {
        try {
            const reclamacao = req.body as Reclamacao;
            const resultado = await ReclamacaoRepositorio.adicionaReclamacao(reclamacao);
            if(resultado){
                res.status(200).json({msg: "Reclamacao adicionada"});
            }else {
                res.status(400).json({msg: "Falha ao adicionar reclamacao"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
}