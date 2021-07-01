import * as dbhandler from './dbhandler';
import { ReclamacaoRepositorio } from '../persistencia/Reclamacao/reclamacaoRepositorio';
import { ReclamacaoModel } from '../persistencia/Reclamacao/reclamacaoModel';
import { UsuarioModel } from '../persistencia/Usuario/usuarioModel';


beforeAll(async () => {
    await dbhandler.connect();
});
afterAll(async () => {
    await dbhandler.closeDatabase();
});


describe('Reclamacao repositorio ', () => {
    let reclamacaoMockErrado = {
        "titulo": "", 
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

    describe("Cadastrar reclamacao", () => {
        test('O retorno deve ser true para um obj valido', async () => {
            const res = await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMock1);
            expect(res).toEqual(true);
        });
        test('O retorno deve ser false para um obj invalido', async () => {
            const res = await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMockErrado);
            expect(res).toEqual(false);
        });
    });
    describe("Buscar todas as reclamacoes", () => {
        test('deve retornar todas reclamacoes do banco', async () => {
            await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMock2);
            const res = await ReclamacaoRepositorio.buscarReclamacoes();
            expect(res).toBeTruthy();
            expect(res.length).toBe(2);
        });
    });
    describe("Buscar reclamacoes de um usuario", () => {
        test('deve retornar todas reclamacoes do banco', async () => {
            let res = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose");
            expect(res).toBeTruthy();
            expect(res.length).toBe(1);
            await ReclamacaoRepositorio.adicionaReclamacao(reclamacaoMock1);
            res = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose");
            expect(res).toBeTruthy();
            expect(res.length).toBe(2);
        });
        
    });
    describe("Editar reclamacoes", () => {
        test('Deve retornar true, se for valida', async () => {
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose") as any;
            reclamacoes[0].titulo = "reclamacao editada";
            const res = await ReclamacaoRepositorio.editarReclamacao(reclamacoes[0]._id, reclamacoes);
            expect(res).toBe(true);
        });
        test('Deve retornar false, se for invalida', async () => {
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose") as any;
            reclamacoes[0].titulo = "reclamacao editada";
            const res = await ReclamacaoRepositorio.editarReclamacao('60dbaa5c2d325302b18fcc1b', reclamacoes);
            expect(res).toBe(false);
        });
    });
    describe("Editar status", () => {
        test('Deve retornar true, se for valida', async () => {
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose") as any;
            const res = await ReclamacaoRepositorio.editarStatus(reclamacoes[0]._id, 'Resolvida');
            expect(res).toBe(true);
        });
        test('Deve retornar false, se for invalida', async () => {
            const res = await ReclamacaoRepositorio.editarStatus('60dbaa5c2d325302b18fcc1b', 'Resolvida');
            expect(res).toBe(false);
        });
    });
    describe("Novo comentario", () => {
        test('Deve retornar true, se for valida', async () => {
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoesPorUsuario("jose") as any;
            const res = await ReclamacaoRepositorio.adicionaComentario(reclamacoes[0]._id, {
                data: new Date(),
                mensagem: "nova mensagem",
                usuario: "jose"
            });
            expect(res).toBe(true);
            const reclamacoesAtualizadas = await ReclamacaoRepositorio.buscarReclamacoes();

        });
        test('Deve retornar false, se for invalida', async () => {
            const res = await ReclamacaoRepositorio.adicionaComentario("60dbaa5c2d325302b18fcc1b", {
                data: new Date(),
                mensagem: "nova mensagem",
                usuario: "jose"
            });
            expect(res).toBe(false);
        });
    });

    describe("total Reclamacao", () => {
        test('Deve retornar os totais da reclamacao', async () => {
            const res = await ReclamacaoRepositorio.totalReclamacao() as any;
            expect(res.bairro.cohab).toEqual(3);
            expect(res.categoria.Rua).toEqual(3);
        });
    });

    describe("numeroMedioComentario", () => {
        test('Deve retornar os numeroMedioComentario', async () => {
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoes() as any;
            const reclamacao = await ReclamacaoModel.create({
                "titulo": "RECLAMCAO", 
                "descricao": "Alguma disc", 
                "data": new Date(), 
                "usuario": "jose",
                "endereco": {
                    "bairro": "cohab2",
                    "rua": "rua 123"
                },
                "status": "Aberto",
                "categoria": "Chuva",
                "imagem": "123"
            });
            const reclamacao2 = await ReclamacaoModel.create({
                "titulo": "RECLAMCAO", 
                "descricao": "Alguma disc", 
                "data": new Date(), 
                "usuario": "jose",
                "endereco": {
                    "bairro": "cohab23",
                    "rua": "rua 123"
                },
                "status": "Aberto",
                "categoria": "Chuva3",
                "imagem": "123"
            });
            await ReclamacaoRepositorio.adicionaComentario(reclamacao._id, {
                data: new Date(),
                mensagem: "oi",
                usuario: "fulano"
            })
            await ReclamacaoRepositorio.adicionaComentario(reclamacao2._id, {
                data: new Date(),
                mensagem: "oi",
                usuario: "fulano"
            })
            const res = await ReclamacaoRepositorio.numeroMedioComentario() as any;
            expect(res.bairro.cohab).toEqual(0.3333333333333333);
            expect(res.categoria.Rua).toEqual(0.3333333333333333);
        });
    });

    describe("percentualStatus", () => {
        test('Deve retornar os percentualStatus', async () => {
            const res = await ReclamacaoRepositorio.percentualStatus() as any;
            expect(res.bairro.encerrada.cohab).toEqual(0);
            expect(res.bairro.resolvida.cohab).toEqual(33.33333333333333);

            expect(res.categoria.encerrada.Rua).toEqual(0);
            expect(res.categoria.resolvida.Rua).toEqual(33.33333333333333);

        });
    });
    describe("percentualRespondidaOrgaoOficial", () => {
        test('Deve retornar os percentualRespondidaOrgaoOficial', async () => {
            await UsuarioModel.create({
                usuario: "prefeitura",
                senha: "123",
                cargo: "oficial"
            });
            await UsuarioModel.create({
                usuario: "fulano",
                senha: "123",
                cargo: "normal"
            });
            const reclamacoes = await ReclamacaoRepositorio.buscarReclamacoes() as any;
            await ReclamacaoRepositorio.adicionaComentario(reclamacoes[0]._id, {
                data: new Date(),
                mensagem: "oi",
                usuario: "prefeitura"
            })
            await ReclamacaoRepositorio.editarStatus(reclamacoes[1]._id, "Encerrada")
            const res = await ReclamacaoRepositorio.percentualRespondidaOrgaoOficial() as any;
            expect(res.encerrada).toEqual(20);

            expect(res.respondida).toEqual(20);

        });
    });
});