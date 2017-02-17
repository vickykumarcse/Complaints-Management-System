class Ward < ApplicationRecord
	belongs_to :zone
	validates :wardno, :wardname, presence: true
	validates :wardno, uniqueness: true
end
