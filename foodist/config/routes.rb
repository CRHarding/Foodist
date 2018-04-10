Rails.application.routes.draw do
  resources :recipes, path: "api/recipes"
  resources :comments, path: "api/comments"
end
