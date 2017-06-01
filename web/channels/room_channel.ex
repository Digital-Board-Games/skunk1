defmodule Skunk1.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> room_id, _params, socket) do
    IO.puts 'JOINED'
    {:ok, socket}
  end

  def handle_in("new_msg:" <> room_id, %{"body" => body}, socket) do
    broadcast! socket, "new_msg:" <> room_id, %{body: body}
    {:noreply, socket}
  end

  def handle_out("new_msg:" <> room_id, payload, socket) do
    push socket, "new_msg:" <> room_id, payload
    {:noreply, socket}
  end
end
