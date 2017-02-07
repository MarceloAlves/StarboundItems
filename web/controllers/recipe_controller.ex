defmodule StarboundItems.RecipeController do
  use StarboundItems.Web, :controller

  alias StarboundItems.Recipe

  import Tirexs.Search
  import Tirexs.Query

  def index(conn, _params) do
    recipes = create_query |> run_query |> pluck_results
    render(conn, "index.json", recipes: recipes)
  end

  # def show(conn, %{"id" => id}) do
  #   recipe = Repo.get!(Recipe, id)
  #   render(conn, "show.json", recipe: recipe)
  # end

  defp create_query do
    search [index: "starbounditems", type: "item,object", size: 3000, sort: "name"] do
      query do
        string "has_recipe:true"
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
end
