import React from 'react';
import axios from 'axios';
import Header from './Header';
import ProductList from './ProductList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Product from './Product';
import { Switch } from 'react-router-dom';
import ProductForm from './ProductForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
    };

    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/products.json')
      .then(response => this.setState({ products: response.data }))
      .catch(handleAjaxError);
  }

  updateProduct(updatedProduct) {
    axios
      .put(`/api/products/${updatedProduct.id}.json`, updatedProduct)
      .then(() => {
        success('Product updated');
        const { products } = this.state;
        const idx = products.findIndex(product => product.id === updatedProduct.id);
        products[idx] = updatedProduct;
        const { history } = this.props;
        history.push(`/products/${updatedProduct.id}`);
        this.setState({ products });
      })
      .catch(handleAjaxError);
  }

  addProduct(newProduct) {
    axios
      .post('/api/products.json', newProduct)
      .then((response) => {
        success('Product Added!');
        const savedProduct = response.data;
        this.setState(prevState => ({
          products: [...prevState.products, savedProduct],
        }));
        const { history } = this.props;
        history.push(`/products/${savedProduct.id}`);
      })
      .catch(handleAjaxError);
  }

  deleteProduct(productId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/products/${productId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Product deleted');
            const { history } = this.props;
            history.push('/products');

            const { products } = this.state;
            this.setState({ products: products.filter(product => product.id !== productId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    const { products } = this.state;
    if (products === null) return null;

    const { match } = this.props;
    const productId = match.params.id;
    const product = products.find(e => e.id === Number(productId));

    return (
      <div>
        <Header />
        <div className="grid">
          <ProductList products={products} activeId={Number(productId)}/>
          <Switch>
            <PropsRoute path="/products/new" component={ProductForm} onSubmit={this.addProduct} />
            <PropsRoute
              exact
              path="/products/:id/edit"
              component={ProductForm}
              product={product}
              onSubmit={this.updateProduct}
            />
            <PropsRoute
              path="/products/:id"
              component={Product}
              product={product}
              onDelete={this.deleteProduct}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  };
  
  Editor.defaultProps = {
    match: undefined,
  };

export default Editor;