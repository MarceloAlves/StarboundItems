defmodule StarboundItems.TagController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Tag

  def index(conn, _params) do
    render(conn, "index.html", page_title: "Colony Tags - Starbound Items")
  end

end
