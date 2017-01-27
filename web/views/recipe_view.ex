defmodule StarboundItems.RecipeView do
  use StarboundItems.Web, :view

  def render("index.json", %{recipes: recipes}) do
    %{data: render_many(recipes, StarboundItems.RecipeView, "recipe.json")}
  end

  def render("show.json", %{recipe: recipe}) do
    %{data: render_one(recipe, StarboundItems.RecipeView, "recipe.json")}
  end

  def render("recipe.json", %{recipe: recipe}) do
    %{name: Map.get(recipe, :name, nil),
      short_description: Map.get(recipe, :short_description, nil),
      description: Map.get(recipe, :description, nil),
      icon: Map.get(recipe, :icon, nil),
      type: Map.get(recipe, :type, nil),
      category: Map.get(recipe, :category, nil),
      price: Map.get(recipe, :price, nil),
      max_stack: Map.get(recipe, :max_stack, nil),
      tags: Map.get(recipe, :tags, nil),
      rarity: Map.get(recipe, :rarity, nil),
      file: Map.get(recipe, :file, nil),
      has_recipe: Map.get(recipe, :has_recipe, nil),
      recipe_details: Map.get(recipe, :recipe_details, nil)}
  end
end
