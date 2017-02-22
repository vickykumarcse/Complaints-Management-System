class FeedbackController < ApplicationController
	def new
		@feedback=Feedback.new(:name => params[:name], :rating => params[:rating], :comment => params[:comment])
		if @feedback.save
			notice="Feedback submitted successfully"
			redirect_to "https://cms-marauders.herokuapp.com"
		else
			notice="Feedback submission error!"
		end
	end

	def index
		@feedbacks=Feedback.all
	end
end