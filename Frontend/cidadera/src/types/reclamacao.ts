export interface Comentarios {
  data: string;
  mensagem: string;
  usuario: string;
}

export interface Reclamacao {
  titulo:string;
  descricao: string;
  usuario: string;
  endereco:any;
  _id: string;
  status: string;
  categoria: string;
  imagem?: string;
  comentarios: Comentarios[];
  data: string;
}

