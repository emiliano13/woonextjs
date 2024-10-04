import { gql } from '@apollo/client';

export const GET_SINGLE_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      averageRating
      slug
      description
      onSale
      featuredImage {
        node {
          id
          sourceUrl(size: WOOCOMMERCE_SINGLE)
          mediaItemUrl
          srcSet
          altText
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl(size: WOOCOMMERCE_SINGLE)
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        price
        id
        stockQuantity
      }
      
    }
  }
`;


export const GET_SINGLE_PRODUCT_BY_SLUG = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      averageRating
      slug
      description
      excerpt
      onSale
      featuredImage {
        node {
          id
          sourceUrl(size: WOOCOMMERCE_SINGLE)
          mediaItemUrl
          srcSet
          altText
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl(size: WOOCOMMERCE_SINGLE)
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        price
        id
        stockQuantity
      }
      
    }
  }
`;

/**
 * Fetch first 4 products from a specific category
 */

export const FETCH_FIRST_PRODUCTS_FROM_HOODIES_QUERY = `
 query MyQuery {
  products(first: 4, where: {category: "Hoodies"}) {
    nodes {
      productId
      name
      onSale
      slug
      image {
        sourceUrl
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
      }
    }
  }
}
 `;

/**
 * Fetch first 200 Woocommerce products from GraphQL
 */
export const FETCH_ALL_PRODUCTS_QUERY = gql`
  query MyQuery {
    products(first: 50) {
      nodes {
        databaseId
        name
        onSale
        slug
        image {
          sourceUrl(size: WOOCOMMERCE_SINGLE)
        }
        ... on SimpleProduct {
          databaseId
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          databaseId
          price
          regularPrice
          salePrice
          variations {
            nodes {
              price
              regularPrice
              salePrice
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch first 20 categories from GraphQL
 */
export const FETCH_ALL_CATEGORIES_QUERY = gql`
  query Categories {
    productCategories(first: 1000, where: { parent: 0, hideEmpty: true }) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl(size: WOOCOMMERCE_SINGLE)
        }
      }
    }
  }
`;

export const GET_PRODUCTS_FROM_CATEGORY = gql`
query ProductCategoryBySlug($slug: ID!) {
  productCategory(id: $slug, idType: SLUG) {

  # query ProductsFromCategory($id: ID!) {
  #   productCategory(id: $id) {
      id
      name
      products(first: 50) {
        nodes {
          id
          databaseId
          onSale
          averageRating
          slug
          description
          image {
            id
            uri
            title
            srcSet
            sourceUrl(size: WOOCOMMERCE_SINGLE)
          }
          name
          ... on SimpleProduct {
            salePrice
            regularPrice
            onSale
            price
            id
          }         
          
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
          }
          variation {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              attributes {
                nodes {
                  id
                  name
                  value
                }
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }

      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

/*** */
export const QUERY_PRODUCT_CATEGORY_BY_SLUG = gql`
  query ProductCategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      databaseId
      description
      name
      id
      slug
      children(where: { hideEmpty: true }) {
        nodes {
          name
          id
          databaseId
          count
          slug
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
          }
          products(first: 1) {
            nodes {
              name
              featuredImage {
                node {
                  sourceUrl(size: WOOCOMMERCE_SINGLE)
                }
              }
            }
          }
        }
      }
    }
  }
`;



export const QUERY_ALL_MENUS = gql`
  query AllMenus {
    menus {      
        nodes {
          id
          menuItems(first: 100) {
            edges {
              node {
                cssClasses
                id
                parentId
                label
                title
                target
                path
              }
            }
          }
          name
          slug
          locations
        }
      }
    }
  
`;


export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    id
    menuOrder
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;
export const QUERY_ALL_PAGES = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  }
`;




export const QUERY_GET_MENU_BY_LOCATION = gql`
  query GetMenuByLocation($slug: MenuLocationEnum!) {
    menus(where: {location: $slug}) {      
        nodes {
          id
          menuItems(first: 100) {            
              nodes {
                cssClasses
                id
                parentId
                label
                title
                target
                path
              }            
          }
          name
          slug
          locations
        }
      }
    }
  
`;


export const QUERY_ALL_CATEGORIES_MENU = gql`
  query AllProductCategoriesMenu {
    productCategories(first: 10000, where: { parent: 0, hideEmpty: true }) {
      nodes {
        name
        id
        children(where: { hideEmpty: true }) {
          edges {
            node {
              name
              slug
              id
              databaseId
              description
            }
          }
        }
        slug
        databaseId
        description
      }
    }
  }
`;