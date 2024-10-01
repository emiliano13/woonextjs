import { withRouter } from 'next/router';

// Components
import Layout from '@/components/Layout/Layout.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import DisplaySubcategories from '../../components/Category/DisplaySubcategories.component';

import CategoriesMenu from '@/components/CategoriesMenu';

import client from '@/utils/apollo/ApolloClient';

import { QUERY_PRODUCT_CATEGORY_BY_SLUG, GET_PRODUCTS_FROM_CATEGORY, QUERY_ALL_CATEGORIES_MENU } from '@/utils/gql/GQL_QUERIES';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/**
 * Display a single product with dynamic pretty urls
 */
const ProductCategorie = ({
  categoryName,
  category,
  products,
  categories
}) => {
  return (
    <Layout title={`${categoryName ? categoryName : ''}`}>
        <div className="grid grid-cols-5 gap-4">
        
        <div className="col-span-1 p-4">{<CategoriesMenu categories={categories} />}</div>
        

        <div className="col-span-4 p-4">
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
       </div>
       </div>
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

  
  const res3 = await client.query({
    query: QUERY_ALL_CATEGORIES_MENU
  });

  //console.dir(`products T ${JSON.stringify(res2.data)} ` )
  return {
    props: {
      categoryName: res.data.productCategory.name,
      products: res2.data.productCategory.products.nodes,
      category: res.data.productCategory,
      categories: res3.data.productCategories.nodes
    },
  };
};
