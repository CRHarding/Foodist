class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
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
    params.require(:recipes).permit(:name, :ingredient_list, :instruction_list, :user_id, :votes)
  end
end
