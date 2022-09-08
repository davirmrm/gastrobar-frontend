import React from 'react';

export const RadioButton = ({
  options,
  action,
  checked,
  label,
  name,
  type = 'radiobutton',
  color = '',
  optionLabel = 'name',
  optionValue = 'id',
  cy=''
}) => {
  const checkedAction = (e) => {
    const resp = e;
    action({ name: name, value: resp, type: type });
  };

  const veryfiChecked = (e) => {
    return checked[optionValue] === e[optionValue] ? true : false;
  };

  const capitalizedName = name[0].toUpperCase() + name.substring(1);

  return (
    <div className={`form-box form-radiobutton ${type} ${color} `}>
      <label htmlFor={`id-${name}`} data-cy={`FormRadiobutton${capitalizedName}${cy}`}>{label}</label>
      <div className="radio-button-container">
        {options
          ? options.map((c) => {
              return (
                <div
                  key={`${name}-${c[optionValue]}`}
                  className={`radio-box ${veryfiChecked(c) ? 'checked' : ''}`}
                  onClick={() => checkedAction(c)}
                  data-cy={`FormRadioButton${capitalizedName}OptionClick${c[optionValue]}${cy}`}
                >
                  <span 
                  data-cy={`FormRadioButton${capitalizedName}OptionClick${c[optionValue]}${cy}Label`} 
                  className={type}
                  />
                    {c[optionLabel]}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
