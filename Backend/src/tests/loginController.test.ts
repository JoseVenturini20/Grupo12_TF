const request = require('supertest');
import { getMockReq, getMockRes } from '@jest-mock/express';
import { LoginController } from '../controladores/Login/loginController'
import * as dbhandler from './dbhandler';
import { UsuarioRepositorio } from '../persistencia/Usuario/usuarioRepositorio';

beforeAll(async () => {
    await dbhandler.connect();
    await addToDataBase();
});
afterAll(async () => {
    await dbhandler.clearDatabase();
    await dbhandler.closeDatabase();
});


describe('LoginController', () => {
    const mockRequest = getMockReq({
        body: {
            "usuario":"jose",
            "senha": "20009"
        }
    });
    describe("Login", () => {
        test('Deve fazer login corretamente', async () => {
            const {next, res} = getMockRes();
            await LoginController.login(mockRequest, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                usuario:"jose",
                cargo: "qualquer",
                msg: "Ok"
            });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe("Login", () => {
        test('Deve gerar exception quando enviado body invalido', async () => {
            const {next, res} = getMockRes();
            const mockRequestErrado = getMockReq({
                body: undefined
            });
            await LoginController.login(mockRequestErrado, res, next);
            expect(next).toBeCalledTimes(1)
        });
    });

    describe("Login", () => {
        test('Deve retornar 400 ao login ser feito com usuario ou senha invalidas', async () => {
            const {next, res} = getMockRes();
            const mockRequestErrado = getMockReq({
                body: {
                    "usuario":"errado",
                    "senha": "20009"
                }
            });
            await LoginController.login(mockRequestErrado, res, next);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({msg: "Falha no login"});
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});

const addToDataBase = async () => {
    await  UsuarioRepositorio.adduser({
        usuario:"jose",
        senha: "20009",
        cargo: "qualquer"
    })
}