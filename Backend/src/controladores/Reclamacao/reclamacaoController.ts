import { Request, Response, NextFunction } from 'express';
import { Comentario } from '../../entidades/comentario';
import { Reclamacao } from '../../entidades/reclamacao';
import { ReclamacaoRepositorio } from '../../persistencia/Reclamacao/reclamacaoRepositorio';

export class ReclamacaoController {
    static async novaReclamacao(req: Request, res: Response, next: NextFunction) {
            const reclamacao = req.body as Reclamacao;
        
            const resultado = await ReclamacaoRepositorio.adicionaReclamacao(reclamacao);
            if(resultado){
                res.status(200).json({msg: "Reclamacao adicionada"});
            }else {
                res.status(400).json({msg: "Falha ao adicionar reclamacao"});
            }
    }

    static async buscarReclamacoes(req: Request, res: Response, next: NextFunction) {
        const resultado = await ReclamacaoRepositorio.buscarReclamacoes();
        res.status(200).json({reclamacoes:resultado});
    }

    static async buscarReclamacoesPorUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = req.params.usuario
            if(!usuario){
                throw Error("usuario é obrigatorios")
            }
            const resultado = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario(usuario);
            res.status(200).json({reclamacoes:resultado});
        } catch(err) {
            console.log(err);
            next(err);
        }
    }
    static async editarReclamacao(req: Request, res: Response, next: NextFunction) {
        try {
            const reclamacao = req.body.reclamacao as Reclamacao;
            const id = req.body.id;
            if(!reclamacao || !id){
                throw Error("reclamacao e id são obrigatorios")
            }
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
            if(!status || !id){
                throw Error("status e id são obrigatorios")
            }
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
            if(!comentario || !id){
                throw Error("comentario e id são obrigatorios")
            }
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
    static async informacoesGerenciais(req: Request, res: Response, next: NextFunction) {
        const totalReclamacao = await ReclamacaoRepositorio.totalReclamacao();
        const numeroMedioComentario = await ReclamacaoRepositorio.numeroMedioComentario();
        const percentualStatus = await ReclamacaoRepositorio.percentualStatus();
        const percentualRespondidaOrgaoOficial = await ReclamacaoRepositorio.percentualRespondidaOrgaoOficial();
        const objetoResponse = {
            totalReclamacao,
            numeroMedioComentario,
            percentualStatus,
            percentualRespondidaOrgaoOficial
        }
        res.status(200).json(objetoResponse);
    }
}