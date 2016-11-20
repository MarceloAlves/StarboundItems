defmodule StarboundItems.StatsControllerTest do
  use StarboundItems.ConnCase

  alias StarboundItems.Stats
  @valid_attrs %{}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, stats_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing stats"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, stats_path(conn, :new)
    assert html_response(conn, 200) =~ "New stats"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, stats_path(conn, :create), stats: @valid_attrs
    assert redirected_to(conn) == stats_path(conn, :index)
    assert Repo.get_by(Stats, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, stats_path(conn, :create), stats: @invalid_attrs
    assert html_response(conn, 200) =~ "New stats"
  end

  test "shows chosen resource", %{conn: conn} do
    stats = Repo.insert! %Stats{}
    conn = get conn, stats_path(conn, :show, stats)
    assert html_response(conn, 200) =~ "Show stats"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, stats_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    stats = Repo.insert! %Stats{}
    conn = get conn, stats_path(conn, :edit, stats)
    assert html_response(conn, 200) =~ "Edit stats"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    stats = Repo.insert! %Stats{}
    conn = put conn, stats_path(conn, :update, stats), stats: @valid_attrs
    assert redirected_to(conn) == stats_path(conn, :show, stats)
    assert Repo.get_by(Stats, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    stats = Repo.insert! %Stats{}
    conn = put conn, stats_path(conn, :update, stats), stats: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit stats"
  end

  test "deletes chosen resource", %{conn: conn} do
    stats = Repo.insert! %Stats{}
    conn = delete conn, stats_path(conn, :delete, stats)
    assert redirected_to(conn) == stats_path(conn, :index)
    refute Repo.get(Stats, stats.id)
  end
end
