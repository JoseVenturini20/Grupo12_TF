import { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import gtm from '../../lib/gtm'
import axios from 'axios';
import EditarReclamacao from '../../components/dashboard/projeto/editarReclamacao/EditarReclamacao'
import { Reclamacao } from 'src/types/reclamacao';
const MinhasReclamacoes: FC = () => {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
  const usuario = localStorage.getItem("usuario");
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get<{ reclamacoes: Reclamacao[] }>('http://localhost:8080/reclamacao/buscarPorUsuario/' + usuario);
      setReclamacoes(response.data.reclamacoes)
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <Helmet>
        <title>Página Inicial</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
          m: 3
        }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            variant="overline"
          >
            Reclamações
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            Atualize suas reclamações.
          </Typography>
        </Grid>
        {reclamacoes &&
          <Box mt={2}>
            {reclamacoes.map((reclamacao) => (
              <Box
                key={reclamacao._id}
                sx={{ mt: 3 }}
              >
                <EditarReclamacao
                  titulo={reclamacao.titulo}
                  descricao={reclamacao.descricao}
                  usuario={reclamacao.usuario}
                  endereco={reclamacao.endereco}
                  id={reclamacao._id}
                  status={reclamacao.status}
                  categoria={reclamacao.categoria}
                  imagem={reclamacao.imagem}
                  comentarios={reclamacao.comentarios}
                  data={reclamacao.data}
                />
              </Box>
            ))}
          </Box>
        }
      </Box>
    </>
  );
};

export default MinhasReclamacoes;
