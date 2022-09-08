import React, { useState } from 'react'
import './pagination.scss'
import { Button } from '../button/button'
// import { IcoArrowForward, IcoArrowBack, IcoSpinner } from '../icon'

const textDefault = {
  de: 'de',
  paginas: 'paginas',
  itens: 'Registros',
  next: 'Próximo',
  before: 'Anterior',
  reload: 'Ir'
  // next: <IcoArrowForward />,
  // before: <IcoArrowBack />,
  // reload: <IcoSpinner />
}
export const Paginate = ({ 
  data = { 
    pageNumber: 0, 
    totalPages: 1, 
    totalElements: 0 
  }, 
  action, 
  text = textDefault 
}) => {
  const [paginateTemp, setPaginateTemp] = useState(String(data.pageNumber ? data.pageNumber : 1))

  const changePaginate = event => {
    setPaginateTemp(event.target.value)
  }

  const reloadPaginate = event => {
    if (event || event === 0) {
      if (event <= data.totalPages) {
        setPaginateTemp(event + 1)
        action(event)
      }
    } else if (paginateTemp >= 1 && paginateTemp <= data.totalPages) {
      action(Number(paginateTemp - 1))
    } else {
      setPaginateTemp(data.pageNumber + 1)
    }
  }

  return (
    <div className='pagination-custom'>
      <Button
        type='btn circle'
        color='primary'
        onClick={() => reloadPaginate(data.pageNumber - 1)}
        disabled={data.pageNumber === 0 ? true : false}
      >
        {text.before}
      </Button>
      <div className='page-item'>
        <input type='number' name='paginate' value={paginateTemp} onChange={event => changePaginate(event)} />
        <Button
          type='btn circle'
          color='primary'
          onClick={() => reloadPaginate()}
          disabled={data.totalElements === 0 ? true : false}
        >
          {text.reload}
        </Button>
      </div>

      <Button
        type='btn circle'
        color='primary'
        onClick={() => reloadPaginate(data.pageNumber + 1)}
        disabled={data.pageNumber >= data.totalPages - 1 ? true : false}
      >
        {text.next}
      </Button>

      <span className='pagination-info'>
        {`${data.pageNumber ? data.pageNumber + 1 : 1} ${text.de} ${data.totalPages ? data.totalPages : 0} ${text.paginas}`}
        {` - ${data.totalElements ? data.totalElements : 0} ${text.itens}`}
      </span>
    </div>
  )
}
