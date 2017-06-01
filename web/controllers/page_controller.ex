defmodule Skunk1.PageController do
  use Skunk1.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
