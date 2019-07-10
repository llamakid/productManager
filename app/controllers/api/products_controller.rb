class Api::ProductsController < ApplicationController
    respond_to :json
  
    def index
      respond_with Product.order(available_date: :DESC)
    end
  
    def show
      respond_with Product.find(params[:id])
    end
  
    def create
      respond_with :api, Product.create(product_params)
    end
  
    def destroy
      respond_with Product.destroy(params[:id])
    end
  
    def update
      product = Product.find(params['id'])
      product.update(product_params)
      respond_with Product, json: product
    end
  
    private
  
    def product_params
      params.require(:product).permit(
        :id,
        :product_name,
        :available_date,
        :product_upc,
        :property_name,
        :property_value
      )
    end
  end