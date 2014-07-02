require 'sinatra'
require 'sinatra-websocket'
require 'mongoid'
require 'haml'

Mongoid.load!("mongoid.yml",:production)

class TPoint
	include Mongoid::Document
	field :time
	field :experiment
	field :temperature
	store_in session: "default"
end

class T2Point < TPoint
	field :ambient
end


class Application < Sinatra::Base	
	set :haml, :format => :html5
	set :server, 'thin'
	set :sockets, []

	get '/' do
  		haml :index
  	end

  	get '/experiment/:experiment' do
  		exp = params[:experiment]
  		@temp = TPoint.where(experiment: exp).last
  		haml :experiment
  	end

	get '/tunafish/:experiment' do
  		exp = params[:experiment]
  		@temp = T2Point.where(experiment: exp).last
  		haml :tunafish
  	end

	get '/tunafish/:experiment/data.json' do

  		content_type :json
  		exp = params[:experiment]
  		t_data = T2Point.where(experiment: exp).order_by(time: "desc")
  		
  		h = {tdata: t_data}.to_json

  		return h
  	end

  	get '/experiment/:experiment/data.json' do

  		content_type :json
  		exp = params[:experiment]
  		t_data = TPoint.where(experiment: exp).order_by(time: "desc")
  		
  		h = {tdata: t_data}.to_json

  		return h
  	end
  end
