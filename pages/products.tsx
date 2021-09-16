import React, { Component } from 'react';
import { Card,Layout,Page  } from "@shopify/polaris";

class Products extends Component {
    componentDidMount() {
        fetch('/getProducts').then(
                (res) => res.json()
            ).then(items => {
              console.log(items)
            });
    }
  render() {
    return (
      <Page>
        <Layout.AnnotatedSection
          title="products"
          description="List of products in this section"
        >
          <Card sectioned>
            <div>
              <p>List of product</p>
            </div>
          </Card>

        </Layout.AnnotatedSection>
      </Page>
    );
  }
}

export default Products;
