class Api::V1::BetsUsersController < ApplicationController

  def index
    @betsUsers=BetUser.where(user_id: current_user.id)
    render json: @betsUsers
  end

  def update
    # Finds bet_user using user_id and bet_id
    @betUser=BetUser.where(user_id: current_user[:id]).find_by(bet_id: params[:bet_id])
    @user = User.find(current_user[:id])
    @bet=Bet.find(@betUser.bet_id)
    @betUser[:has_accepted] = params[:has_accepted]
    if @bet.mediator_id != @user.id && @betUser[:has_accepted] === true
        @user.points -= 100
    end
    @user.save!(validate: false)
    @betUser[:possibility_id] = params[:possibility_id]
    @betUser.save!
    # Returning json to make sure column has been updated
    render json: @betUser
    #binding.pry
  end

end
