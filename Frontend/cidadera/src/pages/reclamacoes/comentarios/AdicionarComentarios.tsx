import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Tooltip
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';

interface AddComentario {
  id: string;
}

const AdicionarComentarios: FC<AddComentario> = (props) => {
  const {
    id
  } = props;
  const [value, setValue] = useState<string>('');
  const usuario = localStorage.getItem("usuario");

  async function enviarComentario(){
    console.log(value)
    await axios.put('http://localhost:8080/reclamacao/adicionarComentario', {
      id: id,
      comentario: {
        usuario:usuario,
        mensagem:value,
        data:new Date()
      }
    })
    setValue('')
    window.location.href='/dashboard'
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex'
      }}
      {...props}
    >
      <TextField
        fullWidth
        onChange={handleChange}
        placeholder="Digite seu comentário"
        size="small"
        variant="outlined"
        value={value}
      />
      <Tooltip title="enviar">
        <IconButton
          color={value ? 'primary' : 'default'}
          component={value ? 'button' : 'span'}
          disabled={!value}
          onClick={enviarComentario}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default AdicionarComentarios;
