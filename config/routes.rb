Rails.application.routes.draw do
  root to: redirect('/products')

  get 'products', to: 'site#index'
  get 'products/new', to: 'site#index'
  get 'products/:id', to: 'site#index'
  get 'products/:id/edit', to: 'site#index'
  
  namespace :api do
    resources :products, only: %i[index show create destroy update]
  end
end
