defmodule StarboundItems.StatsController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Stats

  import Number.Delimit
  import Tirexs.HTTP
  import Exredis

  def index(conn, _params) do

    terms = query(:redis, ["ZREVRANGE", "search_terms", 0, 9, "WITHSCORES"]) |>
      Enum.chunk(2) |>
      Enum.with_index() |>
      Enum.map(fn(x) -> format_result(x) end)

    total_items = get_elasticsearch_total |>
      number_to_delimited(precision: 0)

    searches = query(:redis, ["GET", "searches"]) |>
      number_to_delimited(precision: 0)

    render(conn, "index.html", search_terms: terms, total_items: total_items, searches: searches, page_title: "Stats - Starbound Items")
  end

  defp format_result(result) do
    {[term, score], index} = result
    %{term: term, score: number_to_delimited(score, precision: 0), index: index}
  end

  defp get_elasticsearch_total do
    {:ok, _status, results} = get("_all/_stats")
    results._all.primaries.docs.count
  end
end
