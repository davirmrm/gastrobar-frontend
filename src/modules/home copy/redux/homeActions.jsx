import { AddAlert } from '../../../components'
import api from '../../../helpers/api'

export const LISTAR_MEUS_PRODUTOS = 'LISTAR_MEUS_PRODUTOS'
export const setListarMeusProdutos = e => ({
  type: LISTAR_MEUS_PRODUTOS,
  payload: e
})

export const listarMeusProdutos = e => {
  let params = `?`
  if (e?.params) {
    Object.keys(e.params).map((par)=> {
      params = `${params === '?' ? params : params + '&'}${par}=${e.params[par]}`
    })
  }
  return dispatch => {
    api.get(`/meusProdutos/listar${params}`)
    .then(resposta => {
      dispatch(setListarMeusProdutos(resposta.data))
    })
    .catch(error => {
      console.log(error, 'erro listarMeusProdutos');
    })
  }
}