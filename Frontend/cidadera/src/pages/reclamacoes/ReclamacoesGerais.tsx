import { useState } from 'react';
import type { FC } from 'react';
import { Lightbox } from 'react-modal-image';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import type { Comment } from '../../types/reclamacao';
import Comentario from './comentarios/Comentario';
import AdicionarComentarios from './comentarios/AdicionarComentarios';

interface ReclamacoesGeraisProps {
  authorAvatar: string;
  authorName: string;
  comments: Comment[];
  createdAt: number;
  isLiked: boolean;
  likes: number;
  media?: string;
  message: string;
}

const ReclamacoesGerais: FC<ReclamacoesGeraisProps> = (props) => {
  const {
    authorAvatar,
    authorName,
    comments,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    media,
    message,
    ...other
  } = props;
  const [expandMedia, setExpandMedia] = useState<boolean>(false);

  return (
    <>
      <Card color='secondary' {...other}>
        <CardHeader
          disableTypography
          title={(
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {authorName}
            </Typography>
          )}
        />
        <Box
          sx={{
            pb: 2,
            px: 3
          }}
        >
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {message}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {comments.map((comment) => (
            <Comentario
              authorAvatar={comment.author.avatar}
              authorName={comment.author.name}
              createdAt={comment.createdAt}
              key={comment.id}
              message={comment.message}
            />
          ))}
          <Divider sx={{ my: 2 }} />
          <AdicionarComentarios />
        </Box>
      </Card>
      {expandMedia && (
        <Lightbox
          large={media}
          onClose={(): void => setExpandMedia(false)}
        />
      )}
    </>
  );
};

ReclamacoesGerais.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  media: PropTypes.string,
  message: PropTypes.string
};

export default ReclamacoesGerais;
