Rails.application.routes.draw do
  root "welcome#about"

  post '/login', to: "sessions#login"
  delete '/logout', to: "sessions#destroy"

  get 'users/:id', to: "users#show", as: "profile"
  post '/chatrooms/:chatroom_id/add_message', to: 'chatrooms#add_message'
  post '/chatrooms/:chatroom_id/pause_video', to: 'chatrooms#pause_video'
  post '/chatrooms/:chatroom_id/play_video', to: 'chatrooms#play_video'

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

  resources :chatrooms, param: :slug
  resources :messages
  resources :users, only: [:index, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
