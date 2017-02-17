class AddDefaultValueToUsertypeidInUser < ActiveRecord::Migration[5.0]
  def change
	change_column :users, :usertypeid, :integer, :default => 2
  end
end
