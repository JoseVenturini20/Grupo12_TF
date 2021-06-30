import { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box
} from '@material-ui/core';
import gtm from '../../lib/gtm';
import type { Reclamacao } from '../../types/reclamacao';
import ReclamacoesGerais from '../reclamacoes/ReclamacoesGerais';
import axios from '../../lib/axios';

const Inicio: FC = () => {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get<{ posts: Reclamacao[] }>('/api/social/feed');

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
          py: 8
        }}
      >
        <Box m={2}>
          {reclamacoes.map((reclamacao) => (
            <Box
              key={reclamacao.id}
              sx={{ mt: 3 }}
            >
              <ReclamacoesGerais
                authorAvatar={reclamacao.author.avatar}
                authorName={reclamacao.author.name}
                comments={reclamacao.comments}
                createdAt={reclamacao.createdAt}
                isLiked={reclamacao.isLiked}
                likes={reclamacao.likes}
                media={reclamacao.media}
                message={reclamacao.message}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Inicio;
