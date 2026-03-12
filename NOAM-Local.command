#!/bin/zsh
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

if [ ! -f package.json ]; then
  echo "No se encontro package.json en: $PROJECT_DIR"
  echo "Presiona Enter para cerrar..."
  read -r
  exit 1
fi

# Evita errores de cache de Next en arranques previos
rm -rf .next

# Instala dependencias solo si faltan
if [ ! -d node_modules ]; then
  echo "Instalando dependencias..."
  npm install
fi

# Abre el navegador unos segundos despues de iniciar el server
( sleep 3; open "http://localhost:3000" ) &

echo "Iniciando NOAM en local..."
echo "Para detener, usa Ctrl + C"
npm run dev
