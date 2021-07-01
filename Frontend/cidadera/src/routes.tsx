import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import AuthGuard from './components/AuthGuard';
import Layout from './components/dashboard/Layout';
import GuestGuard from './components/GuestGuard';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<div></div>}>
    <Component {...props} />
  </Suspense>
);

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const Inicio = Loadable(lazy(() => import('./pages/dashboard/Inicio')));
const Reclamacoes = Loadable(lazy(() => import('./pages/reclamacao/Reclamacoes')));
const MinhasReclamacoes = Loadable(lazy(() => import('./pages/reclamacao/MinhasReclamacoes')));
const InformacoesGerenciais = Loadable(lazy(() => import('./pages/gerencia/InformacoesGerenciais')));
const routes: PartialRouteObject[] = [
  {
    path: '/',
    children: [
      {
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'login-unguarded',
        element: <Login />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Inicio />
      },
      {
        path: '/reclamacoes',
        element: <Reclamacoes />
      },
      {
        path: '/editar-reclamacoes',
        element: <MinhasReclamacoes />
      },
      {
        path: '/informacoes-gerenciais',
        element: <InformacoesGerenciais />
      },
    ]
  }
];

export default routes;
