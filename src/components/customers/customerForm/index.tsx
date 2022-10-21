import React, { useEffect, useState } from "react";
import Inputs from "../../utils/form/inputs"
import { validator } from "../../utils/validators/inputValidator"
import styles from './style.module.css';

interface CustomerFormInterface {
  addCustomer: Function;
  editCustomer: Function;
  cancelEdit: Function;
  editCustomerInfo?: any;
}

const CustomerForm = ({ addCustomer, editCustomer, cancelEdit, editCustomerInfo }: CustomerFormInterface) => {
  const inputs = [
    {
      id: 'first-name',
      title: 'First name',
      validators: {
        required: true,
      },
      size: 3,
    },
    {
      id: 'last-name',
      title: 'Last name',
      validators: {
        required: true,
      },
      size: 3,
    },
    {
      id: 'company',
      title: 'Company',
      validators: {
        required: true,
      },
    },
    {
      id: 'status',
      title: 'Status',
      type: 'switch',
      list: [
        'User',
        'Administrator'
      ],
      value: 'User'
    },
    {
      id: 'email',
      title: 'Email',
      type: 'email',
      validators: {
        required: true,
        email: true
      },
    },
    {
      id: 'password',
      title: 'Password',
      type: 'password',
      inputBottomText: '8+ characters',
      validators: {
        required: true,
        min: 8
      },
    }
  ];

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!editCustomerInfo) {
      setForm({});
      return;
    }
    const form: any = {}
    for (let key in editCustomerInfo) {
      form[key] = { value: editCustomerInfo[key], error: '' }
    }
    setForm(form);
  }, [editCustomerInfo]);

  const formUpdate = (id: string, value: any, error: string) => {
    setForm({ ...form, [id]: { value, error } });
  }

  const validateAfterSubmit = () => {
    const newForm: any = {}
    let isValid: boolean = true;
    inputs.forEach(item => {
      newForm[item.id] = {
        value: form[item.id]?.value || item.value || '',
        error: ''
      }

      if (!item.validators) return;
      const validatorResp = validator(item.validators, newForm[item.id].value);
      newForm[item.id].error = validatorResp;
      if (isValid && validatorResp) isValid = false;
    });
    setForm(newForm);
    return [isValid, newForm];
  }

  const submitHandler = (e: any) => {
    e.preventDefault();
    const [isVlaid, form] = validateAfterSubmit();
    if (!isVlaid) return;

    const newForm: any = {}
    for (let key in form) {
      newForm[key] = form[key].value;
    }

    editCustomerInfo ? editCustomer({ ...newForm, id: editCustomerInfo.id }) : addCustomer(newForm);
    setForm({});
  }

  return (
    <div className={`mt-10 sm:mt-0 ${styles.formContainer}`}>
      <h2>
        {editCustomerInfo ? 'Edit' : 'Add'} Customer
      </h2>
      <form action="#" method="POST" onSubmit={submitHandler}>
        <div className="bg-white">
          <div className="grid grid-cols-6 gap-6">
            {inputs.map(item => {
              if (item.id === 'password' && editCustomerInfo) return '';
              return (
                <Inputs
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  size={item.size || 6}
                  inputBottomText={item?.inputBottomText}
                  type={item?.type}
                  list={item?.list}
                  validators={item?.validators}
                  formUpdate={formUpdate}
                  value={form[item.id]?.value || item?.value || ''}
                  error={form[item.id]?.error || ''}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.actions}>
          {editCustomerInfo ? <button type="button" className="w-1/2" onClick={() => cancelEdit()}>Cancel</button> : null}
          <button type="submit" className={`${!editCustomerInfo ? 'w-full' : 'w-1/2'}`}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm