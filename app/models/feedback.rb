class Feedback < ApplicationRecord
	validates :name, :rating, :comment, presence: true
end
