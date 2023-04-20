$ErrorActionPreference = "Stop"

function Run {
	Set-Location -Path "./Client"
	npm run build
	Set-Location -Path "../Server"
	npm run dev
	Set-Location -Path "../"
}

function Install {
	Set-Location -Path "./Client"
	npm install
	Set-Location -Path "../Server"
	npm install
	Set-Location -Path "../"
}

$targets = @{
	"run"     = { Run }
	"install" = { Install }
}

if ($args.Count -eq 0) {
	Write-Host "Usage: `n`make target`n`nTargets:`n`n$($targets.Keys -join "`n")"
	exit 1
}

$target = $args[0]

if (-not $targets.ContainsKey($target)) {
	Write-Error "Target not found: $target"
	exit 1
}

Invoke-Command $targets[$target]
