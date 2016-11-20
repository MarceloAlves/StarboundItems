defmodule StarboundItems.ItemsControllerTest do
  use StarboundItems.ConnCase

  alias StarboundItems.Items
  @valid_attrs %{}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, items_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing items"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, items_path(conn, :new)
    assert html_response(conn, 200) =~ "New items"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, items_path(conn, :create), items: @valid_attrs
    assert redirected_to(conn) == items_path(conn, :index)
    assert Repo.get_by(Items, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, items_path(conn, :create), items: @invalid_attrs
    assert html_response(conn, 200) =~ "New items"
  end

  test "shows chosen resource", %{conn: conn} do
    items = Repo.insert! %Items{}
    conn = get conn, items_path(conn, :show, items)
    assert html_response(conn, 200) =~ "Show items"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, items_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    items = Repo.insert! %Items{}
    conn = get conn, items_path(conn, :edit, items)
    assert html_response(conn, 200) =~ "Edit items"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    items = Repo.insert! %Items{}
    conn = put conn, items_path(conn, :update, items), items: @valid_attrs
    assert redirected_to(conn) == items_path(conn, :show, items)
    assert Repo.get_by(Items, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    items = Repo.insert! %Items{}
    conn = put conn, items_path(conn, :update, items), items: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit items"
  end

  test "deletes chosen resource", %{conn: conn} do
    items = Repo.insert! %Items{}
    conn = delete conn, items_path(conn, :delete, items)
    assert redirected_to(conn) == items_path(conn, :index)
    refute Repo.get(Items, items.id)
  end
end
