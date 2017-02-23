class FeedbackController < ApplicationController
	def new
		@feedback=Feedback.new(:name => params[:name], :rating => params[:rating], :comment => params[:comment])
		if @feedback.save
			flash[:notice]="Thank you for your feedback!"
			
		else
			flash[:notice]="Feedback submission error!"
		end
	end

	def index
		@feedbacks=Feedback.all
	end
end
