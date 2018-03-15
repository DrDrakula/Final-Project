class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast(
      'message',
      id: message.id,
      created_at: message.created_at.strftime('%H:%M'),
      username: User.find(message.user.id).username,
      content: message.content,
      user_id: message.user.id,
      chatroom_id: message.chatroom.id
    )
  end
end
