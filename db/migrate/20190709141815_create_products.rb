class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :product_name
      t.date :available_date
      t.string :product_upc
      t.string :property_name
      t.string :property_value

      t.timestamps
    end
  end
end
