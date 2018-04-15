class VotesController < ApplicationController
  def index
    @votes = Vote.all
    render json: {
      message: "Got all the votes",
      data: @votes
    }
  end

  def create
    @vote = Vote.new(vote_params)
    @vote.save
    render json: {
      message: "Saved vote",
      vote: @vote
    }
  end

  def update
    @vote = Vote.find(params[:id])
    @vote.update(vote_params)
    render json: {
      message: "Updated",
      vote: @vote
    }
  end

  private
  def vote_params
    params.permit(:user_id, :voter_id, :up, :down)
  end
end
