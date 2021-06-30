import { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import gtm from '../../lib/gtm';
import type { Reclamacao } from '../../types/reclamacao';
import ReclamacoesGerais from '../reclamacoes/ReclamacoesGerais';
import axios from 'axios';

const Inicio: FC = () => {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get<{ reclamacoes: Reclamacao[] }>('http://localhost:8080/reclamacao/buscar');
      console.log(response.data.reclamacoes)
      setReclamacoes(response.data.reclamacoes)
      console.log()
    } catch (err) {
      console.error(err);
    }
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
            Esse é o lugar pra tornar sua reclamação pública. Você mostra o problema, juntos cobramos a Prefeitura.
          </Typography>
        </Grid>
        {reclamacoes &&
          <Box mt={2}>
            {reclamacoes.map((reclamacao) => (
              <Box
                key={reclamacao._id}
                sx={{ mt: 3 }}
              >
                <ReclamacoesGerais
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

export default Inicio;
