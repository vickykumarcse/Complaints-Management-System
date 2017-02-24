OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '603277399878678', 'fb6642d127bd9e999f99f21ba9bb51c4', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
end