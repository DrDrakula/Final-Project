class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(username: params[:username], password: params[:password])
    if @user.valid?
      @user.save
      token = issue_token({ 'user_id': @user.id })
      render json: {'token': token, 'user_id': @user.id }
    else
      render json: {error: 'User already Exists'}
    end
  end
end
