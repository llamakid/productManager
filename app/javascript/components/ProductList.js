import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
      };

      this.searchInput = React.createRef();
      this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, published, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;
  
    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }
  
  renderProducts() {
    const { activeId, products } = this.props;
    const filteredProducts = products
    .filter(el => this.matchSearchTerm(el))
    .sort((a, b) => new Date(b.available_date) - new Date(a.available_date));

    return filteredProducts.map(product => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`} className={activeId === product.id ? 'active' : ''}>
            {product.product_name}
            {' - '}
            {product.available_date}
          </Link>
        </li>
    ));
  }

  render() {
    return (
      <section className="productList">
        <h2>
          Products
          <Link to="/products/new">New Product</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />

        <ul>{this.renderProducts()}</ul>
      </section>
    );
  }
}

ProductList.propTypes = {
    activeId: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.object),
};

ProductList.defaultProps = {
    activeId: undefined,
    products: [],
};

export default ProductList;