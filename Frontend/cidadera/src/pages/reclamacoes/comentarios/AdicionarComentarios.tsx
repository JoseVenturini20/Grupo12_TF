import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Tooltip
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const AdicionarComentarios: FC = (props) => {
  const [value, setValue] = useState<string>('');

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
      />
      <Tooltip title="Send">
        <IconButton
          color={value ? 'primary' : 'default'}
          component={value ? 'button' : 'span'}
          disabled={!value}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default AdicionarComentarios;
