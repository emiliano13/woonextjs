import Link from 'next/link';
// Imports
import { withRouter } from 'next/router';
// Components
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// import LiteYouTubeEmbed from "react-lite-youtube-embed"
// import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
//import ReactDOMServer from 'react-dom/server'
import parseHtml from '@/lib/parser'

import { QUERY_PAGE_BY_URI } from '@/utils/gql/GQL_QUERIES';

const Page = ({
    page,
    networkStatus,
  }) => {
    const { title, metaTitle, description, slug, content, children } = page;
    const hasError = networkStatus === '8';

    return (
      <Layout>
       {/* <div
        className=""
        dangerouslySetInnerHTML={{
            __html: content2,
        }}
        /> */}
      {parseHtml(content)}

      </Layout>
    );
  };
  
  export default withRouter(Page);
  
  // export const getServerSideProps = async ({
  //   params = {} ,
  // }) => {
  //   const { slugParent, slugChild } = params;
  //   console.log(`slug page 2 ${JSON.stringify(params)} `)
  //   const { data, loading, networkStatus } = await client.query({
  //     query: QUERY_PAGE_BY_URI,
  //     variables: { uri: slugParent },
  //   });
  //   if (!data.page) { 
  //     return {
  //       notFound: true,
  //     }
  //    }
  //   //console.log( data )

  //   return {
  //     props: { page: data.page, loading, networkStatus },
  //   };
  // };
  


  export async function generateMetadata({ params, searchParams }, parent) {
 
    // Get the blog post.
    const { slugParent, slugChild } = params;
    console.log(`slug page seo 2 ${JSON.stringify(params)} `)
    const { data, loading, networkStatus } = await client.query({
      query: QUERY_PAGE_BY_URI,
      variables: { uri: slugParent },
    });
  
    // No page? Bail...
    if (!data.page) { 
      return {
        notFound: true,
      }
     }
  console.log(`seo title ${data.page.seo.title}`)
    return {
      title: data.page.seo.title,
      description: data.page.seo.metaDesc
    }
  }
  

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
export const getStaticProps = async ({ params = {} ,}) => {
  const { slugParent, slugChild } = params;
  console.log(`slug page 2 ${JSON.stringify(params)} `)
  const { data, loading, networkStatus } = await client.query({
    query: QUERY_PAGE_BY_URI,
    variables: { uri: slugParent },
  });
  if (!data.page) { 
    return {
      notFound: true,
    }
   }
  // console.log(`data page ${JSON.stringify(data.page.seo)} `)

  return {
    props: { page: data.page, loading, networkStatus },
  };
};
