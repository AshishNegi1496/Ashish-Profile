#!/usr/bin/env bash
host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "⏳ Waiting for $host:$port..."
  sleep 2
done

echo "✅ $host:$port is up. Running: $cmd"
exec $cmd
