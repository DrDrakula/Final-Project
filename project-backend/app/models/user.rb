class User < ApplicationRecord
  has_secure_password
  has_many :messages
  has_many :chatrooms, through: :messages
  validates :username, uniqueness: true, presence: true
  validates :password, presence: true
end
