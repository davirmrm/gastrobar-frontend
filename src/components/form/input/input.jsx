import React from 'react';
import { validarCampo } from '../../validation/Validation';

export const Input = ({
  action = () => null,
  actionBlur,
  type = 'text',
  color = '',
  required,
  placeholder = '',
  cy="",
  label,
  name = "",
  value,
  ...props
}) => {
  let require = []
  if (required){
    require = Object.keys(required);
  }
  const pattern = (e) => {
    if (typeof required?.pattern === 'object') {
      return JSON.stringify(required.pattern);
    } else if (typeof required?.pattern === 'string') {
      return required.pattern;
    } else {
      return '';
    }
  };

  const validar = (e) => {
    const v = require.length ? validarCampo(e) : {};
    action(e, v);
  };

  const validarOnblur = (e) => {
    const v = require.length ? validarCampo(e) : {};
    if (actionBlur) actionBlur(e, v);
  };

  return (
    <div
      className={`form-box form-input ${color} ${
        required && (required.erro[name] ? 'erro' : '')
      } `}
    >
      {label ? (
        <label className="label-input" htmlFor={`id-${name}`} data-cy={`FormLabel${name}${cy}`}>
          {required && require.length ? <span className='required-label'>*</span> : ''} 
          <span className='input-label-span-text'>{label}</span>
        </label>
      ) : null}

      <div className={`input-${name}-wrapper input-wrapper`}>
        {props.left ? <div className="input-actions-left">{props.left}</div> : null}
        <input
          {...props}
          data-cy={`FormInput${name}${cy}`}
          id={`id-${name}`}
          type={type}
          name={name}
          value={value}
          onChange={(e) => validar(e.target)}
          onBlur={(e) => validarOnblur(e.target)}
          pattern={pattern('')}
          placeholder={placeholder}
        />
        {props.right ? <div className="input-actions">{props.right}</div> : null}
      </div>
      {required && required.erro?.[name] ? (
        <span className="campo-obrigatorio" data-cy={`FormError${name}${cy}`}>{required.message}</span>
      ) : null}
    </div>
  );
};
