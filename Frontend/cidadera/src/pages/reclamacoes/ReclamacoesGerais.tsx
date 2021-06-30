import type { FC, ChangeEvent } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  Avatar,
  Button,
  TextField
} from '@material-ui/core';
import type { Comentarios } from '../../types/reclamacao';
import Comentario from './comentarios/Comentario';
import AdicionarComentarios from './comentarios/AdicionarComentarios';
import ClockIcon from '../../icons/Clock';
import Label from '../../components/Label';
import axios from 'axios';
interface ReclamacoesGeraisProps {
  titulo: string;
  descricao: string;
  usuario: string;
  endereco: any;
  id: string;
  status: string;
  categoria: string;
  imagem?: string;
  comentarios: Comentarios[];
  data: string;
}

const ReclamacoesGerais: FC<ReclamacoesGeraisProps> = (props) => {
  const {
    titulo,
    descricao,
    usuario,
    endereco,
    id,
    status,
    categoria,
    imagem,
    comentarios,
    data,
    ...other
  } = props;
  const dataFormatada = new Date(data).toLocaleString('pt-BR', { hour12: false })
  const usuarioAcesso = localStorage.getItem("usuario");
  const opcoes = ['Aberta','Resolvida'];
  const getStatusLabel = (status): JSX.Element => {
    const map = {
      'String': {
        text: 'String',
        color: 'success'
      },
      "Encerrada": {
        text: 'Encerrada',
        color: 'error'
      },
      "novoStatus": {
        text: 'novoStatus',
        color: 'warning'
      },
      'Aberta': {
        text: 'Aberta',
        color: 'warning'
      },
      "Resolvida": {
        text: 'Resolvida',
        color: 'success'
      },
    };
    const { text, color }: any = map[status];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    await axios.patch('http://localhost:8080/reclamacao/editarStatus/',{
      id:id,
      status:event.target.value
    });
    window.location.href = "/dashboard";
  };

  return (
    <>
      <Card color='secondary' {...other}>
        <CardHeader
          avatar={(
            <Avatar
            />
          )}
          disableTypography
          subheader={(
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mt: 1
              }}
            >
              <ClockIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              <Typography
                color="textSecondary"
                sx={{ ml: '6px' }}
                variant="caption"
              >
                {dataFormatada}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {usuario === usuarioAcesso && status!=='Encerrada' ? (
                <div>
                  <TextField
                    fullWidth
                    name="option"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={status}
                    variant="outlined"
                  >
                    {opcoes.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </TextField>
                </div>
              ) : (
                <div>{getStatusLabel(status)}</div>
              )}

            </Box>
          )}
          title={(
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {usuario}
            </Typography>
          )}
        />
        <Box
          sx={{
            pb: 2,
            px: 3
          }}
        >
          <Box mb={2}>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Rua:{endereco.rua}
            </Typography>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Bairro:{endereco.bairro}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {titulo}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {categoria}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {descricao}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={() => window.open(imagem, '_blank')}
            >
              Imagem
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          {comentarios.map((comentario) => (
            <Comentario
              data={comentario.data}
              mensagem={comentario.mensagem}
              usuario={comentario.usuario}
            />
          ))}
          <Divider sx={{ my: 2 }} />
          <AdicionarComentarios status={status} id={id} />
        </Box>
      </Card>
    </>
  );
};

export default ReclamacoesGerais;
