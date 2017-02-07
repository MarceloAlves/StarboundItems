defmodule StarboundItems.SearchView do
  use StarboundItems.Web, :view

  def render("index.json", %{search: search}) do
    %{data: render_many(search, StarboundItems.SearchView, "search.json")}
  end

  def render("search.json", %{search: search}) do
    %{
      name: Map.get(search, :name, nil),
      short_description: Map.get(search, :short_description, nil),
      description: Map.get(search, :description, nil),
      icon: Map.get(search, :icon, nil),
      type: Map.get(search, :type, nil),
      category: Map.get(search, :category, nil),
      price: Map.get(search, :price, nil),
      max_stack: Map.get(search, :max_stack, nil),
      tags: Map.get(search, :tags, nil),
      rarity: Map.get(search, :rarity, nil),
      file: Map.get(search, :file, nil),
      has_recipe: Map.get(search, :has_recipe, nil),
      recipe_details: Map.get(search, :recipe_details, nil)}
  end
end
