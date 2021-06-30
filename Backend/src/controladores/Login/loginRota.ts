import { Router } from 'express';
import {LoginController} from './loginController';

const routerLogin = Router();
export const path = '/login';

routerLogin.post(`${path}`, LoginController.login);


export { routerLogin };
