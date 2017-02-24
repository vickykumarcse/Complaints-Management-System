Rails.application.routes.draw do
  get 'auth0/callback'

  get 'auth0/failure'
    
  resources :upvotes
  devise_for :users,:controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

	scope "/admin" do
	resources :users
  end
    resources :complains do
        collection do
            get :myComplains
            get :report
            post :addvote
            get :close
        end
    end  
    resources :usertypes
  resources :wards
  resources :zones
  resources :feedbacks
 
  root to: "users#index"

 
 post "admin/users/show"
 post "complains/addvote"
    
  
 post "admin/users/show"
 post "complains/addvote"
    

  post "admin/users/show"
  get "/auth/oauth2/callback" => "auth0#callback"
  get "/auth/auth0/callback" => "auth0#callback"
  get "/auth/failure" => "auth0#failure"

  devise_scope :user do
	get '/users/sign_out' => 'devise/sessions#destroy'
    get '/users/edit'  => 'devise/registrations#edit'
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
