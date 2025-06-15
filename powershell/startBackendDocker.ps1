$backendRoute = "./backend"
$backDockerfile = "$backendRoute/Dockerfile"
$backendName = "backend"
$selectedOption = $null

[string]$formText = @"
Please select an option:
1 - Build & Run backend
"@

function Select-Option {
    $parsedNumber = $null
    do {
        $input = Read-Host $formText
        $isValid = [int]::TryParse($input, [ref]$parsedNumber)

        if (-not $isValid) {
            Write-Host "Invalid number, try again." -ForegroundColor Red
        }
    } while (-not $isValid)

    return $parsedNumber
}

function Build-DockerImage {
    param(
        [string]$Route,
        [string]$Name
    )
    docker build -f "$Route/Dockerfile" -t $Name $Route
}

function Start-DockerImage {
    param(
        [string]$ContainerName,
        [string]$ImageName,
        [string]$Network = "bridge",
        [int]$PortIn,
        [int]$PortOut,
        [switch]$Daemon
    )

    if (-not $Daemon -and -not $PortIn -and -not $PortOut) {
        Start-DockerBasic -ContainerName $ContainerName -ImageName $ImageName -Network $Network
        return
    }

    if ($PortIn -and $PortOut -and -not $Daemon) {
        Start-DockerWithPort -ContainerName $ContainerName -ImageName $ImageName -Network $Network -PortIn $PortIn -PortOut $PortOut
        return
    }

    if ($Daemon) {
        Start-DockerDaemon -ContainerName $ContainerName -ImageName $ImageName -Network $Network -PortIn $PortIn -PortOut $PortOut
        return
    }
}

function Start-DockerDaemon {
    param(
        [string]$ContainerName,
        [string]$ImageName,
        [string]$Network,
        [int]$PortIn,
        [int]$PortOut
    )
    $portMapping = ""
    if ($PortIn -and $PortOut) {
        $portMapping = "-p $PortIn`:$PortOut"
    }
    docker run --network $Network -d --name $ContainerName $portMapping $ImageName
}

function Start-DockerWithPort {
    param(
        [string]$ContainerName,
        [string]$ImageName,
        [string]$Network,
        [int]$PortIn,
        [int]$PortOut
    )
    docker run --network $Network --name $ContainerName -p "$PortIn`:$PortOut" $ImageName
}

function Start-DockerBasic {
    param(
        [string]$ContainerName,
        [string]$ImageName,
        [string]$Network
    )
    docker run --network $Network --name $ContainerName $ImageName
}

function Start-SelectedTask($selectedOption) {
    switch ($selectedOption) {
        1 {
            Build-DockerImage -Route $backendRoute -Name $backendName
            Start-DockerImage -ContainerName $backendName -ImageName $backendName -PortIn 8080 -PortOut 8080
        }
        Default {
            Write-Host "Invalid option selected."
        }
    }
}

try {
    $selectedOption = Select-Option
    Start-SelectedTask -selectedOption $selectedOption
    Write-Host "Docker container running successfully"
}
catch {
    Write-Error "An error occurred: $_"
}
finally {
    Read-Host -Prompt "`nScript finished. Press Enter to exit"
}
