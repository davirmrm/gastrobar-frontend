import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, IcoEye, IcoEyeBlocked, Button, Alert, IcoLogo, validacaoForm } from '../../components'
import './login.scss'
import { history } from '../../helpers'
import { logIn } from '../../layout/redux/layoutActions'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const [inputState, setInputState] = useState({ email: '', password: '' })
  const [senha, setSenha] = useState(false)
  const [erro, setErro] = useState({})

  useEffect(()=>{
    if (sessionStorage.token) {
      history.push(`/home`)
    }
  }, [])

  const formRequired = {
    email: 'email',
    password: ''
  }

  const hanldeChange = (e, v) => {
    setErro({...erro, [v.name]: v.message})
    setInputState({ ...inputState, [e.name]: e.value })
  }

  const hanldeLogar = (e) => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida)
    if (!valid.length) {
      dispatch(logIn(inputState))
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
          <h3>Seja bem-vindo(a)!</h3>
          <h3>Faça login para continuar</h3>
          <Input label='E-mail' name='email' 
            action={(e, ef) => hanldeChange(e, ef)} 
            value={inputState.email} 
            required={{
              pattern: formRequired.email,
              erro: erro,
              message: nls.mensagem[`obrigatorio${erro.email && erro.email !== 'vazio' ?`Email${erro.email}`:''}`]
            }}
          />
          <Input
            label='Password'
            type={senha ? 'password' : 'text'}
            name='password'
            action={(e, ef) => hanldeChange(e, ef)} 
            value={inputState.password}
            right={
            <Button type='link' onClick={e => setSenha(!senha)} title={senha ? 'Visible' : 'Unvisible'}>
              {senha ? <IcoEye /> : <IcoEyeBlocked />}
            </Button>
            }
            required={{
              pattern: formRequired.password,
              erro: erro,
              message: nls.mensagem[`obrigatorio${erro.password && erro.password !== true ?`${erro.password}`:''}`]
            }}
          />
          <div className='box-btn-login'>
            
            <Button color='primary' size='block' onClick={() => hanldeLogar(inputState)}>
              Entrar
            </Button>
          </div>
          <div className='box-btn-login'>
            <Button color='primary' type='link' onClick={() => history.push('/recuperar')}>
              Esquceu sua senha?
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
