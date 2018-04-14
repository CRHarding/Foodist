class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create]

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    @newUser = {}
    @newUser[:email] = params[:auth][:email]
    @newUser[:fname] = params[:auth][:fname]
    @newUser[:lname] = params[:auth][:lname]
    @newUser[:password] = params[:auth][:password]
    @newUser[:password_confirmation] = params[:auth][:password_confirmation]

    @user = User.new(@newUser)
    if @user.save
      render json: @user, status: 200
    end
  end

  private

    def user_params
      params.fetch(:users, {}).permit(:fname, :lname, :email, :password, :password_confirmation, :password_digest)
    end


end
