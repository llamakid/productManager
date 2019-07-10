import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductNotFound from './ProductNotFound';

const Product = ({ product, onDelete }) => {
    if (!product) return <ProductNotFound />;

    return(
        <div className="productContainer">
            <h2>
            {product.product_name}
            {' - '}
            {product.available_date}
            <Link to={`/products/${product.id}/edit`}>Edit</Link>
            <button className="delete" type="button" onClick={() => onDelete(product.id)}>
                Delete
            </button>
            </h2>
            <ul>
            <li>
                <strong>Name:</strong>
                {' '}
                {product.product_name}
            </li>
            <li>
                <strong>Date:</strong>
                {' '}
                {product.available_date}
            </li>
            <li>
                <strong>UPC:</strong>
                {' '}
                {product.product_upc}
            </li>
            <li>
                <strong>Property Name:</strong>
                {' '}
                {product.property_name}
            </li>
            <li>
                <strong>Property Value:</strong>
                {' '}
                {product.property_value}
            </li>
            </ul>
        </div>
    );
};

Product.propTypes = {
  product: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Product.defaultProps = {
  product: undefined,
};

export default Product;