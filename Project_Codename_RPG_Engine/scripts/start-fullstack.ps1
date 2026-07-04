param(
  [int]$Port = 8090,
  [string]$StaticDir = ""
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot

if (-not $StaticDir) {
  $StaticDir = Join-Path $projectRoot "dist-fullstack"
}

$env:PORT = [string]$Port
$env:RPG_STATIC_DIR = $StaticDir

Set-Location $projectRoot
node server\index.js

