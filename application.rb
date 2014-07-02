require 'sinatra'
require 'mongoid'
require 'haml'
require_relative 'data_file'

Mongoid.load!("mongoid.yml",:production)

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
  		@temp = DPoint.where(experiment: exp).last
  		haml :tunafish
  	end


  	get '/experiment/:experiment/data.json' do
  		content_type :json
  		exp = params[:experiment]
  		t_data = TPoint.where(experiment: exp).order_by(time: "desc")
  		
  		h = {tdata: t_data}.to_json

  		return h
  	end

	get '/tunafish/:experiment/data.json' do
  		content_type :json
  		exp = params[:experiment]
  		t_data = DPoint.where(experiment: exp).order_by(time: "desc")
  		
  		h = {tdata: t_data}.to_json

  		return h
  	end
  end
