import { mock } from '../lib/axios';
import createResourceId from '../utils/createResourceId';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import wait from '../utils/wait';

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    email: 'demo@devias.io',
    name: 'Jane Rotanson',
    password: 'Password123!',
    cargo: 'Premium'
  }
];

mock
  .onPost('/api/authentication/login')
  .reply(async (config) => {
    await wait(1000);

    try {
      const { email, password } = JSON.parse(config.data);

      const user = users.find((_user) => _user.email === email);

      if (!user || (user.password !== password)) {
        return [400, { message: 'Please check your email and password' }];
      }

      const accessToken = sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return [
        200, {
          accessToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            cargo: user.cargo
          }
        }
      ];
    } catch (err) {
      console.error('[Mock]: ', err);
      return [500, { message: 'Internal server error' }];
    }
  });

mock
  .onPost('/api/authentication/register')
  .reply(async (config) => {
    await wait(1000);

    try {
      const { email, name, password } = JSON.parse(config.data);
      let user = users.find((_user) => _user.email === email);

      user = {
        id: createResourceId(),
        email,
        name,
        password,
        cargo: 'Standard'
      };

      users.push(user);

      const accessToken = sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return [
        200, {
          accessToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            cargo: user.cargo
          }
        }
      ];
    } catch (err) {
      console.error('[Mock]: ', err);
      return [500, { message: 'Internal server error' }];
    }
  });

mock
  .onGet('/api/identity/me')
  .reply((config) => {
    try {
      const { Authorization } = config.headers;

      if (!Authorization) {
        return [401, { message: 'Authorization required' }];
      }

      const accessToken = Authorization.split(' ')[1];

      const { userId } = decode(accessToken) as any;

      const user = users.find((_user) => _user.id === userId);

      return [
        200, {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            cargo: user.cargo
          }
        }
      ];
    } catch (err) {
      console.error('[Mock]: ', err);
      return [500, { message: 'Internal server error' }];
    }
  });
