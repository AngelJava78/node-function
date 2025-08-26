#!/bin/bash

declare -A config

# Cargar cada clave y valor en el array asociativo
while IFS="=" read -r key value; do
    config["$key"]="$value"
done < <(jq -r 'to_entries[] | "\(.key)=\(.value)"' config.json)

# Ejemplo: imprimir todos los pares clave-valor
for key in "${!config[@]}"; do
    echo "$key: ${config[$key]}"
done