defmodule StarboundItems.SearchView do
  use StarboundItems.Web, :view

  def render("index.json", %{search: search}) do
    %{data: render_many(search, StarboundItems.SearchView, "search.json")}
  end

  def render("search.json", %{search: search}) do
    %{
      name: search.name,
      short_description: search.short_description,
      description: search.description,
      icon: search.icon,
      type: search.type,
      category: search.category,
      price: search.price,
      max_stack: search.max_stack,
      tags: search.tags,
      rarity: search.rarity}
  end
end
