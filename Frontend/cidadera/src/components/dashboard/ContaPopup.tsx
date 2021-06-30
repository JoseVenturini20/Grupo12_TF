import { useRef, useState } from 'react';
import type { FC } from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  MenuItem,
  Popover,
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
import UserIcon from '../../icons/User';

const ContaPopup: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar({
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <UserIcon fontSize="large" />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        getContentAnchorEl={null}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Sair
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default ContaPopup;
