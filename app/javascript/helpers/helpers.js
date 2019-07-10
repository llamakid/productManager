import { error } from './notifications';

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateProduct = (product) => {
  const errors = {};

  if (product.product_name === '') {
    errors.product_name = 'You must enter a name';
  }

  if (!isValidDate(product.available_date)) {
    errors.available_date = 'You must enter a valid date';
  }

  if (product.product_upc === '') {
    errors.product_upc = 'You must enter a UPC';
  }

  if (product.property_name === '') {
    errors.property_name = 'You must enter a property name';
  }

  if (product.property_value === '') {
    errors.property_value = 'You must enter a property value';
  }

  return errors;
}

export const formatDate = (d) => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
  
    return `${MM}-${DD}-${YYYY}`;
  };

  export const handleAjaxError = (err) => {
    error('Something went wrong');
    console.warn(err);
  };