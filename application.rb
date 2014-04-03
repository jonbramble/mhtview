require 'sinatra'
require 'mongoid'
require 'haml'

Mongoid.load!("mongoid.yml",:production)

class PHPoint
	include Mongoid::Document
	field :time
	field :experiment
	field :ph
	store_in session: "default"
end

class EHPoint
	include Mongoid::Document
	field :time
	field :experiment
	field :mv
	store_in session: "default"
end

class Application < Sinatra::Base	
	set :haml, :format => :html5

	get '/' do
		#@data = PHPoint.where(experiment: "TEST0001").last
  		haml :index
  	end

  	get '/experiment/:experiment' do
  		exp = params[:experiment]
  		@ph = PHPoint.where(experiment: exp).last
  		@eh = EHPoint.where(experiment: exp).last
  		haml :experiment
  	end

  	get '/experiment/:experiment/data.json' do

  		content_type :json
  		exp = params[:experiment]
  		ph_data = PHPoint.where(experiment: exp).order_by(time: "desc")
  		eh_data = EHPoint.where(experiment: exp).order_by(time: "desc")

  		h = {phdata: ph_data, ehdata: eh_data}.to_json

  		return h
  	end
  end