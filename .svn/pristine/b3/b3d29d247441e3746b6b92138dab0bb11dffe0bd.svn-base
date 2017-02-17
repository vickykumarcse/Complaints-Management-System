class Zone < ApplicationRecord
	has_many :wards
	validates :zonename, :admin_username, presence: true
	validates :zonename, :admin_username, uniqueness: true
end
