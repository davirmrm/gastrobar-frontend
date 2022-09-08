import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from '../../components'
import { modalFechar, removerUsuarios } from './redux/colaboradoresActions'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, usuario} = useSelector(state => state.colaboradoresState)

  return (
    <Modal
      title={'Remover colaborador'}
      open={modalStatus === 'remover' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Cancelar'
      size='small'
      actions={
        <>
          <Button color='danger' onClick={() => dispatch(removerUsuarios(usuario))}>
            Remover
          </Button>
        </>
      }
    >
      <section>
        <p>Tem certeza que deseja remover este colaborador?</p>
        <p><strong>{usuario.nome}</strong></p>
      </section>
    </Modal>
  )
}
