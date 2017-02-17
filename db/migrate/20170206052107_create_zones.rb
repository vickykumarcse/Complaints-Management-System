class CreateZones < ActiveRecord::Migration[5.0]
  def change
    create_table :zones do |t|
      t.string :zonename
      t.string :admin_username
	  
    end
  end
end
