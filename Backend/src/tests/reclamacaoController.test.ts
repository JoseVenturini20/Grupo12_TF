const request = require('supertest');
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ReclamacaoController } from '../controladores/Reclamacao/reclamacaoController'
import * as dbhandler from './dbhandler';
import { ReclamacaoRepositorio } from '../persistencia/Reclamacao/reclamacaoRepositorio';
let reclamacoes: any = []; 

beforeAll(async () => {
    await dbhandler.connect();
    await addToDataBase();
    reclamacoes = await ReclamacaoRepositorio.buscarReclamacoes();
});
afterAll(async () => {
    await dbhandler.clearDatabase();
    await dbhandler.closeDatabase();
});


describe('reclamacaoController', () => {
    describe("novaReclamacao", () => {
        test('Deve cadastrar uma nova reclamacao', async () => {
            const reclamacaoMock = {
                "titulo": "RECLAMCAO2", 
                "descricao": "Alguma disc", 
                "data": new Date(), 
                "usuario": "jose2",
                "endereco": {
                    "bairro": "cohab",
                    "rua": "rua 123"
                },
                "status": "Aberto",
                "categoria": "Rua",
                "imagem": "123"
            }
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: reclamacaoMock
            });
            await ReclamacaoController.novaReclamacao(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({msg: "Reclamacao adicionada"});
            expect(res.status).toHaveBeenCalledWith(200);
        });
        
        test('Deve falhar ao cadastrar uma reclamacao incorreta', async () => {
            const reclamacaoMock = {
                "descricao": "Alguma disc", 
                "data": new Date(), 
                "usuario": "jose2",
                "endereco": {
                    "bairro": "cohab",
                    "rua": "rua 123"
                },
                "status": "Aberto",
                "categoria": "Rua",
                "imagem": "123"
            }
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: reclamacaoMock
            });
            await ReclamacaoController.novaReclamacao(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({msg: "Falha ao adicionar reclamacao"});
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('Deve buscar as reclamacoes', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({});
            await ReclamacaoController.buscarReclamacoes(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);

        });
        test('Deve buscar as reclamacoes de um usuario especifico', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                params: {
                    "usuario": "jose"
                }
            });
            await ReclamacaoController.buscarReclamacoesPorUsuario(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('Deve gerar excepetion se nao enviar usuario', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({});
            await ReclamacaoController.buscarReclamacoesPorUsuario(mockRequest, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
        test('Deve editar uma reclamacao', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                    reclamacao: reclamacoes[0]
                }
            });
            await ReclamacaoController.editarReclamacao(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('Deve retornar 400 quando nao consegue editar', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  "60dbaa5c2d325302b18fcc1b",
                    reclamacao: reclamacoes[0]
                }
            });
            await ReclamacaoController.editarReclamacao(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('Deve gerar exeception ao nao enviar reclamacao ou id', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                }
            });
            await ReclamacaoController.editarReclamacao(mockRequest, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
        test('Deve editar status de uma reclamacao', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                    status: 'Encerrada'
                }
            });
            await ReclamacaoController.editarStatus(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('Deve retornar 400 quando nao consegue editar', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  "60dbaa5c2d325302b18fcc1b",
                    status: "Encerrada"
                }
            });
            await ReclamacaoController.editarStatus(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('Deve gerar exeception ao nao enviar reclamacao ou id', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                }
            });
            await ReclamacaoController.editarStatus(mockRequest, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
        test('Deve editar status de uma reclamacao', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                    comentario: {
                        usuario:  "blabla",
                        mensagem: "Nova Mensagem",
                        data: "2021-06-29T23:18:52.057+00:00"
                    }
                }
            });
            await ReclamacaoController.adicionaComentario(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('Deve retornar 400 quando nao consegue editar', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  "60dbaa5c2d325302b18fcc1b",
                    comentario: {
                        usuario:  "blabla",
                        mensagem: "Nova Mensagem",
                        data: "2021-06-29T23:18:52.057+00:00"
                    }
                }
            });
            await ReclamacaoController.adicionaComentario(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('Deve gerar exeception ao nao enviar reclamacao ou id', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({
                body: {
                    id:  reclamacoes[0]._id,
                }
            });
            await ReclamacaoController.adicionaComentario(mockRequest, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });

        test('Deve buscar as informacoes gerenciais', async () => {
            const {next, res} = getMockRes();
            const mockRequest = getMockReq({});
            await ReclamacaoController.informacoesGerenciais(mockRequest, res, next);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);

        });
    });
});

const addToDataBase = async () => {
    let reclamacaoMock1 = {
        "titulo": "RECLAMCAO", 
        "descricao": "Alguma disc", 
        "data": new Date(), 
        "usuario": "jose",
        "endereco": {
            "bairro": "cohab",
            "rua": "rua 123"
        },
        "status": "Aberto",
        "categoria": "Rua",
        "imagem": "123"
    };
    let reclamacaoMock2 = {
        "titulo": "RECLAMCAO2", 
        "descricao": "Alguma disc", 
        "data": new Date(), 
        "usuario": "jose2",
        "endereco": {
            "bairro": "cohab",
            "rua": "rua 123"
        },
        "status": "Aberto",
        "categoria": "Rua",
        "imagem": "123"
    };
    await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMock1);
    await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMock2);
}