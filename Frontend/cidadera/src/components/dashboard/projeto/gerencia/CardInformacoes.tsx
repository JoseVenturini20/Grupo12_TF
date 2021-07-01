import { FC } from 'react';
import {
 Box,
 Card,
 Grid,
 Skeleton,
 Typography
} from '@material-ui/core';

interface infoGerencia {
 informacao?: string;
 valor?: any;
 loading: Boolean;
}

const CardInformacoes: FC<infoGerencia> = ({ informacao, valor, loading }) => {
 return (
  <Grid
  >
   <Grid
   >
    <Card sx={{
     boxShadow: '0px 5px 6px rgb(0 0 0 / 30%), 0px 0px 0px 1px rgb(0 0 0 / 30%)',
     textAlign: 'left'
    }}>
     <Box
      sx={{
       alignItems: 'center',
       display: 'flex',
       justifyContent: 'space-between',
       p: 3
      }}
     >
      <div>
       <Typography
        color="textSecondary"
        variant="subtitle2"
       > {loading ?
        (informacao) :
        (<Skeleton width="200%"></Skeleton>)}
       </Typography>
       {loading ?
        (<Typography
         color="textSecondary"
         sx={{ mt: 1 }}
         variant="h6"
        >{valor}</Typography>) :
        (<Skeleton width="200%"><Typography
         color="textSecondary"
         sx={{ mt: 1 }}
         variant="h6"
        >..........</Typography></Skeleton>)}
      </div>
     </Box>
    </Card>
   </Grid>
  </Grid>
 );
};

export default CardInformacoes;
