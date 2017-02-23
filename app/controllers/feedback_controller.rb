class FeedbackController < ApplicationController
	def new
		if params[:name] !=""
			@feedback=Feedback.new(:name => params[:name], :rating => params[:rating], :comment => params[:comment])
			if @feedback.save
				flash[:success]="Thank you for your feedback!"
				
			else
				flash[:success]="Feedback submission error!"
			end
		else
			flash[:success]=""
	     end

	end

	def index
		@feedbacks=Feedback.all
	end
end
