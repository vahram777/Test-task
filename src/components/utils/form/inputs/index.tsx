import React, { useEffect, useState } from "react";
import styles from './style.module.css';
import { validator } from '../../validators/inputValidator';
import Eye from "../../../../assets/images/Eye.svg";
import EyeOff from "../../../../assets/images/Eye Off.svg";

interface InputProps {
  id: string,
  title: string;
  size: number;
  inputBottomText?: string;
  type?: string;
  list?: Array<string>;
  validators?: {
    required?: boolean;
    min?: number;
    email?: boolean;
  }
  value?: any;
  formUpdate: Function,
  error?: string
}

const Inputs = ({ id, title, size, inputBottomText, type = 'text', list = [], validators, value = '', formUpdate, error }: InputProps) => {
  const changeInputHandler = (e: React.FormEvent<HTMLInputElement> | null, value: any = null) => {
    const newValue = value || e?.currentTarget.value;
    let validatorResp = '';
    let newError = null;
    if (validators) {
      validatorResp = validator(validators, newValue);
      validatorResp && validatorResp !== error ? newError = validatorResp
        : !validatorResp && error ? newError = ''
          : null
    }

    formUpdate(id, newValue, newError ?? error);
  }

  const [inputType, setInputType] = useState(type);

  return (
    <div className={styles[`col-span-${size}`]}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      {
        type === 'switch'
          ? <div className={styles.switchOptions}>
            {list.map(item => {
              return <div
                key={item}
                className={`${styles.options} ${item === value ? styles.selectedOption : ''}`}
                onClick={() => changeInputHandler(null, item)}
              >
                {item}
              </div>
            })}
          </div>
          :
          <div className={id === 'password' ? styles.passwordInput : ''}>
            <input
              value={value}
              onChange={changeInputHandler}
              type={inputType}
              name={id}
              id={id}
              className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${styles.input}`}
            />
            {id === 'password' ? <button type="button" onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}><img src={inputType === 'password' ? Eye.src : EyeOff.src} /></button> : ''}
          </div>
      }
      {inputBottomText || error
        ? (
          <p className={`mt-2.5 text-sm ${error ? 'text-[#F87171]' : styles.additionalText}`}>
            {error || inputBottomText}
          </p>
        )
        : null}
    </div>
  )
}

export default Inputs