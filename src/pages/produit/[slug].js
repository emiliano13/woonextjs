// Imports
import { withRouter } from 'next/router';

// Components

import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';



//lib 
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

// GraphQL
import { GET_SINGLE_PRODUCT_BY_SLUG } from '@/utils/gql/GQL_QUERIES';

/**
 * Display a single product with dynamic pretty urls
 * @function Produkt
 * @param {InferGetServerSidePropsType<typeof getServerSideProps>} products
 * @returns {JSX.Element} - Rendered component
 */
const Produkt = ({
  product,
  networkStatus,
}) => {
  const hasError = networkStatus === '8';
  return (
    <Layout title={`${product.name ? product.name : ''}`}>
      {product ? (
        
        <div className="container flex flex-wrap items-center pt-4 pb-12 mx-auto">
          <div className="grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
        {product.featuredImage && (
             <InnerImageZoom
             src={product.featuredImage?.node.sourceUrl}
             zoomSrc={product.featuredImage?.node.mediaItemUrl}
             zoomType="hover"
           />            
          )}
        <div className="px-4 md:ml-8">
        <h1 className="text-2xl text-center md:text-left mb-4">
        {product.name}
        </h1>
        <div className="is-divider"></div>

        <div className="pt-1 mt-4 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.excerpt }} />
        </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 text-2xl text-center">Laster produkt ...</div>
      )}
      {hasError && (
        <div className="mt-8 text-2xl text-center">
          Product no encontrado
        </div>
      )}
    </Layout>
  );
};

export default withRouter(Produkt);

export const getServerSideProps = async ({
  query: { slug },
}) => {
  const { data, loading, networkStatus } = await client.query({
    query: GET_SINGLE_PRODUCT_BY_SLUG,
    variables: { slug },
  });
  //console.log( data.product )
  return {
    props: { product: data.product, loading, networkStatus },
  };
};
