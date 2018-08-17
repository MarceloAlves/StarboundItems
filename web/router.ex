defmodule StarboundItems.Router do
  use StarboundItems.Web, :router

  pipeline :browser do
    plug StarboundItems.Plugs.RewriteURL
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", StarboundItems do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/tags", TagController, only: [:index]
    resources "/stats", StatsController, only: [:index]
    resources "/all", ItemsController, param: "offset", only: [:index, :show]
    resources "/generator", GeneratorController, only: [:index]
  end

  scope "/api", StarboundItems do
    pipe_through :api

    resources "/search", SearchController, only: [:index]
    resources "/recipes", RecipeController, only: [:index]
  end

  # Other scopes may use custom stacks.
  # scope "/api", StarboundItems do
  #   pipe_through :api
  # end
end
