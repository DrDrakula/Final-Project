class WelcomeController < ApplicationController

  # skip_before_action :authenticate_user!

  def about
    render json: {about: 'Welcome'}
  end
end
