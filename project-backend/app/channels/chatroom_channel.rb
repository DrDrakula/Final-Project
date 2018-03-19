class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    chatroom = Chatroom.find_by(id: params[:chatroom_id])
    stream_for chatroom
  end

  def unsubscribed
  end
end
