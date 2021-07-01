import { useEffect, useCallback, useState } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
 Box,
 Grid,
 Typography
} from '@material-ui/core';
import gtm from '../../lib/gtm';
import axios from 'axios';
import CardInformacoes from 'src/components/dashboard/projeto/gerencia/CardInformacoes';
import React from 'react';

const InformacoesGerenciais: FC = () => {
 const [loading, setLoading] = useState(false)

 const [totalReclamacoesBairro, setTotalReclamacoesBairro] = useState({});
 const [totalReclamacoesCategoria, setTotalReclamacoesCategoria] = useState({});

 const [mediaComentariosCategoria, setMediaComentariosCategoria] = useState({});
 const [mediaComentariosBairro, setMediaComentariosBairro] = useState({});

 const [reclamacoesBairroResolvida, setReclamacoesBairroResolvida] = useState({});
 const [reclamacoesBairroEncerrada, setReclamacoesBairroEncerrada] = useState({});
 const [reclamacoesCategoriaResolvida, setReclamacoesCategoriaResolvida] = useState();
 const [reclamacoesCategoriaEncerrada, setReclamacoesCategoriaEncerrada] = useState({});

 const [reclamacaoRespondidaOficial, setReclamacaoRespondidaOficial] = useState({ respondida: 0, encerrada: 0 });

 useEffect(() => {
  gtm.push({ event: 'page_view' });
 }, []);

 function formatarValorPercentual(valor) {

  if (valor === 0 || valor === null) {
   return 0
  } else {
   return valor.toFixed(2)
  }
 }

 const getPosts = useCallback(async () => {
  try {
   setLoading(false)
   const response = await axios.get('http://localhost:8080/reclamacao/informacoesGerenciais');
   console.log(response.data)
   setTotalReclamacoesBairro(response?.data?.totalReclamacao?.bairro)
   setTotalReclamacoesCategoria(response?.data?.totalReclamacao?.categoria)

   setMediaComentariosCategoria(response?.data?.numeroMedioComentario?.categoria)
   setMediaComentariosBairro(response?.data?.numeroMedioComentario?.bairro)

   setReclamacoesBairroResolvida(response?.data?.percentualStatus?.bairro?.resolvida)
   setReclamacoesBairroEncerrada(response?.data?.percentualStatus?.bairro?.encerrada)
   setReclamacoesCategoriaResolvida(response?.data?.percentualStatus?.categoria?.resolvida)
   setReclamacoesCategoriaEncerrada(response?.data?.percentualStatus?.categoria?.encerrada)

   setReclamacaoRespondidaOficial({ respondida: response?.data?.percentualRespondidaOrgaoOficial?.respondida, encerrada: response?.data?.percentualRespondidaOrgaoOficial?.encerrada })

   setLoading(true)
  } catch (err) {
   console.error(err);
  }
 }, []);

 useEffect(() => {
  getPosts();
 }, [getPosts]);


 useEffect(() => {
  console.log('----',Object.keys(reclamacoesBairroResolvida).length!==0)
 }, [reclamacoesBairroResolvida]);

 return (
  <>
   <Helmet>
    <title>Informações Gerenciais</title>
   </Helmet>
   <Box
    sx={{
     backgroundColor: 'background.default',
     minHeight: '100%',
     py: 8,
     m: 3
    }}
   >
    <Grid
     container
     spacing={3}
    >
     <Grid
      alignItems="center"
      container
      spacing={3}
      item
      xs={12}
     >
      <Grid item>
       <Typography
        color="textSecondary"
        variant="overline"
       >
        Informações Gerenciais
       </Typography>
       <Typography
        color="textPrimary"
        variant="h5"
       >
        Informações sobre as reclamações
       </Typography>
      </Grid>

      {loading&&Object.keys(totalReclamacoesBairro).length!==0&&
      <React.Fragment>
       <Grid
        item
        lg={12}
        sm={12}
        xs={12}
       >
        <Box mt={2} mb={2} textAlign='center'>
         <Typography
          color="textSecondary"
          variant="h5"
         >
          Total de reclamações por bairro
         </Typography>
        </Box>
       </Grid>
       {Object.entries(totalReclamacoesBairro).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={val} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(totalReclamacoesCategoria).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Total de reclamações por categoria
        </Typography>
       </Box>
      </Grid>
       {Object.entries(totalReclamacoesCategoria).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={val} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(mediaComentariosCategoria).length!==0&&Object.keys(reclamacoesBairroResolvida).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Média de comentários por categoria
        </Typography>
       </Box>
      </Grid>
       {Object.entries(mediaComentariosCategoria).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val)} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(mediaComentariosBairro).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Média de comentários por bairro
        </Typography>
       </Box>
      </Grid>
       {Object.entries(mediaComentariosBairro).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val)} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(reclamacoesBairroResolvida).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Reclamações por bairro com status resolvido
        </Typography>
       </Box>
      </Grid>
       {Object.entries(reclamacoesBairroResolvida).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val) + '%'} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(reclamacoesBairroEncerrada).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Reclamações por bairro com status encerrado
        </Typography>
       </Box>
      </Grid>
       {Object.entries(reclamacoesBairroEncerrada).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val) + '%'} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(reclamacoesCategoriaEncerrada).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Reclamações por categoria com status encerrado
        </Typography>
       </Box>
      </Grid>
       {Object.entries(reclamacoesCategoriaEncerrada).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val) + '%'} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(reclamacoesCategoriaResolvida).length!==0&&<React.Fragment><Grid
       item
       lg={12}
       sm={12}
       xs={12}
      >
       <Box mt={2} mb={2} textAlign='center'>
        <Typography
         color="textSecondary"
         variant="h5"
        >
         Reclamações por categoria com status resolvido
        </Typography>
       </Box>
      </Grid>
       {Object.entries(reclamacoesCategoriaResolvida).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val) + '%'} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
      {loading&&Object.keys(reclamacaoRespondidaOficial).length!==0&&<React.Fragment>
       <Grid
        item
        lg={12}
        sm={12}
        xs={12}
       >
        <Box mt={2} mb={2} textAlign='center'>
         <Typography
          color="textSecondary"
          variant="h5"
         >
          Reclamações respondidas e comentadas por órgãos oficiais
         </Typography>
        </Box>
       </Grid>
       {Object.entries(reclamacaoRespondidaOficial).map(([key, val]) =>
        <React.Fragment>
         <Grid
          item
          lg={3}
          sm={6}
          xs={12}
         >
          <CardInformacoes loading={loading} informacao={key} valor={formatarValorPercentual(val) + '%'} />
         </Grid>
        </React.Fragment>
       )}</React.Fragment>}
     </Grid>
    </Grid>
   </Box>
  </>
 );
};

export default InformacoesGerenciais;
