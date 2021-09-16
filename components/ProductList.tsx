import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Button, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';
import store from 'store-js';

interface Product {
  title: string;
  handle: string;
  id: string;
  images: {
    edges: {
      node: {
        originalSrc: string;
        altText: string;
      }
    }
  }
  variants: {
    edges: {
      node: {
        price: number;
        id: string;
      }
    }
  }
 }

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, { variables: { ids: store.get('ids') } })
  console.log(store.get("ids"))
    if (loading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>
  console.log("this id data",data)

  return (
    <div>

          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Product", plural: "Products" }}
              items={data.nodes}
              renderItem={(item: Product) => {
                const media = (
                 <Thumbnail
                    source={
                      item.images.edges[0]  ? item.images.edges[0].node.originalSrc : ""
                    }
                    alt={item.images.edges[0] ? item.images.edges[0].altText : ""}
                  />
                )
                const price = item.variants.edges[0].node.price
                return (
                    // @ts-ignore
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    accessibilityLabel={`View details for ${item.title}`}
                  >
                  <Stack>
                      <Stack.Item fill>
                        <h3>
                        <TextStyle variation="strong">
                           {item.title}
                        </TextStyle>
                        </h3>

                      </Stack.Item>
                      <Stack.Item>
                        <p>${price}</p>
                      </Stack.Item>
                      </Stack>
                      </ResourceList.Item>

                )
              }}
            />
          </Card>
        )

    </div>
  )
}

export default ProductList
