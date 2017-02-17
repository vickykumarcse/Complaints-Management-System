# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

Complain.delete_all

user_type1 = Usertype.create(usertype: "admin")
user_type2 = Usertype.create(usertype: "public")

zones = Rails.root.join("public", "fixtures", "zone.csv")
wards = Rails.root.join("public", "fixtures", "ward.csv")

CSV.foreach(zones, headers: true) do |row|
  zone = row['zonename']
  admin_username = row['admin_username']
  options = {zonename: zone, admin_username: admin_username}
    zones = Zone.create!(options)  
end

CSV.foreach(wards, headers: true) do |row|
  wardno = row['wardno']
  wardname = row['wardname']
  zoneid = row['zoneid']
  options = {wardno: wardno, wardname: wardname, zoneid: zoneid}
  wards = Ward.create!(options)  
end
