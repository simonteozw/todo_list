Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '*path', to: "application#fallback_index_html", constraints: ->(request) do
        !request.xhr? && request.format.html?
        resources :items
        resources :lists
      
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
