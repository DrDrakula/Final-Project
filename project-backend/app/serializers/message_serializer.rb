class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :chatroom
end
