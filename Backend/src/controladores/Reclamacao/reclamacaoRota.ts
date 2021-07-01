import { Router } from 'express';
import {ReclamacaoController} from './reclamacaoController';

const routerReclamacao = Router();
export const path = '/reclamacao';

routerReclamacao.post(`${path}/nova`, ReclamacaoController.novaReclamacao);
routerReclamacao.get(`${path}/buscar`, ReclamacaoController.buscarReclamacoes);
routerReclamacao.get(`${path}/buscarPorUsuario/:usuario`, ReclamacaoController.buscarReclamacoesPorUsuario);
routerReclamacao.patch(`${path}/editar`, ReclamacaoController.editarReclamacao);
routerReclamacao.patch(`${path}/editarStatus`, ReclamacaoController.editarStatus);
routerReclamacao.put(`${path}/adicionarComentario`, ReclamacaoController.adicionaComentario);
routerReclamacao.get(`${path}/informacoesGerenciais`, ReclamacaoController.informacoesGerenciais);



export { routerReclamacao };
