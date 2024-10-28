import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import useSite from 'hooks/use-site';
import useSite from '../../hooks/use-site'

//import useSearch, { SEARCH_STATE_LOADED } from '../../hooks/use-search';
//import { postPathBySlug } from 'lib/posts';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from '../../lib/menus';


import styles from './Nav.module.scss';
import NavListItem from '../../components/NavListItem';
import logo from '../../../public/images/logos-blanco-fribuffet-e1681759569645.png';
import imagenSomos from '../../../public/images/nous-sommes-grupo-infrico-horizontal.png';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Nav = () => {
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  //const  { menus }  = useSite();
  //console.log(menus)
  //const { title } = metadata;

  const navigationLocation = process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || MENU_LOCATION_NAVIGATION_DEFAULT;

  const [navigation, setNavigation] = useState('');
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {        
        //const navigation = findMenuByLocation(menus, navigationLocation);
        const result = await findMenuByLocation( navigationLocation);      
        //console.dir(`result T ${JSON.stringify(result.dataParsed)} ` )
        setNavigation(result.dataParsed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const { query, results, search, clearSearch, state } = useSearch({
  //   maxResults: 5,
  // });

  //const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    // When the search box opens up, additionall find the search input and focus
    // on the element so someone can start typing right away

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  /**
   * addDocumentOnClick
   */

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * removeDocumentOnClick
   */

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * handleOnDocumentClick
   */

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  /**
   * handleOnSearch
   */

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  /**
   * handleOnToggleSearch
   */

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  /**
   * addResultsRoving
   */

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  /**
   * removeResultsRoving
   */

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  /**
   * handleResultsRoving
   */

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  /**
   * escFunction
   */

  // pressing esc while search is focused will close it

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={`${styles.nav} primary-nav`}>
      {/* <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="col-span-2 ...">02</div>
        <div class="row-span-2 col-span-2 ...">03</div>
      </div> */}
      {/* <div class="grid grid-rows-2 grid-flow-col gap-4_ "> */}
      <div className="grid gap-4_">
        <div className="grid grid-cols-3 gap-4 ">
          <div className='hidden sm:block'>
            <div className={styles.navSearch}>
             
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Link href="/">
              <Image className="pt-2" src={logo} priority={true} width={230} height={230} alt="fribuffet logo" />
            </Link>
          </div>
          <div className="flex flex-row items-end justify-end">
            <Image src={imagenSomos} priority={true} width={230} height={230} alt="fribuffet logo" />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center py-3 grid-cols-1">
          <ul className={styles.navMenu}>
            {/* {navigation && navigation?.map((listItem) => {            
              return listItem.label              
            })} */}
            {navigation && navigation?.map((listItem) => {
              return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
            })}            
          </ul>
        </div>
      </div>
      {/* <Section className={styles.navSection}>
        <p className={styles.navName}>
          <Link href="/">
            <Image src={logo} priority={true} width={250} height={250} alt="fribuffet logo" />{' '}
          </Link>
        </p>
        <ul className={styles.navMenu}>
          {navigation?.map((listItem) => {
            return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
          })}
        </ul>
        <div className={styles.navSearch}>
          {searchVisibility === SEARCH_HIDDEN && (
            <button onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
              <span className="sr-only">Toggle Search</span>
              <FaSearch />
            </button>
          )}
          {searchVisibility === SEARCH_VISIBLE && (
            <form ref={formRef} action="/search" data-search-is-active={!!query}>
              <input
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                placeholder="Search..."
                required
              />
              <div className={styles.navSearchResults}>
                {results.length > 0 && (
                  <ul>
                    {results.map(({ slug, title }, index) => {
                      return (
                        <li key={slug}>
                          <Link tabIndex={index} href={postPathBySlug(slug)}>
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {results.length === 0 && (
                  <p>
                    Sorry, not finding anything for <strong>{query}</strong>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Section> */}
    </nav>
  );
};

export default Nav;
