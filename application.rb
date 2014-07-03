require 'sinatra'
require 'sinatra-websocket'
require 'mongoid'
require 'haml'

class TPoint
  include Mongoid::Document
  field :time
  field :experiment
  field :temp
  store_in session: "default"
end

class DataFile
  include Mongoid::Document
  field :time, type: DateTime
  field :ambient, type: String
  field :temp, type: String
  field :experiment, type: String
  store_in session: "default"
end

class DPoint < DataFile
end

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

  get '/latest' do
    if !request.websocket?
      haml :latest
    else
      request.websocket do |ws|
        ws.onopen do
          warn("websocket open")
          settings.sockets << ws
        end
        ws.onmessage do |msg|
          #EM.next_tick { settings.sockets.each{|s| s.send(msg) } }
          EM::PeriodicTimer.new(5) do 
            settings.sockets.each{|s| s.send( DPoint.last.temp.to_s ) }
          end
        end
        ws.onclose do
          warn("websocket closed")
          settings.sockets.delete(ws)
        end
      end
    end

  end

end
