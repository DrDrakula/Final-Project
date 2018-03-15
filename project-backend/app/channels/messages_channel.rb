class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'message'
  end

  def unsubscribed
  end

  def create(opts)
    Message.create(
      content: opts.fetch('content'),
      user_id: opts.fetch('user_id'),
      chatroom_id: opts.fetch('chatroom_id')
    )
  end
end
