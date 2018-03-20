class ChatroomsController < ApplicationController

  def index
    @chatrooms = Chatroom.all
    render json: @chatrooms
  end


  def create
    @chatroom = Chatroom.new(chatroom_params)
    if @chatroom.valid?
      @chatroom.save
      @video = Video.create(url: 'https://www.youtube.com/watch?v=cmpRLQZkTb8', played: 0, playedSeconds: 0, playing: true, chatroom_id: @chatroom.id)
      render json: @chatroom
      # render json: {chatroom: @chatroom, video: @video}
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

  def pause_video
    chatroom = Chatroom.find(params[:chatroom_id])

    if chatroom
      video = Video.find(chatroom.video.id)
      video.update(playing: !video.playing)
      VideoChannel.broadcast_to(video, {
        type: 'PAUSE_VIDEO',
        payload: prepare_video(video)
      })
      render json: video
    else
      render json: {error: 'There was an error in pausing your video'}
    end
  end

  def play_video
    chatroom = Chatroom.find(params[:chatroom_id])

    if chatroom
      video = Video.find(chatroom.video.id)
      video.update(playing: !video.playing)
      VideoChannel.broadcast_to(video, {
        type: 'PLAY_VIDEO',
        payload: prepare_video(video)
      })
      render json: video
    else
      render json: {error: 'There was an error in playing your video'}
    end
  end

  def control_video
    chatroom = Chatroom.find(params[:chatroom_id])

    if chatroom
      video = Video.find(chatroom.video.id)
      video.update(played: params[:played])
      # byebug
      VideoChannel.broadcast_to(video, {
        type: 'CONTROL_VIDEO',
        payload: prepare_controls_for_video(video)
      })
      render json: video
    else
      render json: {error: 'There was an error in playing your video'}
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

  def prepare_video(video)
    video_hash = {
      playing: video.playing
    }
  end

  def prepare_controls_for_video(video)
    video_hash = {
      played: video.played
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
