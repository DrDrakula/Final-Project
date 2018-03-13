class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :topic, :slug, :messages, :users
end
