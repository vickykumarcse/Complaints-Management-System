class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	has_many :complains
	
	validates :username, :firstname, :lastname, :contactno, :email, :wardid, presence: true
	validates :username, :email, :contactno, uniqueness: true
	
	validates :contactno, length: { is: 10 }
	
end
