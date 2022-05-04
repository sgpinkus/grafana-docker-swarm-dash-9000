#!/bin/bash
# docker events --filter="type=container" --filter="type=service" --filter="type=node" --format '{{json .}}'  | jq '.'
docker events \
  --filter 'type=container' \
  --filter 'type=service' \
  --format 'type={{.Type}} action="{{.Action}}" scope={{.Scope}} exit_code="{{.Actor.Attributes.exitCode}}" container_name={{.Actor.Attributes.name}} image={{.Actor.Attributes.image}} swarm_stack="{{index .Actor.Attributes "com.docker.stack.namespace"}}" swarm_service="{{index .Actor.Attributes "com.docker.stack.namespace"}}"'
