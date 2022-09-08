import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../components'
import { modalOpen } from '../../layout/redux/layoutActions'

export default () => {
  const dispatch = useDispatch()
  const { statusModal } = useSelector(state => state.layoutState)
  const { detalharProduto } = useSelector(state => state.cardapioState)

  return (
    <Modal
      title={detalharProduto?.label}
      size='medium'
      open={statusModal === 'detalharCardapio' && detalharProduto.id ? true : false}
      close={() => dispatch(modalOpen(''))}
      closeText='Cancelar'
      actions={
        <></>
      }
    >
      <div className='modal-cardapio-info'>
        {detalharProduto?.img?<div className='modal-cardapio-info-img'>
          <img src={detalharProduto.img} title={detalharProduto?.label} />
        </div>
        :null}
        <div>
          <div dangerouslySetInnerHTML={{__html: detalharProduto?.descricao}} />
          <div className='modal-cardapio-info-preco'>
            <span></span>
            <span>{detalharProduto?.preco}</span>                             
          </div>
        </div>
      </div>
    </Modal>
  )
}
