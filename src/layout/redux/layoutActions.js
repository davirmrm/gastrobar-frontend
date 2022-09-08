import { AddAlert } from "../../components"
import api from '../../helpers/api'
// import jwt from 'jsonwebtoken';
import {history} from "../../helpers"
const nls = '../nls/pt-BR.json'

export const loading = e => ({
  type: 'LOADING',
  payload: true
})
export const loaded = e => ({
  type: 'LOADING',
  payload: false
})

export const setSidebarLeft = e => ({
  type: 'SIDEBAR_LEFT',
  payload: e
})

export const setSidebarRigth = e => ({
  type: 'SIDEBAR_RIGHT',
  payload: e
})

export const modalOpen = e => ({
  type: 'MODAL_OPEN',
  payload: e
})

export const validacaoCampos = e => ({
  type: 'VALIDACAO',
  payload: e
})

export const setCarregarUsuarioLogad = e => ({
  type: 'USUARIO_LOGADO_CARREGAR',
  payload: e
})


export const setPreferenciasUsuarioLogad = e => ({
  type: 'USUARIO_LOGADO_PREFERENCIAS',
  payload: e
})

export const changePreferencias = e => {
  const idUsuario = sessionStorage.token
  const usuario = JSON.parse(sessionStorage.user)
  const params = {[e.target.name]: e.target.value}
  return dispatch => {
    api.put(`/usuario/preferencias/${idUsuario}`, params)
    .then(response => {
      sessionStorage.setItem('user', JSON.stringify({...usuario, preferencias: {...usuario.preferencias,...response.data}}))
      dispatch(setPreferenciasUsuarioLogad(response.data))
    })
    .catch(error => {
      console.log(error, 'erro changePreferencias');
    })
  }
}

const setLogIn = e => ({
  type: 'LOG_IN',
  payload: e
})

// api.post(`/developer/auth/public/sign-in`, e)
// .then(response => {
//   sessionStorage.setItem('AccessToken', response.data.data.AccessToken)
//   sessionStorage.setItem('ExpiresIn', response.data.data.ExpiresIn)
//   sessionStorage.setItem('IdToken', response.data.data.IdToken)
//   sessionStorage.setItem('RefreshToken', response.data.data.RefreshToken)
//   sessionStorage.setItem('TokenType', response.data.data.TokenType)
//   sessionStorage.setItem('token', response.data.data.AccessToken)
  
//   const userInformation = jwt.decode(response.data.data.IdToken);
export const logIn = e => {
  return dispatch => {
    dispatch(loading())
    api.post(`/developer/platform/manager/public/sign-in`, e)
      .then(response => {
        const userInformation = response.data.data.logged_user///jwt.decode(response.data.data.IdToken);
        sessionStorage.setItem('user', JSON.stringify(userInformation))
        sessionStorage.setItem('token', response.data.data.AccessToken)
        
        sessionStorage.setItem('AccessToken', response.data.data.AccessToken)
        sessionStorage.setItem('ExpiresIn', response.data.data.ExpiresIn)
        sessionStorage.setItem('IdToken', response.data.data.IdToken)
        sessionStorage.setItem('RefreshToken', response.data.data.RefreshToken)
        sessionStorage.setItem('TokenType', response.data.data.TokenType)
        // sessionStorage.setItem('token', response.data.data.AccessToken)
        // const userInformation = jwt.decode(response.data.data.IdToken);

        dispatch([
          setLogIn(true), 
          setCarregarUsuarioLogad(userInformation), 
        ])
        history.push('/colaboradores')
      })
      .catch(error => {
        console.log(error, 'logIn error');
        // dispatch([setLogIn(false), AddAlert('error', nls.mensagem[error.request.response])])
      }).finally(e=> {
        dispatch(loaded())
      })
  }
}

export const loged = e => {
  return dispatch => {
    if (sessionStorage.token) {
      // api.get(`/${sessionStorage.token}`)
      // .then(response => {
      //   sessionStorage.setItem('user', JSON.stringify(response.data))
      //   dispatch([
      //     setLogIn(true), 
      //     setCarregarUsuarioLogad(response.data),
      //     dispatch(setPreferenciasUsuarioLogad(response.data.preferencias)),
      //   ])
      // })
      // .catch(error => {
      //   dispatch([setLogIn(false)])
      // })
    } else {
      dispatch([setLogIn(false)])
    }
  }
}

export const logOut = e => {
  sessionStorage.clear()
  return dispatch => [dispatch([
    setLogIn(false), 
    modalOpen(''),  
    setCarregarUsuarioLogad({}),
    history.push('/')
  ])]
}

const setInfoUser = e => ({
  type: 'INFO_USER',
  payload: e
})

export const infoUser = e => {
  const params = {
  }
  return dispatch => {
      dispatch(setInfoUser(params))
  }
}

export const recuperarSenha = e => {
  return dispatch => {
    dispatch(loading())
    api.post("/developer/auth/public/retrieve-password", e)
    .then((res) => {
      console.log(res);
      dispatch([
        AddAlert('success', "E-mail enviado com sucesso"),
        loaded()
      ])
      history.put(`/`)
    })
    .catch((error) => {
      console.log(error, 'recuperarSenha error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
      dispatch(loaded())

    })
  }
}

export const recuperarSenhaMudar = e => {
  return dispatch => {
    dispatch(loading())
    dispatch(loaded())
    // api.post("/developer/auth/public/retrieve-password", e)
    // .then((res) => {
    //   console.log(res);
    //   dispatch([
    //     AddAlert('success', "Senha alterada com sucesso"),
    //     loaded()
    //   ])
      history.push(`/`)
    // })
    // .catch((error) => {
    //   console.log(error, 'recuperarSenhaMudar error')
    //   if (error.response.data.code) {
    //     dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
    //   } else {
    //     dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
    //   }
      // dispatch(loaded())

    // })
  }
}
