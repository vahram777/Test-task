import React from 'react';
import styles from './style.module.css';
import { toSvg } from "jdenticon";
import EditSvg from "../../../assets/images/Edit.svg";
import TrashSvg from "../../../assets/images/Trash.svg";

interface Customers {
  customers: Array<any>;
  editCustomer: React.MouseEventHandler<HTMLButtonElement>
  deleteCustomer: Function
}

const CustomersList = ({ customers, editCustomer, deleteCustomer }: Customers) => {
  return (
    <div>
      <h2>Customers</h2>
      <div className={styles.table}>
        <ul className={styles.header}>
          <li>Name</li>
          <li>Company</li>
          <li>Email</li>
          <li>Admin</li>
          <li>Actions</li>
        </ul>
        {customers.map(item => {
          return (
            <ul key={item.id} className={styles.body}>
              <li className={styles.customerName}>
                <div dangerouslySetInnerHTML={{ __html: toSvg(item.id, 24) }}></div>
                {item['first-name']} {item['last-name']}
              </li>
              <li>{item.company}</li>
              <li>{item.email}</li>
              <li>
                <span className={`${styles.status} ${item.status === 'User' ? 'bg-[#E2E8F0]' : 'bg-[#0EA5E9]'}`}></span>
              </li>
              <li className={styles.actions}>
                <button type='button' onClick={() => editCustomer(item)}><img src={EditSvg.src} alt="" /></button>
                <button type='button' onClick={() => deleteCustomer(item.id)}><img src={TrashSvg.src} alt="" /></button>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default CustomersList;