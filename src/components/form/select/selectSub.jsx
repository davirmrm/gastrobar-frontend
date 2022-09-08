import { useState, useRef, useEffect, ReactNode } from 'react';
import useOutsideClick from '../../useOusideClick/useoutsideclick';
import { IcoClose, IcoSearch } from '../../icon/icon';
import { validarCampo } from '../../validation/Validation';
import Portal from '../../portal/portal';
import { Button } from '../../index';
import { FilterAction, FilterSelect } from './select';

const chargeDefault = { max: 0, text: 'Mais itens', action: () => null };

export const SelectSub = ({
  options,
  action,
  actionClose,
  actionFilter,
  selected,
  label,
  name,
  color = '',
  closeOnSelect = null,
  multiSelect = false,
  disabled = false,
  selectedItem = true,
  textCustom = ['Selecione', 'Selecionado', 'Selecionados', 'Marcar todos'],
  filter,
  charge = chargeDefault,
  optionLabel = 'name',
  optionValue = 'id',
  optionCustom,
  labelCustom,
  required,
  cy,
  ...props
}) => {
  closeOnSelect =
    closeOnSelect === null ? (multiSelect ? false : true) : closeOnSelect;
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectCoordinates, setSelectCoordinates] = useState({});
  const [selectState, setSelectState] = useState([]);

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
      setSelectCoordinates({ ...coor, position: 'absolute', width: width });
    }
    setSelectOpen(value);
  };

  const ref = useRef(null);
  useOutsideClick(ref, (e) => {
    // openSelect({value: e})
    if (!e && selectOpen === true) {
      closeAction({ ...selected, ...selectState });
    }
  });

  useEffect(() => {
    setSelectState(options ? options : []);
  }, [options]);

  const veryfiMultiSelect = (e) => {
    const verify = selected.filter((elem) => {
      return elem[optionValue] === e[optionValue] ? elem : null;
    });

    const res = selected.filter((elem) => {
      return elem[optionValue] !== e[optionValue] ? elem : null;
    });

    if (selected.length === 0) {
      return [e];
    } else {
      if (verify.length === 0) {
        return selected.concat(e);
      } else {
        return res;
      }
    }
  };

  const selectAction = (e) => {
    const resp = multiSelect ? (e ? veryfiMultiSelect(e) : []) : e ? e : {};
    action({ name: name, value: resp, type: 'select' });
  };

  const textButton = (e) => {
    if (!multiSelect) {
      const verifyObject = Object.keys(e);
      if (labelCustom) {
        return labelCustom(e);
      } else if (e[optionLabel]) {
        return e[optionLabel];
      } else {
        return verifyObject.length ? e : textCustom[0];
      }
    } else {
      if (e.length === 0) {
        return textCustom[0];
      } else if (e.length === 1) {
        return `${textCustom[1]} - ${e[0][optionLabel]} `;
      } else {
        return `${textCustom[2]} ( ${e.length} ) `;
      }
    }
  };

  const veryfiSelected = (e) => {
    if (!multiSelect) {
      return selected[optionValue] === e[optionValue] ? true : false;
    } else {
      if (selected.length === 0) {
        return false;
      } else {
        const verify = selected.filter((elem) => {
          return elem[optionValue] === e[optionValue] ? elem : null;
        });

        if (verify.length === 0) {
          return false;
        } else {
          return (verify[0] && verify[0][optionValue]) === e[optionValue]
            ? true
            : false;
        }
      }
    }
  };

  const selectAll = (e) => {
    action({ name: name, value: e ? options : [], type: 'select' });
  };

  const closeAction = (e) => {
    e = closeOnSelect && multiSelect ? selected : e;
    const resp = multiSelect ? (e ? e : []) : e ? e : {};
    const v = require
      ? validarCampo({
          target: {
            name,
            value: resp,
            pattern: multiSelect ? 'multiselect' : 'select',
          },
        })
      : {};
    if (actionClose) {
      actionClose(resp, v);
    }
    openSelect({ value: false });
  };

  const require = required ? Object.keys(required) : undefined;

  return (
    <div
    {...props}
      className={`form-box form-select-box ${color} ${
        require && (required && (required.erro[name] ? 'erro' : ''))
      } `}
    >
      {label ? (
        <label className="label-input" htmlFor={`id-${name}`} data-cy={`SelectBoxLabel${name}`}>
          {require ? <span className='required-label'>*</span> : ''} {label}
        </label>
      ) : null}
      <div>
        <Button
          className={`select-selected ${selectOpen ? 'open' : ''}`}
          onClick={(e) =>
            openSelect({ elem: e, value: !disabled ? !selectOpen : false })
          }
          cy="OpenSelect"
        >
          {textButton(selected)}
        </Button>
        <Portal name="select">
          {selectOpen ? (
            <div
              ref={ref}
              className={`select-box select-${name} ${
                multiSelect ? 'multiselect' : ''
              }`}
              style={selectCoordinates}
            >
              {filter && actionFilter ? (
                <FilterSelect
                  clean={filter.clean}
                  action={(e) => [
                    setSelectState(FilterAction(options, e)),
                    actionFilter(options, e),
                  ]}
                  filter={filter.text}
                  title={filter.title}
                  text={filter.text}
                  cy={cy}
                />
              ) : null}

              {multiSelect ? (
                <div
                  data-cy={`MultiSelectContainer${cy}`}
                  className={`select-all ${
                    selected.length > 0 && selected.length === options.length
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => [
                    selectAll(selected.length !== options.length ? true : ''),
                    closeOnSelect ? closeAction(selected) : null,
                  ]}
                >
                  <span className="checkelement" data-cy={`MultiSelectSpan${cy}`}></span>
                  {textCustom[3]}
                </div>
              ) : null}

              <div className="select-options">
                {!multiSelect && selectedItem ? (
                  <div
                    className={selected === {} ? 'selected' : ''}
                    onClick={(e) => [
                      selectAction(''),
                      closeOnSelect ? closeAction('') : null,
                    ]}
                    data-cy={`SelectedItemNotMultiSelect${textCustom[0]}`}
                  >
                    {textCustom[0]}
                  </div>
                ) : null}

                {selectState.map((e, i) => {
                  return (
                    <div
                      className={
                       `${e?.parent? '' : 'sub'} ${ veryfiSelected(selectState[i]) ? 'selected' : ''}`
                      }
                      key={`${name}-${e[optionValue]}-${i}`}
                      onClick={(e) => [
                        selectAction(selectState[i]),
                        closeOnSelect ? closeAction(selectState[i]) : null,
                      ]}
                      data-cy={`CheckElementContainer[${i}]`}
                    >
                      {multiSelect ? (
                        <span className="checkelement" data-cy={`CheckElementSpan[${i}]`}></span>
                      ) : null}
                      {optionCustom ? optionCustom(e) : e[optionLabel]}
                    </div>
                  );
                })}
                {charge.max && !(selectState.length === charge.max) ? (
                  <Button
                    className="btn primary normal block"
                    onClick={charge.action}
                    title={charge.text}
                    cy={`Select${charge.text}`}
                  >
                    {charge.text}
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </Portal>
      </div>

      {required?.erro?.[name] ? (
        <span className="campo-obrigatorio" data-cy="MandatorySelectFieldSpan">{required.message}</span>
      ) : null}
    </div>
  );
};