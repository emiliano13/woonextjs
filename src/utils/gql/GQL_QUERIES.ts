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
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        price
        id
        stockQuantity
      }
      ... on VariableProduct {
        salePrice
        regularPrice
        price
        id
        allPaColors {
          nodes {
            name
          }
        }
        allPaSizes {
          nodes {
            name
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            stockStatus
            stockQuantity
            purchasable
            onSale
            salePrice
            regularPrice
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
            }
          }
        }
        id
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
          sourceUrl
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
            sourceUrl
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
