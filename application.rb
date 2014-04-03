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
  end