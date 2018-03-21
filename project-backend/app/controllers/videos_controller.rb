class VideosController < ApplicationController
  def update
    video = Video.find_by(id: params[:video_id])
    video.update(played: params[:played], playing: params[:playing], url: params[:url])
    render json: video
  end
end
