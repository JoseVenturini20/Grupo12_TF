import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box
} from '@material-ui/core';
import gtm from '../../lib/gtm';

const Inicio: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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
        oi
      </Box>
    </>
  );
};

export default Inicio;
