import { Reclamacao } from "../../entidades/reclamacao";
import { Comentario } from "../../entidades/comentario";

import { ReclamacaoModel } from './reclamacaoModel';
import { UsuarioModel } from '../Usuario/usuarioModel';
import { isFlow } from "@babel/types";

export class ReclamacaoRepositorio {
    static async adicionaReclamacao(reclamacao: Reclamacao): Promise<Boolean>{
        try{
            await ReclamacaoModel.create(reclamacao);
            return true
        }catch(err){
            //console.log(err)
            return false
        }
    }
    static async buscarReclamacoes(): Promise<Array<Reclamacao>>{
        return await ReclamacaoModel.find();
    }
    static async buscarReclamacoesPorUsuario(usuario : String): Promise<Array<Reclamacao>>{
        return await ReclamacaoModel.find({usuario: usuario});
    }
    static async editarReclamacao(id: String, reclamacao: Reclamacao): Promise<Boolean>{
        const resultado = await ReclamacaoModel.findByIdAndUpdate(id, reclamacao);
        if(!resultado){
            return false
        }
        return true
    }
    static async editarStatus(id: String, status: String): Promise<Boolean>{
        const resultado = await ReclamacaoModel.findByIdAndUpdate(id, {status:status});
        if(!resultado){
            return false
        }
        return true
    }
    
    static async adicionaComentario(id: String, comentario: Comentario): Promise<Boolean>{
        const resultado = await ReclamacaoModel.findByIdAndUpdate(id, {$push: {comentarios : comentario}});
        if(!resultado){
            return false
        }
        return true
    }

