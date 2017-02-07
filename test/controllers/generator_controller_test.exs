defmodule StarboundItems.GeneratorControllerTest do
  use StarboundItems.ConnCase

  alias StarboundItems.Generator
  @valid_attrs %{}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, generator_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing generator"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, generator_path(conn, :new)
    assert html_response(conn, 200) =~ "New generator"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, generator_path(conn, :create), generator: @valid_attrs
    assert redirected_to(conn) == generator_path(conn, :index)
    assert Repo.get_by(Generator, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, generator_path(conn, :create), generator: @invalid_attrs
    assert html_response(conn, 200) =~ "New generator"
  end

  test "shows chosen resource", %{conn: conn} do
    generator = Repo.insert! %Generator{}
    conn = get conn, generator_path(conn, :show, generator)
    assert html_response(conn, 200) =~ "Show generator"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, generator_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    generator = Repo.insert! %Generator{}
    conn = get conn, generator_path(conn, :edit, generator)
    assert html_response(conn, 200) =~ "Edit generator"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    generator = Repo.insert! %Generator{}
    conn = put conn, generator_path(conn, :update, generator), generator: @valid_attrs
    assert redirected_to(conn) == generator_path(conn, :show, generator)
    assert Repo.get_by(Generator, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    generator = Repo.insert! %Generator{}
    conn = put conn, generator_path(conn, :update, generator), generator: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit generator"
  end

  test "deletes chosen resource", %{conn: conn} do
    generator = Repo.insert! %Generator{}
    conn = delete conn, generator_path(conn, :delete, generator)
    assert redirected_to(conn) == generator_path(conn, :index)
    refute Repo.get(Generator, generator.id)
  end
end
