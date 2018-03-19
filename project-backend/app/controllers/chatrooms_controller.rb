class ChatroomsController < ApplicationController

  def index
    @chatrooms = Chatroom.all
    render json: @chatrooms
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)
    if @chatroom.valid?
      @chatroom.save
      render json: @chatroom
    else
      render json: {error: 'A Chatroom with this topic already exists'}
    end
  end

  def add_message
    chatroom = Chatroom.find(params[:chatroom_id])
    user = User.find(params[:user_id])

    if chatroom && user
      message = Message.create(content: params[:content], chatroom_id: chatroom.id, user_id: user.id)
      ChatroomChannel.broadcast_to(chatroom, {
        type: 'ADD_MESSAGE',
        payload: prepare_message(message)
      })

      render json: prepare_message(message)
    else
      render json: {error: 'There was an error in sending your message'}
    end
  end

  def prepare_message(message)
    message_hash = {
      id: message.id,
      content: message.content,
      username: message.user.username,
      user_id: message.user.id,
      created_at: message.created_at.strftime('%H:%M')
    }
  end

  def show
    @chatroom = Chatroom.find_by(slug: params[:slug])
    render json: @chatroom
  end

  private

    def chatroom_params
      params.require(:chatroom).permit(:topic, :password)
    end
end
