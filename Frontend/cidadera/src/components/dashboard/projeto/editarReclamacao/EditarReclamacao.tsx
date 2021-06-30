import { FC, useState } from 'react';
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
import type { Comentarios } from '../../../../types/reclamacao';

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

const CriarReclamacao: FC<ReclamacoesGeraisProps> = (props) => {
  const {
    titulo,
    descricao,
    usuario,
    endereco,
    id,
    categoria,
    imagem,
    status
  } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [falha, setFalha] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [encerrada,setEncerrada] = useState(false);


  function verificaStatus(status){
    if(status === 'Encerrada'){
      return true
    }
    return false
  }



  return (
    <Formik
      initialValues={{
        titulo: titulo,
        descricao: descricao,
        data: new Date(),
        bairro: endereco.bairro,
        rua: endereco.rua,
        problema: categoria,
        imagem: imagem
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
          console.log(values)

          setLoading(true)
          await axios.patch('http://localhost:8080/reclamacao/editar', {
            reclamacao:{
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
            },
            id:id
          })
          setStatus({ success: true });
          setSubmitting(true);

          //setLoading(false)
          enqueueSnackbar('Reclamação Editada com sucesso', {
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
          setError('Ocorreu um erro ao editar sua reclamacão')
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
                disabled={verificaStatus(status)}
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
                  disabled={verificaStatus(status)}
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
                      disabled={verificaStatus(status)}
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
                  disabled={verificaStatus(status)}
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
                  disabled={verificaStatus(status)}
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
                  disabled={verificaStatus(status)}
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
                  disabled={verificaStatus(status)}
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
                  disabled={loading||verificaStatus(status)}
                >
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  Atualizar
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

export default CriarReclamacao;
