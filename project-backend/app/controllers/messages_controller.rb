class MessagesController < ApplicationController

  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    user_id = token_user_id
    @message = Message.new(content: params[:content], chatroom_id: params[:chatroom_id], user_id: params[:user_id])
    # @message.user = current_user
    if @message.valid?
      @message.save
      # ActionCable.server.broadcast 'messages',
      #   message: @message.content,
      #   user: @message.user.username
      # head :ok
      render json: @message
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :chatroom_id)
  end

end
