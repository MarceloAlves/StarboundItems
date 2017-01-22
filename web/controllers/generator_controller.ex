defmodule StarboundItems.GeneratorController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Generator

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
