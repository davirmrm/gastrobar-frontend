import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Alert, IcoLogo, validacaoForm } from '../../components'
import './login.scss'
import { history } from '../../helpers'
import { recuperarSenha } from '../../layout/redux/layoutActions'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const [inputState, setInputState] = useState({ email: '' })
  const [erro, setErro] = useState({})
  
  const formRequired = {
    email: 'email'
  }

  const hanldeChange = (e, v) => {
    setErro({...erro, [v.name]: v.message})
    setInputState({ ...inputState, [e.name]: e.value })
  }

  const hanldeEnviar = e => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida)
    if (!valid.length) {
      dispatch(recuperarSenha(inputState))
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
          <h3 className='titulo'>Recuperação de senha</h3>
          <p>Informe seu e-mail de acesso para receber um link de redefinição de senha.</p>
          <Input label='E-mail' name='email' 
            action={(e, ef) => hanldeChange(e, ef)}
            value={inputState.email} 
            required={{
              pattern: formRequired.email,
              erro: erro,
              message: nls.mensagem[`obrigatorio${erro.email && erro.email !== 'vazio' ?`Email${erro.email}`:''}`]
            }}
          />
          <div className='box-btn-login'>
            <Button color='primary' size='block' onClick={() => hanldeEnviar(inputState)}>
              Enviar
            </Button>
          </div>      
          <div className='box-btn-login'>
            <Button color='primary' type='link' onClick={() => history.goBack()}>
              Voltar
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
