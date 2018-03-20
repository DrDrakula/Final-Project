class VideoChannel < ApplicationCable::Channel
  def subscribed
    video = Video.find_by(id: params[:video_id])
    stream_for video
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
