import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Alert, IcoEye, IcoEyeBlocked, IcoLogo, validacaoForm } from '../../components'
import './login.scss'
import { recuperarSenhaMudar } from '../../layout/redux/layoutActions'
import nls from './nls/pt-BR.json'
import { useParams } from 'react-router-dom'

export default () => {
  const dispatch = useDispatch()
  const { idUser } = useParams()
  const [inputState, setInputState] = useState({ password: '', passwordConfirm: '' })
  const [senha, setSenha] = useState([false, false])
  const [erro, setErro] = useState({})
  const formRequired = {
    password: '',
    passwordConfirm: '',
  }

  const hanldeChange = e => {
    hanldeValidate(e)
    setInputState({ ...inputState, [e.name]: e.value })
  }

  const hanldeValidate = e => {
    if (e.name === 'password') {
      if (e.value === '') {
        setErro({...erro, [e.name]: true})
      } else if (e.value?.length <= 6) {
        setErro({...erro, [e.name]: 'Min'})
      } else {
        setErro({...erro, [e.name]: false})
      }
    }
    if (e.name === 'passwordConfirm') {
      if (e.value === '') {
        setErro({...erro, [e.name]: true})
      } else if (e.value?.length <= 6) {
        setErro({...erro, [e.name]: 'Min'})
      } else if (e.value !== inputState.password) {
        setErro({...erro, [e.name]: 'Diferente'})
      } else {
        setErro({...erro, [e.name]: false})
      }
    }
  }

  const hanldeRecuperar = e => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    if (!valid.length) {
      dispatch(recuperarSenhaMudar({...e, idUser}))
    } else{
      setErro({ password: true, passwordConfirm: true })
    }
  }

  return (
    <div className='box-login'>
      <Alert />
      <div className='box-login-form'>
        <section>
          <div className='box-login-logo'>
            <div><IcoLogo /></div> <h1>PAINEL ADM</h1>
          </div>
          <h3 className='titulo'>Alterar a senha</h3>
          <p>Escolha uma nova senha para acessar o sistema.</p>
          <Input
            label='Nova senha'
            type={!senha[0] ? 'password' : 'text'}
            name='password'
            action={e => hanldeChange(e)}
            value={inputState.password}
            right={
            <Button type='link' onClick={e => setSenha([!senha[0], senha[1]])} title={!senha[0] ? 'Visible' : 'Unvisible'}>
              {!senha[0] ? <IcoEye /> : <IcoEyeBlocked />}
            </Button>
            }
            required={{
              pattern: '',
              erro: erro,
              message: nls.mensagem[`obrigatorio${erro.password && erro.password !== true ?`${erro.password}`:''}`]
            }}
          />
          <Input
            label='Confirme a senha'
            type={!senha[1] ? 'password' : 'text'}
            name='passwordConfirm'
            action={e => hanldeChange(e)}
            value={inputState.passwordConfirm}
            right={
            <Button type='link' onClick={e => setSenha([senha[0], !senha[1]])} title={!senha[1] ? 'Visible' : 'Unvisible'}>
              {!senha[1] ? <IcoEye /> : <IcoEyeBlocked />}
            </Button>
            }
            required={{
              pattern: '',
              erro: erro,
              message: nls.mensagem[`obrigatorio${erro.passwordConfirm && erro.passwordConfirm !== true ?`${erro.passwordConfirm}`:''}`]
            }}
          />
          <div className='box-btn-login'>
            <Button color='primary' size='block' onClick={() => hanldeRecuperar(inputState)}>
              Trocar a senha
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
