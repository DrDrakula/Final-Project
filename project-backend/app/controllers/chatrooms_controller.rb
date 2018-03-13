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

  def show
    @chatroom = Chatroom.find_by(slug: params[:slug])
    render json: @chatroom
  end

  private

    def chatroom_params
      params.require(:chatroom).permit(:topic, :password)
    end
end
