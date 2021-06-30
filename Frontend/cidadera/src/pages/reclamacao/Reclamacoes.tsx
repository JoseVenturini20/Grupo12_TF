import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import gtm from '../../lib/gtm';
import CriarReclamacao from '../../components/dashboard/projeto/CriarReclamacao';

const Reclamacoes: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Reclamaões</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
          m:3
        }}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item  
            xs={12}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                Reclamação
              </Typography>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Encontrou um problema na sua cidade?
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                Informe a gente dos problemas da cidade: buracos na rua, trânsito, terrenos com mato alto, saúde, educação, obras paradas e mais.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={2}>
          <CriarReclamacao/>
        </Box>
      </Box>
    </>
  );
};

export default Reclamacoes;
