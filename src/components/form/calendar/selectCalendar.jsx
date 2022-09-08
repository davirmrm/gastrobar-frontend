import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../button/button'
import Portal from '../../portal/portal'
import useOutsideClick from '../../useOusideClick/useoutsideclick';
import { CalendarYear } from './calendarYear';
import { CalendarYearMonth } from './calendarYearMonth';

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

export function SelectCalendar({
  name,
  type = 'year',
  label = '',
  placeholder = 'Ano',
  action,
  selected,
  dataInicio,
  dataFim,
  required,
  disabled,
  typeMont = 'abv',
  cy = '',
}) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectCoordinates, setSelectCoordinates] = useState({});
  
  const ref = useRef(null);
  useOutsideClick(ref, (e) => {
    // openSelect({value: e})
    if (!e && selectOpen === true) {
      setSelectOpen(false);
    }
  });
  
  const openSelect = ({ elem, value }) => {
    if (elem) {
    let div = elem.target;
    let rect = div.getBoundingClientRect(),
      eixoX = rect.left,
      eixoY = rect.top,
      width = rect.width,
      height = rect.height;

    // let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let coor = {};
    if (Math.ceil(eixoY + height) + 300 >= windowHeight) {
      coor = { left: eixoX, bottom: windowHeight - eixoY, top: 'auto' };
    } else {
      coor = { left: eixoX - 7, top: eixoY + height + 1 };
    }
    // if (type === 'yearMonth') {
    //   coor = {...coor, maxHeight: '320px' }
    // }
    setSelectCoordinates({ ...coor, position: 'absolute', minWidth: width, width: 'auto', maxWidth: '280px' });
  }
    setSelectOpen(!selectOpen)
  }
  
  const textButton = (e) => {
    if (selected) {
      if (type === 'yearMonth' && typeMont !== 'num') {
        let info = selected.split('-')
        return `${dataInfo[typeMont === 'abv' ? `nomesMesesAbv` : `nomesMeses`][Number(info[0]) - 1]}-${Number(info[1])}`
      } else {
        return selected
      }
    } else{
      return placeholder
    }
  }

  const typeContent = (e) => {
    switch (type) {
      case 'year':
      return <CalendarYear
        name={name}
        label={placeholder}
        action={(e)=> {
          action(e)
          setSelectOpen(false)
        }}

        value={selected}
        dataInicio={dataInicio}
        dataFim={dataFim}
      />
      case 'yearMonth':
      return <CalendarYearMonth
        name={name}
        label={placeholder}
        action={(e)=> {
          action(e)
          setSelectOpen(false)
        }}

        value={selected}
        dataInicio={dataInicio}
        dataFim={dataFim}
      />
    }    
  }
  
  const require = required ? Object.keys(required) : undefined;

  return <div className={`form-box form-select-box calendar-box ${require && (required && (required.erro[name] ? 'erro' : ''))
    } `}
  >
    {label ? (
      <label className="label-input" htmlFor={`id-${name}`} data-cy={`SelectBoxLabel${name}${cy}`}>
        {require ? <span className='required-label'>*</span> : ''} {label}
      </label>
    ) : null}
    <div>
      <Button
        className={`select-selected ${selectOpen ? 'open' : ''}`}
        onClick={(e) =>
          openSelect({ elem: e, value: !disabled ? !selectOpen : false })
        }
        cy="OpenSelectCalendar"
      >
        {textButton(selected)}
      </Button>
      <Portal name="select">
        {selectOpen ? <div
            ref={ref}
            className={`select-box select-calendar-${name}`}
            style={selectCoordinates}
          >
            { typeContent(type) }
          </div>
          : <></>
        }
      </Portal>
    </div>
    {required?.erro?.[name] ? (
      <span className="campo-obrigatorio" data-cy="MandatorySelectCalendaraFieldSpan">{required.message}</span>
    ) : null}
  </div>
}