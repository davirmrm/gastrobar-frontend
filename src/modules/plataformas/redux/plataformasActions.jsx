import { AddAlert } from '../../../components'
import api from '../../../helpers/api'
import nls from '../nls/pt-BR.json'

const atualizaCampoPesquisa = e => ({
  type: 'CHANGE_PESQUISA_PLATAFORMAS',
  payload: e
})

export const handleCampoPesquisa = e => [
  atualizaCampoPesquisa(e.value)
]
export const campoPesquisaLimpar = e => [
  atualizaCampoPesquisa(''), 
  pesquisarPlataformas()
]

const modalOpen = e => ({
  type: 'MODAL_OPEN',
  payload: e
})

const modalClose = () => ({
  type: 'MODAL_OPEN',
  payload: ''
})

export const setCarregarPlataforma = e => ({
  type: 'PLATAFORMAS_CARREGAR',
  payload: e
})

export const setPlataformasLimpar = () => ({
  type: 'PLATAFORMAS_LIMPAR'
})

export const modalNovo = () => [modalOpen('novo'), setPlataformasLimpar()]
export const modalEditar = e => [modalOpen('editar'), setCarregarPlataforma(e)]
export const modalRemover = e => [modalOpen('remover'), setCarregarPlataforma(e)]
export const modalFechar = e => [modalClose()]

export const changeInformacao = e => ({
  type: 'CHANGE_PLATAFORMAS',
  payload: e
})

export const setListarPlataformas = e => ({
  type: 'LISTAR_PLATAFORMAS',
  payload: e
})

export const listarPlataformas = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/platforms`)
    .then(resposta => {
      dispatch(setListarPlataformas(resposta.data))
    })
    .catch(error => {
      console.log(error, 'erro listarPlataformas');
    })
  }
}

export const pesquisarPlataformas = e => {
  return dispatch => {
    api
      .get(`/colaboradores/pesquisar/${e}`)
      .then(resposta => {
        dispatch(setListarPlataformas(resposta.data))
      })
      .catch(error => {
        dispatch(AddAlert('error', nls.mensagem[error.request.response]))
      })
  }
}

export const salvarPlataformas = e => {
  return dispatch => {
    api.post(`/developer/platform/manager/platforms`, e)
    .then(resposta => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Plataforma salva com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'salvarPlataformas error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const editarPlataformas = e => {
  let params = {
    id: '',
    description: '',
    name: '',
    is_active: '',
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })
  return dispatch => {
    api.put(`/developer/platform/manager/platforms`, params)
    .then(resposta => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Plataformas editado com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'editarPlataformas error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const removerPlataformas = e => {
  return dispatch => {
    api
      .get(`/colaboradores/remover/${e['_id']}`)
      .then(resposta => {
        dispatch([modalFechar(), AddAlert('success', 'Plataformas removido com sucesso.')])
      })
      .catch(error => {
        dispatch(AddAlert('error', nls.mensagem[error.request.response]))
      })
  }
}
