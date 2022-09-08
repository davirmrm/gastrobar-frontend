import React, { useEffect, useState } from 'react'
import { Button } from '../../button/button'
import { adicionaZero } from '../Mask'
import { IcoArrowBack } from '../../icon/back-arrow-icon'
import { IcoArrowForward } from '../../icon/forward-arrow-icon'

const dataInfo = {
    nomesDias:['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    numeroSemanas: [1, 2, 3, 4, 5],
    numeroDiasSemana: [1, 2, 3, 4, 5, 6, 7],
    nomesMeses:[
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    nomesMesesAbv:[
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ]
}

export function CalendarYearMonth({ 
  name,
  label,
  action, 
  value, 
  dataInicio, 
  dataFim 
}) {
  let dataAtual = new Date()
  let dataAtualAno = dataAtual.getFullYear()
  let dataFimAno = dataFim
  let dataInicioAno = dataInicio
  const [calendarioMesAno, setcalendarioMesAno] = useState('year')
  const [selected, setSelected] = useState({mes: '', ano: ''})
  const [dataState, setDataState] = useState({
    anoInicio: dataAtualAno - 6,
    anofim: dataAtualAno + 6,
    ano: dataAtualAno,
    anos: [],
    meses: dataInfo.nomesMesesAbv
  })

  useEffect(()=>{
    let anos = []
    let anofim = dataAtualAno + 6
    let anoInicio = dataAtualAno - 6

    if (dataFim && dataAtualAno + 6 >= dataFimAno) {
      anofim = dataFimAno
      anoInicio = dataFimAno - 11
      if (dataInicio && anoInicio <= dataInicioAno) {
          anoInicio = dataInicioAno
      }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  },[])

  const handleSelect = (e) => {
    setSelected({...selected, [e.name]: e.value})
    setcalendarioMesAno('months')
    if (selected.ano && e.name === 'mes') {
      action({name, value: `${adicionaZero(e.number)}-${selected.ano}`}, {name, message: false})
    }
  }

  const handleLimpar = (e) => {
    setSelected({mes: '', ano: ''})
    setcalendarioMesAno('year')
    action({name, value: ``}, {name, message: false})
  }

  const seeMinus = (e) => {
    let anos = []
    let anofim = dataState.anos[0]
    let anoInicio = dataState.anos[0] - 11
 
    if (dataInicio && anoInicio <= dataInicioAno) {
        anoInicio = dataInicioAno
        anofim = dataInicioAno + 11 
        if (dataFim && dataState.anos[0] >= dataFimAno) {
          anofim = dataFimAno
        }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  }

  const seeMore = (e) => {
    let anos = []
    let anofim = dataState.anos[dataState.anos.length] + 11
    let anoInicio = dataState.anos[dataState.anos.length]

    if (dataFim && dataAtualAno + 6 >= dataFimAno) {
      anofim = dataFimAno
      anoInicio = dataFimAno - 11
      if (dataInicio && anoInicio <= dataInicioAno) {
          anoInicio = dataInicioAno
      }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  }

  return (
    <div className='box-calendario'>
      <table>
        <thead>
          <tr>
            <th>
              {
                calendarioMesAno === 'year' && dataInicio ?
                <Button color='default' type='btn circle' onClick={() => seeMinus()} disabled={dataInicioAno <= dataState.anoInicio?false:true}>
                  <IcoArrowBack />
                </Button>
                :null
              }
            </th>
            <th colSpan='5'>
              {calendarioMesAno === 'year' ?
                <span style={{fontSize: '16px', padding: '5px 5px', display: 'block'}}>{label}</span>
                :
                <span style={{fontSize: '16px', padding: '5px 5px', display: 'block'}} onClick={()=> setcalendarioMesAno('year')}>{ selected.ano}</span>
              }
            </th>
            <th>
              {
                calendarioMesAno === 'year' && dataFim ?
                <Button color='default' type='btn circle' onClick={() => seeMore()} disabled={dataFimAno >= dataState.anofim?false:true}>
                  <IcoArrowForward />
                </Button>
                :null
              }
            </th>
          </tr>        
        </thead>
        <tbody>
          <tr>
            <td colSpan='7' className='btn-meses'>
              {calendarioMesAno === 'year' ?
                dataState?.anos ? dataState?.anos.map((e, i) => {
                  return <Button 
                    key={i} color={selected === e ? 'primary' : 'default'} type='btn' 
                    onClick={() => handleSelect({name: 'ano', value: e})} 
                    style={{width: '68px'}}
                  >
                    {e}
                  </Button>
                })
                :<>Carregando</>
                :
                dataState?.meses ? dataState?.meses.map((e, i) => {
                  return <Button 
                    key={i} color={selected === e ? 'primary' : 'default'} type='btn' 
                    onClick={() => handleSelect({name: 'mes', value: e, number: i+1})} 
                    style={{width: '33.333%'}}
                  >
                    {e}
                  </Button>
                })
                :<>Carregando</>
              }
            </td>
          </tr>
          <tr>
            <td colSpan='7'>
              <div className='box-btn' style={{margin: '10px 5px 5px 5px'}}>
                <Button color={'primary'} type='link' 
                  onClick={() => handleLimpar()}
                >
                  Limpar
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}