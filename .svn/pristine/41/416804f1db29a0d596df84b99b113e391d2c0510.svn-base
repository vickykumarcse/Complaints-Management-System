class AddComplainToUserAndWard < ActiveRecord::Migration[5.0]
  def change
	  add_foreign_key :complains, :users, column:  :admin_username, primary_key: :username
	  add_foreign_key :complains, :users, column:  :public_username, primary_key: :username
	  add_foreign_key :complains, :wards, column:  :wardid, primary_key: :id
  end
end
