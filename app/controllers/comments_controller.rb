class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]
  def index
    @comments = Comment.order(comment_votes: :desc, created_at: :desc)
    render json: {
      message: "Got all the comments",
      data: @comments
    }
  end

  def show
    @comment = Comment.find(params[:id])
    render json: {
      message: "Got the comment",
      comment: @comment
    }
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.save
    render json: {
      message: "Saved comment",
      comment: @comment
    }
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    render json: {
      message: "Updated",
      comment: @comment
    }
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.delete
    render json: {
      message: "Deleted correctly",
      comment: params[:id]
    }
  end

  private
  def comment_params
    params.permit(:poster_id, :recipe_id, :poster_email, :poster_name, :title, :description, :previous_comment, {:next_comments => []}, :comment_votes, :id)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
