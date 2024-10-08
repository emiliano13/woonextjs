import { withRouter } from 'next/router';

// Components
import Layout from '@/components/Layout/Layout.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';

import client from '@/utils/apollo/ApolloClient';

import { GET_PRODUCTS_FROM_CATEGORY } from '@/utils/gql/GQL_QUERIES';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/**
 * Display a single product with dynamic pretty urls
 */
const Produkt = ({
  categoryName,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title={`${categoryName ? categoryName : ''}`}>
      {products ? (
        <DisplayProducts products={products} />
      ) : (
        <div className="mt-8 text-2xl text-center">Laster produkt ...</div>
      )}
    </Layout>
  );
};

export default withRouter(Produkt);

export const getServerSideProps: GetServerSideProps = async ({
  query: { id, slug },
}) => {

  console.log(`ID ${id} ${slug}`)
  const res = await client.query({
    query: GET_PRODUCTS_FROM_CATEGORY,
    variables: { slug },
  });

  return {
    props: {
      categoryName: res.data.productCategory.name,
      products: res.data.productCategory.products.nodes,
    },
  };
};
