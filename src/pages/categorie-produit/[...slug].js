import { withRouter } from 'next/router';

// Components
import Layout from '@/components/Layout/Layout.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import DisplaySubcategories from '../../components/Category/DisplaySubcategories.component';


import client from '@/utils/apollo/ApolloClient';

import { QUERY_PRODUCT_CATEGORY_BY_SLUG, GET_PRODUCTS_FROM_CATEGORY } from '@/utils/gql/GQL_QUERIES';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/**
 * Display a single product with dynamic pretty urls
 */
const ProductCategorie = ({
  categoryName,
  category,
  products
}) => {
  return (
    <Layout title={`${categoryName ? categoryName : ''}`}>
          {category.children.nodes.length ? (
            <DisplaySubcategories subcategories={category.children.nodes} parentSlug={category.slug} />
        ) : (            
            <>
              {products ? (
                <div>
                  <DisplayProducts products={products} />
                </div>
              ) : (
                <div className="mt-8 text-2xl text-center">No tiene productos</div>
              )}
              <div>No tiene hijos</div>
            </>
          )}
       {/* {products ? (
         <DisplayProducts products={products} />
       ) : (
         <div className="mt-8 text-2xl text-center">Laster produkt ...</div>
       )} */}
    </Layout>
  );
};

export default withRouter(ProductCategorie);

export const getServerSideProps = async ({ params = {} ,
}) => {
    console.log(params)
    const slug = params.slug[1] ? params.slug[1] : params.slug[0];
    

  console.log(`SLUG ${slug}`)
  const res = await client.query({
    query: QUERY_PRODUCT_CATEGORY_BY_SLUG,
    variables: { slug },
  });
console.log(res.data.productCategory)
if(!res.data.productCategory.children.nodes.length){
    console.log("no tiene hijos")
}
const res2 = await client.query({
    query: GET_PRODUCTS_FROM_CATEGORY,
    variables: { slug },
  });


  return {
    props: {
      categoryName: res.data.productCategory.name,
      products: res2.data.productCategory.products.nodes,
      category: res.data.productCategory
    },
  };
};
