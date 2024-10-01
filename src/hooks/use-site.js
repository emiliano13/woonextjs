import { useContext, createContext } from 'react';

import config from '../../package.json';

import { removeLastTrailingSlash } from '../lib/util';

export const SiteContext = createContext();
console.log(`siteContext ${SiteContext} `);
/**
 * useSiteContext
 */

export function useSiteContext(data) {
  let { homepage = '' } = config;

  // Trim the trailing slash from the end of homepage to avoid
  // double // issues throughout the metadata

  homepage = removeLastTrailingSlash(homepage);

  return {
    ...data,
    homepage,
  };
}

/**
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  console.log(`site ${SiteContext} `);
  return site;
}
