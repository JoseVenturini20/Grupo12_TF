import { Request, Response, NextFunction } from 'express';
import { Comentario } from '../../entidades/comentario';
import { Reclamacao } from '../../entidades/reclamacao';
import { ReclamacaoRepositorio } from '../../persistencia/Reclamacao/reclamacaoRepositorio';

export class ReclamacaoController {
    static async novaReclamacao(req: Request, res: Response, next: NextFunction) {
        try {
            const reclamacao = req.body as Reclamacao;
            console.log(reclamacao)
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

    static async buscarReclamacoes(req: Request, res: Response, next: NextFunction) {
        try {
            const resultado = await ReclamacaoRepositorio.buscarReclamacoes();
            if(resultado){
                res.status(200).json({reclamacoes:resultado});
            }else {
                res.status(500).json({msg: "Falha ao buscar reclamacoes"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    static async buscarReclamacoesPorUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = req.params.usuario
            const resultado = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario(usuario);
            if(resultado){
                res.status(200).json({reclamacoes:resultado});
            }else {
                res.status(500).json({msg: "Falha ao buscar reclamacoes"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
    static async editarReclamacao(req: Request, res: Response, next: NextFunction) {
        try {
            const reclamacao = req.body.reclamacao as Reclamacao;
            const id = req.body.id;
            const resultado = await ReclamacaoRepositorio.editarReclamacao(id, reclamacao);
            if(resultado){
                res.status(200).json({msg: "Reclamacao editada"});
            }else {
                res.status(400).json({msg: "Falha ao editar reclamacao"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
    static async editarStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.body.status;
            const id = req.body.id;
            const resultado = await ReclamacaoRepositorio.editarStatus(id, status);
            if(resultado){
                res.status(200).json({msg: "Status editado"});
            }else {
                res.status(400).json({msg: "Falha ao editar status"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    static async adicionaComentario(req: Request, res: Response, next: NextFunction) {
        try {
            const comentario = req.body.comentario as Comentario;
            const id = req.body.id;
            const resultado = await ReclamacaoRepositorio.adicionaComentario(id, comentario);
            if(resultado){
                res.status(200).json({msg: "Comentario adicionado"});
            }else {
                res.status(400).json({msg: "Falha ao adicionar comentario"});
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
}