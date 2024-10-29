import { withRouter } from 'next/router';
import { Suspense } from 'react';
// Components
import Layout from '@/components/Layout/Layout.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import DisplaySubcategories from '../../components/Category/DisplaySubcategories.component';
import NextBreadcrumb from '@/components/BreadCrumb';
//import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.component';

import CategoriesMenu from '@/components/CategoriesMenu';

import { usePathname } from 'next/navigation';
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
  //const [isLoading, setIsLoading] = useState(true);

  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  let breadCrumb = [];
  categories?.map((item) => {
    if (item.slug == pathNames[1]) {
      let nodo = {
        name: item.name,
        slug: item.slug,
      };
      //console.log(`activee ${item.name}`);
      breadCrumb.push(nodo);
    }
    item.children.edges.map((item2) => {
      if (item2.node.slug == pathNames[2]) {
        let nodo = {
          name: item2.node.name,
          slug: `${item.slug}/${item2.node.slug}`,
        };
        breadCrumb.push(nodo);
      }
    });
    //ESTA ES LA BUENA
    //const isActive2 = pathname2.startsWith(item.slug);
  });
  return (
    <Layout title={`${categoryName ? categoryName : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        
        
        <div className="col-span-1 p-4">{
          <Suspense fallback={<div>Loading...</div>}> 
          <CategoriesMenu /></Suspense>}
        </div>
        
        <div className="col-span-4 p-4">

        <NextBreadcrumb
            categories={breadCrumb}
            homeElement={'Accueil'}
            separator={<span className="text-sm"> / </span>}
            activeClasses="text-amber-500"
            containerClasses="flex pb-2 pl-0 breadcrumb"
            listClasses="hover:text-gray-900 mx-2 text-gray-400 text-sm "
            capitalizeLinks
          />          

          

          {category.children.nodes.length ? (
            <DisplaySubcategories subcategories={category.children.nodes} parentSlug={category.slug} />
        ) : (            
            <>
              {products ? (
                <div>
                  <DisplayProducts products={products} />
                </div>
              ) : (
                <div className="mt-8 text-2xl text-center">No hay productos...</div>
              )}              
            </>
          )}

          
      
       </div>
       </div>
    </Layout>
  );
};

export default withRouter(ProductCategorie);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
export const getStaticProps = async ({ params = {} ,}) => {
// export const getServerSideProps = async ({ params = {} ,
// }) => {
    //console.log(params)
    const slug = params.slug[1] ? params.slug[1] : params.slug[0];
  //console.log(`SLUG ${slug}`)
  const res = await client.query({
    query: QUERY_PRODUCT_CATEGORY_BY_SLUG,
    variables: { slug },
  });

if(!res.data.productCategory.children.nodes.length){
//    console.log("no tiene hijos")
}
const res2 = await client.query({
    query: GET_PRODUCTS_FROM_CATEGORY,
    variables: { slug },
  });
  
  // const res3 = await client.query({
  //   query: QUERY_ALL_CATEGORIES_MENU
  // });

  //console.dir(`products T ${JSON.stringify(res2.data)} ` )
  return {
    props: {
      categoryName: res.data.productCategory.name,
      products: res2.data.productCategory.products.nodes,
      category: res.data.productCategory,
     // categories: res3.data.productCategories.nodes
    },
  };
};
