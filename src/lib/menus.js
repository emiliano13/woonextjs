//import { getApolloClient } from '@apollo/client'
import client from '@/utils/apollo/ApolloClient';
import { getTopLevelPages } from '@/lib/pages';
//import { QUERY_ALL_MENUS } from 'data/menus';
import { QUERY_ALL_MENUS, QUERY_GET_MENU_BY_LOCATION } from '@/utils/gql/GQL_QUERIES';

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'PRIMARY';



/**
 * getAllMenus
 */

export async function getAllMenus() {
  //const apolloClient = getApolloClient();
  let slug = 'PRIMARY'
  const data = await client.query({
    //query: QUERY_ALL_MENUS,
    query: QUERY_GET_MENU_BY_LOCATION, 
      variables:  { slug } ,    
  });
 // const menus = data?.data.menus.nodes.map(mapMenuData);
  //console.log(`menus data ${JSON.stringify(data.data.menus.nodes[0].menuItems)} ` )
const dataParsed = parseHierarchicalMenu(data.data.menus.nodes[0].menuItems.nodes)
//console.log(dataParsed)
  return { dataParsed };
  
  //const menus = data?.data.menus.edges.map(mapMenuData);
  
  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });
  
  menus.push(defaultNavigation);

  return {
    menus,
  };
}

/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
  const { node } = menu;
  const data = { ...node };

  data.menuItems = data.menuItems.edges.map(({ node }) => {
    return { ...node };
  });

  return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages) {
  return pages.map(({ id, uri, title }) => {
    return {
      label: title,
      path: uri,
      id,
    };
  });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages({ locations, pages }) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  };
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };    
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};

/**
 * findMenuByLocation
 */

export function findMenuByLocation( location) {
  if (typeof location !== 'string') {
    throw new Error('Failed to find menu by location - location is not a string.');
  }
  const menus = getAllMenus()
  //console.log(`menus all ${JSON.stringify(menus)} ` )
  return menus;
  //return menus.data.data.menus.nodes
  
  const menu = menus.find(({ locations }) => {
    return locations.map((loc) => loc.toUpperCase()).includes(location.toUpperCase());
  });

  return menu && parseHierarchicalMenu(menu.menuItems);
}
