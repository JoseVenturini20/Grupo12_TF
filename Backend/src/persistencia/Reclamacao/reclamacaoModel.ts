import { Reclamacao } from "../../entidades/reclamacao";

import { Model, model, Schema, Document } from "mongoose";

interface ReclamacaoDocument extends Reclamacao, Document {}

export const ReclamacaoModel: Model<ReclamacaoDocument> =
  model<ReclamacaoDocument>(
    "Reclamacao",
    new Schema({
      titulo: {
        type: String,
        required: true,
        minlength: 2
      },
      usuario: {
        type: String,
        required: true,
      },
      descricao: {
        type: String,
        required: true,
      },
      data: {
        type: Date,
        required: true,
      },
      endereco: {
        bairro: {
          type: String,
          required: true,
        },
        rua: {
          type: String,
          required: true,
        },
      },
      status: {
        type: String,
        required: true,
      },
      categoria: {
        type: String,
        required: true,
      },
      imagem: {
        type: String,
        required: true,
      },
      comentarios: {
          type: Array,
          default : []
      },
    }),
    "Reclamacao"
  );
