# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :skunk1,
  ecto_repos: [Skunk1.Repo]

# Configures the endpoint
config :skunk1, Skunk1.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KCOMPGXBvXFd7+SNBZmGpaVQ9gJc1C9tX7dPmRFbFIX7ocU9AU09Te+SRttSl/s8",
  render_errors: [view: Skunk1.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Skunk1.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
