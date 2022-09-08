import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from '../../components'
import { modalFechar, removerPerfis } from './redux/perfisActions'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, perfil} = useSelector(state => state.perfisState)

  return (
    <Modal
      title={'Remover perfil'}
      open={modalStatus === 'remover' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Cancelar'
      size='small'
      cy='RemoverFormPerfil'
      actions={
        <>
          <Button color='danger' 
            onClick={() => dispatch(removerPerfis(perfil))}
            cy='RemoverPerfil'
          >
            Remover
          </Button>
        </>
      }
    >
      <section>
        <p>Tem certeza que deseja remover este perfil?</p>
        <p><strong>{perfil.nome}</strong></p>
      </section>
    </Modal>
  )
}
