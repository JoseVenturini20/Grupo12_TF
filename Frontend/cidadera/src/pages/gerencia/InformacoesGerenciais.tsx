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
 const [totalReclamacoesBairro,setTotalReclamacoesBairro] = useState({});
 const [totalReclamacoesCategoria,setTotalReclamacoesCategoria] = useState({});

 const [mediaComentariosCategoria,setMediaComentariosCategoria] = useState({});
 const [mediaComentariosBairro,setMediaComentariosBairro] = useState({});

 const [reclamacoesBairroResolvida,setReclamacoesBairroResolvida] = useState({});
 const [reclamacoesBairroEncerrada,setReclamacoesBairroEncerrada] = useState({});
 const [reclamacoesCategoriaResolvida,setReclamacoesCategoriaResolvida] = useState({});
 const [reclamacoesCategoriaEncerrada,setReclamacoesCategoriaEncerrada] = useState({});

 const [reclamacaoRespondidaOficial,setReclamacaoRespondidaOficial] = useState({});
 const [reclamacaoEncerradaOficial,setReclamacaoEncerradaOficial] = useState({});
 
 useEffect(() => {
  gtm.push({ event: 'page_view' });
 }, []);

 const object1 = {
  a: 'somestring',
  b: 42,
  c: 52,
  d: 10,
  h: 11
 };


 const object2 = {
  a: 'somestring',
  b: 42
 };

 function formatarValorPercentual(valor){
  if(valor === 0){
   return '0%'
  }else{
   return valor.toFixed(2)+'%'
  }
 }

 const getPosts = useCallback(async () => {
  try {
   const response = await axios.get('http://localhost:8080/reclamacao/buscar');
   setTotalReclamacoesBairro({})
   setTotalReclamacoesCategoria({})

   setMediaComentariosCategoria({})
   setMediaComentariosBairro({})
  
  setReclamacoesBairroResolvida({})
  setReclamacoesBairroEncerrada({})
  setReclamacoesCategoriaResolvida({})
  setReclamacoesCategoriaEncerrada({})
  
  setReclamacaoRespondidaOficial({})
  setReclamacaoEncerradaOficial({})
  } catch (err) {
   console.error(err);
  }
 }, []);

 useEffect(() => {
  getPosts();
 }, [getPosts]);

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
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val} />
        </Grid>
       </React.Fragment>
      )}
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
         Total de reclamações por categoria
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val} />
        </Grid>
       </React.Fragment>
      )}
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
         Média de comentários por categoria
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object2).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val} />
        </Grid>
       </React.Fragment>
      )}
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
         Média de comentários por bairro
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object2).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações por bairro com status resolvido
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações por bairro com status encerrado
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações por categoria com status encerrado
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações por categoria com status resolvido
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações respondidas por órgãos oficiais
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
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
         Reclamações encerradas por órgãos oficiais
        </Typography>
       </Box>
      </Grid>
      {Object.entries(object1).map(([key, val]) =>
       <React.Fragment>
        <Grid
         item
         lg={3}
         sm={6}
         xs={12}
        >
         <CardInformacoes loading={true} informacao={key} valor={val + "%"} />
        </Grid>
       </React.Fragment>
      )}
     </Grid>
    </Grid>
   </Box>
  </>
 );
};

export default InformacoesGerenciais;
