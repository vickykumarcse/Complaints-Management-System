class AddWardToZone < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :wards, :zones, column:  :zoneid, primary_key: :id
  end
end
