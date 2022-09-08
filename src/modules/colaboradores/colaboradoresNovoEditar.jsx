import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, IcoClose, IcoEye, IcoEyeBlocked, IcoSearch, Input, Modal, Select, validacaoForm, validarCampo } from '../../components'
import { listarProviders } from '../empresas/redux/empresasActions'
import { listarPerfis } from '../perfis/redux/perfisActions'
import { listarPlataformas } from '../plataformas/redux/plataformasActions'
// import { listarPerfis } from '../perfis/redux/perfisActions'
import { modalFechar, editarUsuarios, salvarUsuarios, changeInformacao } from './redux/colaboradoresActions'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, usuario, usuarios} = useSelector(state => state.colaboradoresState)
  const {providers} = useSelector(state => state.empresasState)
  const {plataformas} = useSelector(state => state.plataformasState)
  const {perfis} = useSelector(state => state.perfisState)
  const [erro, setErro] = useState({})
  const [plataformasList, setplataformasList] = useState([])
  const [perfilList, setperfilList] = useState({})

  useEffect(() => {
    dispatch([
      listarProviders(),
      listarPlataformas(),
      listarPerfis()
    ])
  }, [])  
  
  const listarPlataformas = e => {
    if (usuario.company?.id) {
      // const list = providers.filter(provider=> {
      //   return provider.contracts.filter(contract=> {
      //     contract.company_id === usuario.company?.id
      //   })
      // }) 
      const list = plataformas.filter(plataform=> {
        return providers.filter(provider=> {
          return provider.contracts.filter(contract=> {
            contract.company_id === usuario.company?.id
          })
        })
      })
      setplataformasList(list)
    }
  }

  const listarPerfis = e => {
    if (usuario.profiles?.length) {
      usuario.profiles.map(profile=>{
        let list = perfis.filter(f=> f.platform?.id === profile.platform.id)
        list = perfis.map(f=> ({...f, profile_name: f.name}))
        setperfilList({...perfilList, [profile.platform.id]: list})
      })
    } 
  }

  useEffect(()=>{
    listarPlataformas()
    listarPerfis()
  },[usuario])
  
  useEffect(()=>{
    setErro({})
  },[modalStatus])

  const formRequired = {
    name: '',
    email: 'email',
    company: 'select',
    profiles: 'select'
  }
  
  const hanldeChange = (e, v) => {
    if (e.type === 'select' && formRequired[e.name] !== undefined) {
      const val = validarCampo(e)
      setErro({...erro, [val.name]: val.message})
    }
    if (e.type !== 'select' && formRequired[v.name] !== undefined) {
      setErro({...erro, [e.name]: v.message})
    }
    dispatch(changeInformacao(e))
  }

  const hanldeSalvar = (e) => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida)
    if (!valid.length) {
      if (modalStatus === 'novo') {
        dispatch(salvarUsuarios(usuario))
      } else {
        dispatch(editarUsuarios(usuario))
      }
    }
  }

  return (
    <Modal
      title={modalStatus === 'novo' ? 'Novo colaborador' : 'Editar colaborador'}
      open={modalStatus === 'editar' || modalStatus === 'novo' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Descartar'
      size='large'
      actions={
        <>
          <Button
            color='success'
            onClick={() => hanldeSalvar(usuario) }
          >
            {modalStatus === 'novo' ? 'Adicionar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <section className='modal-usuarios'>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Informações</h6>
            <Checkbox
              label=''
              type='switch'
              name='is_active'
              action={(e, ef) => dispatch(changeInformacao(ef))}
              checked={usuario.is_active}
              text={usuario.is_active ? 'Ativo' : 'Inativo'}
              cy='formUsuarioIsActive'
            />
          </div>
          <div className='row'>
            <div className='col-6'>
              <Input label='Nome' name='name' 
                action={(e, ef) => hanldeChange(e, ef)}
                value={usuario.name} 
                cy='formUsuarioNome'
                required={{
                  pattern: formRequired.name,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              />
            </div>
            <div className='col-6'>
              <Input label='E-mail' name='email' 
                action={(e, ef) => hanldeChange(e, ef)}
                value={usuario.email} 
                cy='formUsuarioEmail'
                required={{
                  pattern: formRequired.name,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              />
            </div>
          </div>
          {
            modalStatus === 'editar'?
            <div className='row'>
              <div className='col-12'>
                <div className='box-btn'>
                  <Button color='primary' size='small'
                    onClick={e => null}>
                      Resetar senha
                  </Button>
                </div>
              </div>
            </div>
            :null
          }
          {/* <div className='row'>
            <div className='col-6'>
              <Input
                label='Nova senha'
                type={senha[0] ? 'password' : 'text'}
                name='senha'
                action={e => dispatch(changeInformacao(e))}
                value={usuario.senha}
                cy='formUsuarioStatus'
                right={
                <Button type='link' onClick={e => setSenha([!senha[0], senha[1]])} title={senha[0] ? 'Visible' : 'Unvisible'}>
                  {senha[0] ? <IcoEye /> : <IcoEyeBlocked />}
                </Button>
                }
              />
            </div>
            <div className='col-6'>
              <Input
                label='Confirmar senha'
                type={senha[1] ? 'password' : 'text'}
                name='senhaConfirm'
                action={e => dispatch(changeInformacao(e))}
                value={usuario.senhaConfirm}
                cy='formUsuarioStatus'
                right={
                <Button type='link' onClick={e => setSenha([senha[0], !senha[1]])} title={senha[1] ? 'Visible' : 'Unvisible'}>
                  {senha[1] ? <IcoEye /> : <IcoEyeBlocked />}
                </Button>
                }
              />
            </div>
          </div> */}
        </div>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Segurança</h6>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Select
                label='Empresa'
                name='company'
                action={(e) => {
                  hanldeChange(e)
                  hanldeChange({name: 'profiles', value: []}, {})
                  listarPlataformas()
                }}
                options={providers}
                selected={usuario.company?usuario.company:''}
                cy='formUsuarioProviders'
                // filter={{
                //   clean: <IcoClose />,
                //   text: <IcoSearch />,
                //   title: 'Filtrar'
                // }}
                required={{
                  pattern: formRequired.company,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              ></Select>
            </div>
            {
              usuario.company?.id && plataformasList ?
              <div className='col-6'>
                <Select
                  label='Plataforma'
                  name='profiles'
                  action={(e, ef) => {
                    const value = e.value.map(v=> {return {...v, platform: {id: v.id, name: v.name}, profile_id: '', profile_name: '' }})
                    hanldeChange(e.value.length? {...e, value }: e)
                    listarPerfis()
                  }}
                  options={plataformasList}
                  selected={usuario.profiles?.length?usuario.profiles.map(e=> {
                    return ({...e.platform})
                  }):[]}
                  closeOnSelect={false}
                  // optionValue='platform_id'
                  multiSelect
                  cy='formUsuarioPlataformas'
                  required={{
                    pattern: formRequired.profiles,
                    erro: erro,
                    message: nls.mensagem[`obrigatorio`]
                  }}
                  // filter={{
                  //   clean: <IcoClose />,
                  //   text: <IcoSearch />,
                  //   title: 'Filtrar'
                  // }}
                ></Select>
              </div>
              :null
            }
          </div>
          <div className='row'>
            {
              usuario.profiles?.map((e, i)=>{
                // const perfisList= perfis.filter(f=> f.platform?.id === e.id)
                return (<div key={`perfil-${e.platform.name}-${e.platform.id}-${i}`} className='col-6'>
                  <Select
                    label={`Perfil ${e.platform.name}`}
                    name={`perfil-${e.platform.id}`}
                    action={(ef) =>{ 
                       hanldeChange({name: 'profiles', value: usuario.profiles.map(p=> p.id === e.id ? {...p, profile_id: ef.value.profile_id, name: ef.value.name, } : p)}, ef)
                    }}
                    options={perfilList[e.platform.id]}
                    selected={e.profile_id && e.name?{profile_id: e.profile_id, name: e.name}:''}
                    // optionLabel='profile_name'
                    optionValue='profile_id'
                    cy={`formUsuarioPerfil${e.id}`}
                    // filter={{
                    //   clean: <IcoClose />,
                    //   text: <IcoSearch />,
                    //   title: 'Filtrar'
                    // }}
                  ></Select>
                </div>)
              })
            }
          </div>
        </div>
      </section>
    </Modal>
  )
}
