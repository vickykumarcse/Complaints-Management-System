class CreateComplains < ActiveRecord::Migration[5.0]
  def change
    create_table :complains do |t|
      t.string :admin_username
      t.string :public_username
      t.integer :wardid
      t.string :title
      t.text :description
      t.text :comment
      t.integer :votecount
      t.date :register_date
      t.date :resolved_date
      t.string :status
      t.string :imageurl
	
      t.timestamps
    end
  end
end
