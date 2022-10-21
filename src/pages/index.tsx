import type { NextPage } from 'next';
import Head from 'next/head';
import Customers from '../components/customers'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Customers />
    </>
  );
};

export default Home;
