defmodule StarboundItems.PageController do
  use StarboundItems.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
