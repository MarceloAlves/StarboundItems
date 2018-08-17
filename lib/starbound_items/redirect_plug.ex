defmodule StarboundItems.Plugs.RewriteURL do
  import Plug.Conn
  import Phoenix.Controller

  def init(default), do: default

  def call(conn, _) do
    conn
    |> redirect(external: "https://starbounditems.com")
    |> halt
  end
end
