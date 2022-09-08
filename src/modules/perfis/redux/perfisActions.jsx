import { AddAlert } from '../../../components'
import api from '../../../helpers/api'
import nls from '../nls/pt-BR.json'

const atualizaCampoPesquisa = e => ({
  type: 'CHANGE_PESQUISA_PERFIS',
  payload: e
})

export const handleCampoPesquisa = e => [
  atualizaCampoPesquisa(e.value)
]
export const campoPesquisaLimpar = e => [
  atualizaCampoPesquisa(''), 
  pesquisarPerfis()
]

const modalOpen = e => ({
  type: 'MODAL_OPEN',
  payload: e
})

const modalClose = () => ({
  type: 'MODAL_OPEN',
  payload: ''
})

export const setCarregarperfil = e => ({
  type: 'PERFIS_CARREGAR',
  payload: e
})

export const setPerfisLimpar = () => ({
  type: 'PERFIS_LIMPAR'
})
export const modalNovo = () => [modalOpen('novo'), setPerfisLimpar()]
export const modalEditar = e => [modalOpen('editar'), setCarregarperfil(e)]
export const modalRemover = e => [modalOpen('remover'), setCarregarperfil(e)]
export const modalFechar = e => [modalClose()]

export const changeInformacao = e => ({
  type: 'CHANGE_PERFIS',
  payload: e
})

export const setListarPerfis = e => ({
  type: 'LISTAR_PERFIS',
  payload: e
})

export const setListarModulosPerfis = e => ({
  type: 'LISTAR_MODULOS_PERFIS',
  payload: e
})

export const setListarModulosRulesPerfis = e => ({
  type: 'LISTAR_MODULOS_RULES_PERFIS',
  payload: e
})

export const listarPerfis = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/profiles`)
    .then(resposta => {
      dispatch(setListarPerfis(resposta.data))
    })
    .catch(error => {
      console.warn(error, 'error listarPerfis');
    })
  }
}

export const listarModulosPerfis = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/modules`)
    .then(resposta => {
      dispatch(setListarModulosPerfis(resposta.data))
    })
    .catch(error => {
      console.log(error, 'error listarModulosPerfis');
    })
  }
}

export const listarModulosRulesPerfis = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/rules`)
    .then(resposta => {
      dispatch(setListarModulosRulesPerfis(resposta.data))
    })
    .catch(error => {
      console.log(error, 'error listarModulosRulesPerfis');
    })
  }
}

export const salvarPerfis = e => {
  e.platform_id = e.platform?.id
  e.rule_ids = e.rules?.map(r=> (r.id))
  let params = {
    is_active: '',
    name: '',  
    platform_id: '',
    rule_ids: []
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })

  params.platform_id = e.platform?.id ? e.platform?.id : ''
  params.rule_ids = e.rules?.map(r=> (r.id))
  return dispatch => {
    api.post(`/developer/platform/manager/profiles`, params)
    .then((resposta) => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Perfis salvo com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'salvarPerfis error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.code} | ${error.message}`))
      }
    })
  }
}

export const editarPerfis = e => {
  e.platform_id = e.platform?.id
  e.rule_ids = e.rules?.map(r=> (r.id))
  let params = {
    is_active: '',
    name: '',  
    profile_id: '',
    platform_id: '',
    rule_ids: []
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })

  params.platform_id = e.platform?.id?e.platform?.id:e.platform_id
  params.rule_ids = e.rules?.map(r=> (r.id))
  return dispatch => {
    api.put(`/developer/platform/manager/profiles`, params)
    .then(resposta => {
      dispatch([modalFechar(), AddAlert('success', 'Perfis editado com sucesso.')])
    })
    .catch(error => {
      console.log(error, 'editarPerfis erro')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const removerPerfis = e => {
  return dispatch => {
    api
      .get(`/colaboradores/remover/${e['_id']}`)
      .then(resposta => {
        dispatch([modalFechar(), AddAlert('success', 'Perfis removido com sucesso.')])
      })
      .catch(error => {
        dispatch(AddAlert('error', nls.mensagem[error.request.response]))
      })
  }
}
