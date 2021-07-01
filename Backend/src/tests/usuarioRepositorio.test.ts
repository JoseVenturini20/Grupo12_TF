import mongoose from 'mongoose';
import * as dbhandler from './dbhandler';
import { UsuarioRepositorio } from '../persistencia/Usuario/usuarioRepositorio';
import { UsuarioModel } from '../persistencia/Usuario/usuarioModel';
import { Usuario } from '../entidades/usuario'
import console from 'console';

beforeAll(async () => {
    await dbhandler.connect();
});
afterAll(async () => {
    await dbhandler.closeDatabase();
});


describe('Usuario repositorio ', () => {
    let usuarioMock1 = {
        cargo: "oficial",
        usuario: "jose",
        senha: "2009"
    };

    describe("Cadastrar Usuario", () => {
        test('O retorno deve ser true para um obj valido', async () => {
            const res = await UsuarioRepositorio.adduser(usuarioMock1);
            expect(res).toEqual(true);
        });
        test('deve fazer login com usuario correto', async () => {
            const res = await UsuarioRepositorio.login(usuarioMock1.usuario, usuarioMock1.senha);
            expect(res).toBeTruthy();
            expect(res?.cargo).toEqual(usuarioMock1.cargo);
            expect(res?.usuario).toEqual(usuarioMock1.usuario);
            expect(res?.senha).toEqual(usuarioMock1.senha);
        });
        test('deve buscar todos usuarios', async () => {
            const res = await UsuarioRepositorio.getAllUsers();
            expect(res).toBeTruthy(
                
            )
        });
    })
});