Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    'CRdqay4hYX0j7jqfIUe5s1yex6KaaENX',
    '_IeBvtU4gYZFgGIeqvuEFjtRk3wh7y1cpLBE6cwv80dn34UqValf5ijUjjJd_aqh',
    'nikita-rails.auth0.com',
    callback_path: "/auth/oauth2/callback"
  )
end