class AddUserToWardAndUsertype < ActiveRecord::Migration[5.0]
  def change
      add_foreign_key :users, :wards, column:  :wardid, primary_key: :id
	  add_foreign_key :users, :usertypes, column:  :usertypeid, primary_key: :id
  end
end