    static async totalReclamacao(): Promise<any>{
        const reclamacoes = await ReclamacaoModel.find();
        let bairro : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!bairro.includes(r.endereco.bairro)){
                bairro.push(r.endereco.bairro)
            }
        });
        let categoria : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!categoria.includes(r.categoria)){
                categoria.push(r.categoria)
            }
        });
        let reclamacoesPorCategoria : any = {}
        let reclamacoesPorBairro : any = {}
        await Promise.all(categoria.map(async c => {
           const count =  await ReclamacaoModel.count({categoria: c});
           reclamacoesPorCategoria[c] = count;
        }));
        await Promise.all(bairro.map(async b => {
            const count =  await ReclamacaoModel.count({'endereco.bairro': b});
            reclamacoesPorBairro[b] = count;
         }));
        
        return {categoria:reclamacoesPorCategoria, bairro:reclamacoesPorBairro}
    }

    static async numeroMedioComentario(): Promise<any>{
        const reclamacoes = await ReclamacaoModel.find();
        let bairro : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!bairro.includes(r.endereco.bairro)){
                bairro.push(r.endereco.bairro)
            }
        });
        let categoria : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!categoria.includes(r.categoria)){
                categoria.push(r.categoria)
            }
        });
        let reclamacoesPorCategoria : any = {}
        let reclamacoesPorBairro : any = {}
        let comentarioPorBairro : any = {}
        bairro.forEach(b => { comentarioPorBairro[b] = 0} )
        let comentarioPorCategoria : any = {}
        categoria.forEach(c => { comentarioPorCategoria[c] = 0} )

        await Promise.all(categoria.map(async c => {
           const count =  await ReclamacaoModel.count({categoria: c});
           reclamacoesPorCategoria[c] = count;
           reclamacoes.forEach(r => {
               if(r.categoria === c){
                    comentarioPorCategoria[c] = comentarioPorCategoria[c] + r.comentarios?.length;
               }
           })
        }));
        await Promise.all(bairro.map(async b => {
            const count =  await ReclamacaoModel.count({'endereco.bairro': b});
            reclamacoesPorBairro[b] = count;
            reclamacoes.forEach(r => {
                if(r.endereco.bairro === b){
                    comentarioPorBairro[b] = comentarioPorBairro[b] + r.comentarios?.length;
                }
            })
         }));
         
         let mediaComentarioPorCategoria : any = {};
         let mediaComentarioPorBairro : any = {};

         Object.keys(comentarioPorCategoria).forEach(c => {
            mediaComentarioPorCategoria[c] = comentarioPorCategoria[c] / reclamacoesPorCategoria[c]
         });
         Object.keys(comentarioPorBairro).forEach(c => {
            mediaComentarioPorBairro[c] = comentarioPorBairro[c] / reclamacoesPorBairro[c]
         });
         

        return {categoria: mediaComentarioPorCategoria, bairro: mediaComentarioPorBairro}
    }
    static async percentualStatus(): Promise<any>{
        const reclamacoes = await ReclamacaoModel.find();
        let bairro : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!bairro.includes(r.endereco.bairro)){
                bairro.push(r.endereco.bairro)
            }
        });
        let categoria : Array<any> = [];
        reclamacoes.forEach(r => {
            if(!categoria.includes(r.categoria)){
                categoria.push(r.categoria)
            }
        });
        let reclamacoesPorCategoria : any = {}
        let reclamacoesPorBairro : any = {}

        let reclamacoesPorCategoriaResolvido : any = {}
        let reclamacoesPorBairroResolvido : any = {}

        let reclamacoesPorCategoriaEncerrado : any = {}
        let reclamacoesPorBairroEncerrado : any = {}

        await Promise.all(categoria.map(async c => {
            const count =  await ReclamacaoModel.count({categoria: c});
            reclamacoesPorCategoria[c] = count;
        }));
        await Promise.all(bairro.map(async b => {
            const count =  await ReclamacaoModel.count({'endereco.bairro': b});
            reclamacoesPorBairro[b] = count;
           
        }));

        await Promise.all(categoria.map(async c => {
            const count =  await ReclamacaoModel.count({categoria: c, status: "Resolvida"});
            reclamacoesPorCategoriaResolvido[c] = count;
        }));
        await Promise.all(bairro.map(async b => {
            const count =  await ReclamacaoModel.count({'endereco.bairro': b, status: "Resolvida"});
            reclamacoesPorBairroResolvido[b] = count;
        }));

        await Promise.all(categoria.map(async c => {
            const count =  await ReclamacaoModel.count({categoria: c, status: "Encerrada"});
            reclamacoesPorCategoriaEncerrado[c] = count;
        }));
        await Promise.all(bairro.map(async b => {
            const count =  await ReclamacaoModel.count({'endereco.bairro': b, status: "Encerrada"});
            reclamacoesPorBairroEncerrado[b] = count;
        }));
        let percentualPorCategoria : any = {encerrada: {}, resolvida: {}};
        let percentualPorBairro : any = {encerrada: {}, resolvida: {}};

        Object.keys(reclamacoesPorCategoria).forEach(c => {
            percentualPorCategoria.encerrada[c] = reclamacoesPorCategoriaEncerrado[c] / reclamacoesPorCategoria[c] * 100
            percentualPorCategoria.resolvida[c] = reclamacoesPorCategoriaResolvido[c] / reclamacoesPorCategoria[c] * 100
        });

        Object.keys(reclamacoesPorBairro).forEach(c => {
            percentualPorBairro.encerrada[c] = reclamacoesPorBairroEncerrado[c] / reclamacoesPorBairro[c] * 100
            percentualPorBairro.resolvida[c] = reclamacoesPorBairroResolvido[c] / reclamacoesPorBairro[c] * 100 
        });
        return {bairro: percentualPorBairro, categoria: percentualPorCategoria}
        
    }

    static async percentualRespondidaOrgaoOficial(): Promise<any>{
        const reclamacoes = await ReclamacaoModel.find();
        let contEncerrada = 0;
        let contRespondida = 0;

        const usuarios = await UsuarioModel.find();
        const usuariosOficiais : any = [];
        usuarios.forEach(u => {
            if(u.cargo == 'oficial'){
                usuariosOficiais.push(u.usuario)
            }
        });
        reclamacoes.forEach((r : any) => {
            let respondidaPorOficial = false;
            r.comentarios.forEach((c:any) => {
                if(usuariosOficiais.includes(c.usuario)){
                    respondidaPorOficial = true;
                }
            });
            if(r.status == 'Encerrada'){
                contEncerrada++;
            }
            if(respondidaPorOficial){
                contRespondida++;
            }
        });
        console.log({encerrada : contEncerrada / reclamacoes.length * 100,
            respondida : contRespondida / reclamacoes.length * 100})
        return {
            encerrada : contEncerrada / reclamacoes.length * 100,
            respondida : contRespondida / reclamacoes.length * 100
        }
    }


}

