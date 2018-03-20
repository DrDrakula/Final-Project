class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :topic, :slug, :messages, :users, :password, :video
end
