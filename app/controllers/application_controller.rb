class ApplicationController < ActionController::Base
   protect_from_forgery with: :exception
   before_filter :configure_permitted_parameters, if: :devise_controller?
   before_action :authenticate_user!
   
protected
def configure_permitted_parameters
  devise_parameter_sanitizer.permit(:sign_up,keys:[:username,:firstname,:lastname,:contactno,:email,:wardid])
  devise_parameter_sanitizer.permit(:account_update,keys:[:username,:firstname,:lastname,:contactno,:email,:wardid])
end

def auth0_client
  creds = { client_id: Rails.application.secrets.auth0_client_id,
            client_secret: Rails.application.secrets.auth0_client_secret,
            api_version: 1,
            domain: Rails.application.secrets.auth0_domain }
  @auth0_client ||= Auth0Client.new(creds)
end
end
