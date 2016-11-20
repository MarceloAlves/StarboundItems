defmodule StarboundItems.SearchController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Search

  import Tirexs.Search
  import Tirexs.Query
  import Exredis

  def index(conn, %{"type" => type, "term" => term}) do
    query_results = create_query(type, term) |> run_query |> pluck_results
    save_stats(term)
    render(conn, "index.json", search: query_results)
  end

  defp create_query("list", term) do
    search [index: "starbound", type: "item", size: 300, sort: "itemName"] do
      query do
        string "*:*#{term}*"
      end
    end
  end

  defp create_query("tags", term) do
    search [index: "starbound", type: "item", size: 300, sort: "itemName"] do
      query do
        terms "tags", [term]
      end
    end
  end

  defp run_query(query) do
    {:ok, _status, results} = create_resource(query)
    results.hits.hits
  end

  defp pluck_results(results) do
    results |> Enum.map(fn(x) -> x._source end)
  end

  defp save_stats(term) do
    query(:redis, ["ZINCRBY", "search_terms", 1, term])
    query(:redis, ["INCR", "searches"])
  end
end
