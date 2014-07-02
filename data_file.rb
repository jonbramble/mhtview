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
  field :ambient
  field :temp
  field :experiment
  store_in session: "default"
end

class DPoint < DataFile
end