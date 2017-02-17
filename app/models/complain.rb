require 'csv'
class Complain < ApplicationRecord
	validates :title, :description, :locality, :imageurl, presence: true
	mount_uploader :imageurl, ImageurlUploader
    
    def self.to_csv(options= {})
  CSV.generate(options) do |csv|
    csv << column_names
    all.each do |complain|
      csv << complain.attributes.values_at(*column_names)
    end
  end
end

end