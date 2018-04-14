Rails.application.routes.draw do
  resources :recipes, path: "api/recipes"
  resources :comments, path: "api/comments"
  resources :users, path: "api/users"
  get 'users/current-user', to: "current_user#show"
  post 'api/login', to: "sessions#create"
end
