import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import frLocale from 'date-fns/locale/fr';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  TextField,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import axios from 'axios'

const useStyles = makeStyles(() =>
  createStyles({
    buttonProgress: {
      color: '#F0A933',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

const CriarReclamacao: FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const usuario = localStorage.getItem("usuario");
  const [error, setError] = useState('');
  const [falha, setFalha] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      initialValues={{
        titulo: '',
        descricao: '',
        data: new Date(),
        bairro: '',
        rua: '',
        problema: '',
        imagem: ''
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            titulo: Yup
              .string()
              .min(3, 'Insira mais de 3 caracteres')
              .max(255)
              .required('Insira um titulo'),
            descricao: Yup
              .string()
              .min(3, 'Insira mais de 3 caracteres')
              .max(255)
              .required('Insira uma breve descrição do problema'),
            data: Yup
              .date(),
            bairro: Yup
              .string()
              .min(3, 'Insira mais de 3 caracteres')
              .max(255)
              .required('Insira o bairro'),
            rua: Yup
              .string()
              .min(3, 'Insira mais de 3 caracteres')
              .max(255)
              .required('Insira o bairro'),
            problema: Yup
              .string()
              .min(3, 'Insira mais de 3 caracteres')
              .max(255)
              .required('Insira o problema'),
            imagem: Yup
              .string(),
          })
      }
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }): Promise<void> => {
        try {
          setLoading(true)
          await axios.post('http://localhost:8080/reclamacao/nova', {
            titulo: values.titulo,
            descricao: values.descricao,
            data: values.data,
            usuario: usuario,
            endereco: {
              bairro: values.bairro,
              rua: values.rua
            },
            status: 'Aberta',
            categoria: values.problema,
            imagem: values.imagem
          })
          setStatus({ success: true });
          setSubmitting(true);

          //setLoading(false)
          enqueueSnackbar('Reclamação enviada com sucesso', {
            anchorOrigin: {
              horizontal: 'right',
              vertical: 'top'
            },
            variant: 'success'
          });
          window.location.href = "/dashboard";

        } catch (err) {
          console.error(err);
          setFalha(true)
          setError('Ocorreu um erro ao enviar a sua reclamação, tente novamente mais tarde')
          setLoading(false)
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        touched,
        values
      }): JSX.Element => (
        <form
          onSubmit={handleSubmit}
        >
          <Card sx={{ p: 3 }}>
            <Box sx={{ mt: 2 }}>
              <TextField
                error={Boolean(touched.titulo && errors.titulo)}
                fullWidth
                helperText={touched.titulo && errors.titulo}
                label="Titulo"
                name="titulo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.titulo}
                variant="outlined"
              />
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(touched.descricao && errors.descricao)}
                  fullWidth
                  helperText={touched.descricao && errors.descricao}
                  label="Descrição"
                  name="descricao"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.descricao}
                  variant="outlined"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 4
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale} >
                    <DatePicker
                      label='Data do ocorrido'
                      mask="__/__/____"
                      value={values.data}
                      onChange={(date) => setFieldValue('data', date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
              {Boolean(touched.data && errors.data) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {errors.data}
                  </FormHelperText>
                </Box>
              )}
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(touched.bairro && errors.bairro)}
                  fullWidth
                  helperText={touched.bairro && errors.bairro}
                  label="Bairro"
                  name="bairro"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bairro}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(touched.rua && errors.rua)}
                  fullWidth
                  helperText={touched.rua && errors.rua}
                  label="Rua"
                  name="rua"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rua}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(touched.problema && errors.problema)}
                  fullWidth
                  helperText={touched.problema && errors.problema}
                  label="Categoria"
                  name="problema"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.problema}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(touched.imagem && errors.imagem)}
                  fullWidth
                  helperText={touched.imagem && errors.imagem}
                  label="Imagem"
                  name="imagem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.imagem}
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: 6
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  Enviar reclamação
                </Button>
              </Box>
            </Box>
            <Box>
              {falha &&
                <Typography
                  color='error'
                >
                  {error}
                </Typography>}
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

CriarReclamacao.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func
};

export default CriarReclamacao;
