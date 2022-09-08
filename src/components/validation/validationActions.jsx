import { validacaoDosCampos, validacaoDoCampo } from './Validation';

export const VALIDAR_CAMPO = 'VALIDAR_CAMPO';
export const VALIDAR_CAMPOS = 'VALIDAR_CAMPOS';
export const RESETAR_VALIDACAO = 'RESETAR_VALIDACAO';

export const validarCampoAction = e => ({
  type: VALIDAR_CAMPO,
  payload: validacaoDoCampo(e),
});

export const validarCamposAction = e => ({
  type: VALIDAR_CAMPOS,
  payload: validacaoDosCampos(e),
});

export const resetarCamposAction = () => ({
  type: RESETAR_VALIDACAO,
});

export const validarAction = e => {
  let erro = false;
  for (const name in e.payload) {
    if (e.payload[name]) {
      erro = true;
    }
  }
  return erro;
};
