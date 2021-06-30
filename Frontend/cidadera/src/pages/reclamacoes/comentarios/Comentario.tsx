import type { FC } from 'react';
import {  Box, Typography } from '@material-ui/core';

interface ComentarioProps {
  data: string;
  mensagem: string;
  usuario: string;
}

const Comentario: FC<ComentarioProps> = (props) => {
  const {
    data,
    mensagem,
    usuario,
    ...other
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2
      }}
      {...other}
    >
      <Box
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 1,
          flexGrow: 1,
          ml: 2,
          p: 2
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mb: 1
          }}
        >
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            {usuario}
          </Typography>
        </Box>
        <Typography
          color="textPrimary"
          variant="body2"
        >
          {mensagem}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comentario;
