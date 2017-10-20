require 'nokogiri'
require 'open-uri'
require 'json'

module Api::V1
  class UsersController < ApplicationController
    def index
      # @users = User.all
      # render json: @users

      def statScraper(gameVersion, gameDate)
        # puts "### Getting the RAW HTML of the page"
        urlGameVersion = gameVersion
        urlGameDate = gameDate
        html = open("http://scores.nbcsports.msnbc.com/ticker/data/gamesMSNBC.js.asp?sport=#{urlGameVersion}&period=#{urlGameDate}").read
        
        
        parsedVar = JSON.parse(html)
        gameDate = parsedVar['period']
        gameType = parsedVar['sport']
        # puts gameDate
        
        indivGame = parsedVar['games'][0]
        indivGame.gsub!('\"', '"')
        doc = Nokogiri::XML(indivGame)
        
        #Parsing the escaped XML
        homeTeamVar = doc.at_xpath('//home-team')
        awayTeamVar = doc.at_xpath('//visiting-team')
        gameVariables = doc.at_xpath('//gamestate')
        
        # All Game Details
        deliverToClient = {
            gameType: gameType,
            gameDate: gameDate,
            gameTime: gameVariables.attr('gametime'),
        
            homeTeamName: homeTeamVar.attr('display_name'),
            homeNickName: homeTeamVar.attr('nickname'),
            homeTeamLogo: homeTeamVar.at_xpath('//team-logo').attr('link'),
            homeTeamImage: homeTeamVar.at_xpath('//team-logo').attr('gz-image'),
            homeScore: homeTeamVar.attr('score'),
            homeAlias: homeTeamVar.attr('alias'),
        
            awayTeamName:awayTeamVar.attr('display_name'),
            awayNickName:awayTeamVar.attr('nickname'),
            awayTeamLogo: awayTeamVar.at_xpath('//team-logo').attr('link'),
            awayTeamImage: awayTeamVar.at_xpath('//team-logo').attr('gz-image'),
            awayScore:awayTeamVar.attr('score'),
            awayAlias:awayTeamVar.attr('alias')
        }
        
        puts deliverToClient[:homeScore]
        puts deliverToClient[:awayScore]
        
        # Deciding Winner and Loser
        if deliverToClient[:homeScore].to_i > deliverToClient[:awayScore].to_i
            deliverToClient[:gameWinner] = deliverToClient[:homeTeamName] + " " + deliverToClient[:homeNickName]
        elsif deliverToClient[:homeScore].to_i === deliverToClient[:awayScore].to_i
            deliverToClient[:gameWinner] = "Tie game"
        else
            deliverToClient[:gameWinner] = deliverToClient[:awayTeamName] + " " + deliverToClient[:awayNickName]
        end
        
        #JSON VERSION
        deliverToClientJson = JSON.pretty_generate(deliverToClient)
        return deliverToClientJson
      end

      @scores = statScraper("MLB", "20171018")
      render json: @scores
    end
  end


end
