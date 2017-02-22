class Feedback < ApplicationRecord
	validates :title, :rating, :comment, presence: true
end
