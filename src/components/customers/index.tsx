import React, { useState } from "react";
import CustomerForm from './customerForm';
import CustomersList from './customerList';
import styles from './customer.module.css';

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [editCustomerInfo, setEditCustomerInfo] = useState<any>(null);
  const [lastId, setLastId] = useState(1);

  const addCustomer = (newUserInfo: any) => {
    newUserInfo.id = lastId;
    setCustomers([...customers, newUserInfo]);
    setLastId(lastId + 1);
  }

  const editCustomer = (customerInfo: any) => {
    const customersList = [...customers];

    const changeIndex = customersList.findIndex(x => x.id === customerInfo.id);
    setEditCustomerInfo(null);
    if (changeIndex === -1) return;

    customersList.splice(changeIndex, 1, { ...customerInfo });
    setCustomers(customersList);
  }

  const deleteCustomer = (id: number) => {
    const customersList = [...customers];

    const deleteIndex = customersList.findIndex(x => x.id === id);
    if (editCustomerInfo && editCustomerInfo.id === id) setEditCustomerInfo(null);
    if (deleteIndex === -1) return

    customersList.splice(deleteIndex, 1);
    setCustomers(customersList);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <CustomerForm
            addCustomer={addCustomer}
            editCustomer={editCustomer}
            editCustomerInfo={editCustomerInfo}
            cancelEdit={() => setEditCustomerInfo(null)}
          />
        </div>
        <div className={styles.customersList}>
          <CustomersList
            customers={customers}
            editCustomer={customer => setEditCustomerInfo(customer)}
            deleteCustomer={deleteCustomer}
          />
        </div>
      </div>
    </>
  )
}

export default Customers