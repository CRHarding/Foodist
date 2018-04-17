Rails.application.routes.draw do
  resources :recipes, path: "api/recipes"
  resources :comments, path: "api/comments"
  resources :users, path: "api/users"
  resources :votes, path: "api/votes"
  get 'users/current-user', to: "current_user#show"
  post 'api/login', to: "sessions#create"
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
