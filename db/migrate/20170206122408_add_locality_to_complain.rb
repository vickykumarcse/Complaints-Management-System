class AddLocalityToComplain < ActiveRecord::Migration[5.0]
  def change
	 add_column :complains, :locality, :string
  end
end
