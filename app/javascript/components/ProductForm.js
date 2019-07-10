import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, isEmptyObject, validateProduct } from '../helpers/helpers';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { Link } from 'react-router-dom';
import ProductNotFound from './ProductNotFound';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        product: props.product,
        errors: {},
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateProduct('available_date', formattedDate);
      },
    });
  }

  componentWillReceiveProps({ product }) {
    this.setState({ product });
  }

  updateProduct(key, value) {
    this.setState(prevState => ({
      product: {
        ...prevState.product,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const errors = validateProduct(product);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(product);
    }
  }

  validateProduct(product) {
    const errors = {};

    if (product.product_name === '') {
      errors.product_name = 'You must enter a product name';
    }

    if (product.available_date === '') {
      errors.available_date = 'You must enter a valid date';
    }

    if (product.product_upc === '') {
      errors.title = 'You must enter a upc';
    }

    if (product.property_name === '') {
      errors.property_name = 'You must enter a property name';
    }

    if (product.property_value === '') {
      errors.property_value = 'You must enter a property value';
    }

    console.log(product);
    return errors;
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  handleInputChange(product) {
    const { target } = product;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateProduct(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the product from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { product } = this.state;
    const { path } = this.props;
    
    if (!product.id && path === '/products/:id/edit') return <ProductNotFound />;
    
    const cancelURL = product.id ? `/products/${product.id}` : '/products';
    const title = product.id ? `${product.product_name} - ${product.available_date}` : 'New Product';


    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="productForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="product_name">
              <strong>Name:</strong>
              <input 
                type="text" 
                id="product_name" 
                name="product_name" 
                onChange={this.handleInputChange}
                value={product.product_name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="available_date">
                <strong>Date:</strong>
                <input
                  type="text"
                  id="available_date"
                  name="available_date"
                  ref={this.dateInput}
                  autoComplete="off"
                  value={product.available_date}
                  onChange={this.handleInputChange}
                />
            </label>
            </div>
          <div>
            <label htmlFor="product_upc">
              <strong>UPC:</strong>
              <input
                id="product_upc" 
                name="product_upc" 
                onChange={this.handleInputChange}
                value={product.product_upc}
              />
            </label>
          </div>
          <div>
            <label htmlFor="property_name">
              <strong>Property Name:</strong>
              <input 
                type="text" 
                id="property_name" 
                name="property_name" 
                onChange={this.handleInputChange}
                value={product.property_name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="property_value">
              <strong>Property Value:</strong>
              <input 
                type="text" 
                id="property_value" 
                name="property_value" 
                onChange={this.handleInputChange}
                value={product.property_value}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

ProductForm.propTypes = {
    product: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
  };

  ProductForm.defaultProps = {
    product: {
      product_name: '',
      available_date: '',
      product_upc: '',
      property_name: '',
      property_value: '',
    },
  };

export default ProductForm;