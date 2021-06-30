import { Router } from 'express';
import {ReclamacaoController} from './reclamacaoController';

const routerReclamacao = Router();
export const path = '/reclamacao';

routerReclamacao.post(`${path}/nova`, ReclamacaoController.novaReclamacao)

export { routerReclamacao };
