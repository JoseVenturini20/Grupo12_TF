import type { FC } from 'react';
import PropTypes from 'prop-types';
import {  Box, Typography } from '@material-ui/core';

interface ComentarioProps {
  authorAvatar: string;
  authorName: string;
  createdAt: number;
  message: string;
}

const Comentario: FC<ComentarioProps> = (props) => {
  const {
    authorAvatar,
    authorName,
    createdAt,
    message,
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
            {authorName}
          </Typography>
        </Box>
        <Typography
          color="textPrimary"
          variant="body2"
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

Comentario.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired
};

export default Comentario;
