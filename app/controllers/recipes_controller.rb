class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :update, :destroy]
  def index
    @recipes = Recipe.order(votes: :desc, created_at: :desc)
    render json: {
      message: "Got all the recipes",
      data: @recipes
    }
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: {
      message: "Got the recipe",
      recipe: @recipe
    }
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.save
    render json: {
      message: "Saved recipe",
      recipe: @recipe
    }
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update(recipe_params)
    render json: {
      message: "Updated",
      recipe: @recipe
    }
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.delete
    render json: {
      message: "Deleted correctly",
      recipe: params[:id]
    }
  end

  private
  def recipe_params
    params.permit(:name, :ingredient_list, :instruction_list, :user_id, :votes)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end
end
