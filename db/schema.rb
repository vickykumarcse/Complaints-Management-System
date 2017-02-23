# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170222133229) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "complains", force: :cascade do |t|
    t.string   "admin_username"
    t.string   "public_username"
    t.integer  "wardid"
    t.string   "title"
    t.text     "description"
    t.text     "comment"
    t.integer  "votecount"
    t.date     "register_date"
    t.date     "resolved_date"
    t.string   "status"
    t.string   "imageurl"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "locality"
    t.boolean  "close"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string   "name"
    t.string   "rating"
    t.string   "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer  "complainid"
    t.string   "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "firstname"
    t.string   "lastname"
    t.bigint   "contactno"
    t.string   "email"
    t.integer  "wardid"
    t.integer  "usertypeid",             default: 2
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  create_table "usertypes", force: :cascade do |t|
    t.string "usertype"
  end

  create_table "votes", force: :cascade do |t|
    t.string   "votable_type"
    t.integer  "votable_id"
    t.string   "voter_type"
    t.integer  "voter_id"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
    t.index ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree
  end

  create_table "wards", force: :cascade do |t|
    t.integer "wardno"
    t.string  "wardname"
    t.integer "zoneid"
  end

  create_table "zones", force: :cascade do |t|
    t.string "zonename"
    t.string "admin_username"
  end

  add_foreign_key "complains", "users", column: "admin_username", primary_key: "username"
  add_foreign_key "complains", "users", column: "public_username", primary_key: "username"
  add_foreign_key "complains", "wards", column: "wardid"
  add_foreign_key "users", "usertypes", column: "usertypeid"
  add_foreign_key "users", "wards", column: "wardid"
  add_foreign_key "wards", "zones", column: "zoneid"
end
