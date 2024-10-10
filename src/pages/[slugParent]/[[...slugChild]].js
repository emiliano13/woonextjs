import Link from 'next/link';
// Imports
import { withRouter } from 'next/router';
// Components
import Layout from '@/components/Layout/Layout.component';
// Utilities
import client from '@/utils/apollo/ApolloClient';

import { QUERY_PAGE_BY_URI } from '@/utils/gql/GQL_QUERIES';

const Page = ({
    page,
    networkStatus,
  }) => {
    const { title, metaTitle, description, slug, content, children } = page;
    const hasError = networkStatus === '8';
    return (
      <Layout>
       <div
        className=""
        dangerouslySetInnerHTML={{
            __html: content,
        }}
        />
      </Layout>
    );
  };
  
  export default withRouter(Page);
  
  export const getServerSideProps = async ({
    params = {} ,
  }) => {
    const { slugParent, slugChild } = params;
    console.log(`slug page 2 ${JSON.stringify(params)} `)
    const { data, loading, networkStatus } = await client.query({
      query: QUERY_PAGE_BY_URI,
      variables: { uri: slugParent },
    });
    console.log( data )
    return {
      props: { page: data.page, loading, networkStatus },
    };
  };
  