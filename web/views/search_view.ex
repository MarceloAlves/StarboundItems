defmodule StarboundItems.SearchView do
  use StarboundItems.Web, :view

  def render("index.json", %{search: search}) do
    %{data: render_many(search, StarboundItems.SearchView, "search.json")}
  end

  def render("search.json", %{search: search}) do
    %{id: search.id,
      itemName: search.itemName,
      shortdescription: search.shortdescription,
      description: search.description,
      inventoryIcon: search.inventoryIcon,
      type: search.type,
      # tags: search.tags,
      rarity: search.rarity}
  end
end
