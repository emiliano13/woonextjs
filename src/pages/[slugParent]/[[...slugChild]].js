import Link from 'next/link';
// Imports
import { withRouter } from 'next/router';
// Components
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import ReactDOMServer from 'react-dom/server'
import parseHtml from '@/lib/parser'

import { QUERY_PAGE_BY_URI } from '@/utils/gql/GQL_QUERIES';

function filter_iframe(iframe_tag){
  // if iframe have youtube in it - return it back unchanged
  if(/src=".+youtube/.test(iframe_tag)){ return iframe_tag }
  // if not - replace it with empty string, effectively removing it
  return ''
}



const Page = ({
    page,
    networkStatus,
  }) => {
    const { title, metaTitle, description, slug, content, children } = page;
    const hasError = networkStatus === '8';

    ///<iframe ?.* src="([^"]+)" ?.*>/
    let regex = /\n*\s*<iframe.*?\\?>.*?<\/iframe\\?>\s*\n*/gi;
    let regex2 = /(?<=src=").*?(?=[\*"])/gi;

    // first, find each iframe in string and call function to check if you need to remove it
var filtered=content.replace(/(<iframe.*?>.*?<\/iframe>)/g, filter_iframe)

//console.log(filtered)



    let content2 = content.replace(regex, '<LiteYouTubeEmbed  aspectHeight="9"  aspectWidth="16"  id="TMMX32ershU"  title="test"/>');
   // let content2 = content.replace(regex, '<iframe src="https://www.youtube.com/embed/TMMX32ershU" title="gola" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>');

   // console.log(regex2.exec(content))
    return (
      <Layout>
       {/* <div
        className=""
        dangerouslySetInnerHTML={{
            __html: content2,
        }}
        /> */}


<div>{parseHtml(content)}</div>

        <LiteYouTubeEmbed
  aspectHeight="9"
  aspectWidth="16"
  id="TMMX32ershU"
  title="test"
/>
      </Layout>
    );
  };
  
  export default withRouter(Page);
  /*
  export const getServerSideProps = async ({
    params = {} ,
  }) => {
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
    //console.log( data )

    return {
      props: { page: data.page, loading, networkStatus },
    };
  };
  */




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
  //console.log( data )

  return {
    props: { page: data.page, loading, networkStatus },
  };
};
