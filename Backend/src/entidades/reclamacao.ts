import { Comentario } from './comentario';

export interface Reclamacao {
    titulo: String, 
    descricao: String, 
    data:  Date, 
    usuario: String,
    endereco: {
        bairro: String,
        rua: String
    },
    status: String,
    categoria: String,
    imagem?: String,
    comentarios?: [Comentario ]
}