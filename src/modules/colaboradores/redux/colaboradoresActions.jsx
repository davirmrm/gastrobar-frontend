import { AddAlert } from '../../../components'
import api from '../../../helpers/api'
import textoDefault from '../nls/pt-BR.json'

const atualizaCampoPesquisa = e => ({
  type: 'CHANGE_PESQUISA_COLABORADORES',
  payload: e
})

export const handleCampoPesquisa = e => [atualizaCampoPesquisa(e.value)]
export const campoPesquisaLimpar = e => [atualizaCampoPesquisa('')]

const modalOpen = e => ({
  type: 'MODAL_OPEN',
  payload: e
})

const modalClose = () => ({
  type: 'MODAL_OPEN',
  payload: ''
})

export const setCarregarUsuario = e => ({
  type: 'USUARIOS_CARREGAR',
  payload: e
})

export const setUsuariosLimpar = () => ({
  type: 'USUARIOS_LIMPAR'
})

export const changeInformacaoFilter = e => ({
  type: 'CHANGE_FILTER',
  payload: e
})

export const modalNovo = () => [modalOpen('novo'), setUsuariosLimpar()]
export const modalEditar = e => [modalOpen('editar'), setCarregarUsuario(e)]
export const modalRemover = e => [modalOpen('remover'), setCarregarUsuario(e)]
export const modalFechar = e => [modalClose()]

export const changeInformacao = e => ({
  type: 'CHANGE_USUARIOS',
  payload: e
})

export const setListarColaboradores = e => ({
  type: 'LISTAR_USUARIOS',
  payload: e
})

export const listarColaboradores = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/collaborators`)
    .then(resposta => {
      dispatch(setListarColaboradores(resposta.data))
    })
    .catch(error => {
      console.log(error, 'error listarColaboradores');
    })
  }
}

export const pesquisarUsuarios = e => {
  return dispatch => {
    api
      .get(`/colaboradores/pesquisar/${e}`)
      .then(resposta => {
        dispatch(setListarColaboradores(resposta.data))
      })
      .catch(error => {
        dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
      })
  }
}

export const salvarUsuarios = e => {
  let params = {
    name: '',
    email: '',
    company_id: '',
    is_active: '',
    profile_ids: []
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })

  params.profile_ids = e.profiles.map(profile=> (profile.profile_id))
  params.company_id = e.company.id
  params.password = 'eemovel*'
  return dispatch => {
    api.post(`/developer/platform/manager/collaborators`, params)
    .then(() => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Usuarios salvo com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'salvarUsuarios error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const editarUsuarios = e => {
  let params = {
    id: '',
    is_active: '',
    name: '',
    email: '',
    company_id: '',
    profile_ids: []
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })

  params.profile_ids = e.profiles?.map(profile=> (profile.profile_id))
  params.company_id = e.company?.id
  return dispatch => {
    api.put(`/developer/platform/manager/collaborators`, params)
    .then(resposta => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Usuarios editado com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'editarUsuarios error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const removerUsuarios = e => {
  return dispatch => {
    api
      .get(`/colaboradores/remover/${e['_id']}`)
      .then(resposta => {
        dispatch([modalFechar(), AddAlert('success', 'Usuarios removido com sucesso.')])
      })
      .catch(error => {
        dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
      })
  }
}
