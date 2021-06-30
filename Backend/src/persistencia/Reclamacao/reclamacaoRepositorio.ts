import { Reclamacao } from "../../entidades/reclamacao";
import { Comentario } from "../../entidades/comentario";

import { ReclamacaoModel } from './reclamacaoModel';

export class ReclamacaoRepositorio {
    static async adicionaReclamacao(reclamacao: Reclamacao): Promise<Boolean>{
        try{
            await ReclamacaoModel.create(reclamacao);
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    static async buscarReclamacao(): Promise<Array<Reclamacao|null>>{
        return await ReclamacaoModel.find();
    }
    static async buscarReclamacaoPorUsuario(usuario : String): Promise<Array<Reclamacao|null>>{
        return await ReclamacaoModel.find({usuario: usuario});
    }
    static async editarReclamacao(id: String, reclamacao: Reclamacao): Promise<Boolean>{
        try{
            await ReclamacaoModel.findByIdAndUpdate(id, reclamacao);
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    static async editarStatus(id: String, status: String): Promise<Boolean>{
        try{
            await ReclamacaoModel.findByIdAndUpdate(id, {status:status});
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    static async adicionaComentario(id: String, comentario: Comentario): Promise<Boolean>{
        try{
            await ReclamacaoModel.findByIdAndUpdate(id, {$push: {comentarios : comentario}});
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    
}

