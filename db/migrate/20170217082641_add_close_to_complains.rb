class AddCloseToComplains < ActiveRecord::Migration[5.0]
  def change
    add_column :complains, :close, :boolean
  end
end
