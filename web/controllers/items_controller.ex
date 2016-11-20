defmodule StarboundItems.ItemsController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Items

  import Tirexs.Search
  import Tirexs.Query
  import Tirexs.HTTP

  def index(conn, _params) do
    items = create_query |> run_query |> pluck_results
    total_pages = Float.ceil(get_elasticsearch_total / 200) |> round
    render(conn, "index.html", items: items,
      current_page: 1,
      total_items: get_elasticsearch_total,
      total_pages: total_pages,
      page_title: "All Items - Starbound Items")
  end

  def show(conn, %{"offset" => offset}) do
    {offset, _} = Integer.parse(offset)
    items = create_query((offset * 200) - 200) |> run_query |> pluck_results
    total_pages = Float.ceil(get_elasticsearch_total / 200) |> round
    render(conn, "index.html", items: items,
      current_page: offset,
      total_items: get_elasticsearch_total,
      total_pages: total_pages,
      page_title: "All Items - Page #{offset} - Starbound Items")
  end

  defp create_query(offset \\ 0) do
    search [index: "starbound", type: "item", size: 200, from: offset, sort: "itemName"] do
      query do
        string "*:*"
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

  defp get_elasticsearch_total do
    {:ok, _status, results} = get("_all/_stats")
    results._all.primaries.docs.count
  end
end
