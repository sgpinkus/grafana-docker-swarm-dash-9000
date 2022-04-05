# OVERVIEW

[!screen shot](./screen.png)

A simple first crack at a grafana/prometheus/loki monitoring dash for a docker swarm cluster using docker-compose. Components:

  - grafana
  - prometheus
  - loki
  - promtail
  - cadvisor
  - node-exporter

*NOTES:*

  - All containers are running in host network and there is lots of bind mounting going on to enable bare system monitoring. Promtail is configured to scrape the local journald logs.
  - It's impossible to really simulate a multi-node swamr with a docker-compose which assumes single node. Dash works in swarm too but scraper confs need to be updated etc.

# CONFIGURATION
Docker daemon needs to be running locally, have metrics endpoint enabled, and use journald log-driver. Example:

    {
        "dns": ["8.8.8.8", "8.8.4.4"],
        "hosts": ["unix:///var/run/docker.sock"],
        "containerd": "/run/containerd/containerd.sock",
        "log-driver": "journald",
        "metrics-addr" : "127.0.0.1:9323",
        "experimental" : true
    }

# USAGE
Is like:

    docker-compose up

May take a while after grafana is up for metrics to start coming. Compose file is stateless.

# TODO

  - Apparently node-exporter has trouble getting access to all bare system metrics.
  - Sometimes when you have a container in a crash loop lots of containers show up. [AFAIK](https://stackoverflow.com/q/71706413/2038383_ it's annoyingly hard to filter time series to "running right now" rather than "was running then" in PromQL.
  - Better panels ... lots of tweaking ....
