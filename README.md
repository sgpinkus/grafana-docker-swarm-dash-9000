# OVERVIEW
Attempted full grafana / prometheus / loki stack monitoring a docker (swarm cluster) using docker-compose:

  - grafana
  - prometheus
  - loki
  - promtail
  - cadvisor
  - node-exporter
  - sample app (writes logs to a file in a bind mount volume share with promtail)

Impossible to really simulate actual cluster with docker-compose:

  - Apparently node-exporter has trouble getting access to all bare system metrics.
  - We are not monitoring log journal or many containers - just a single app.
