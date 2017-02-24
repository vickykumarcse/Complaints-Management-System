OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '588389951365540', '8e70e44d77635bb1d5dea15a8407f487', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
end