<#
.SYNOPSIS
    Creates a timestamped backup of the current (or specified) directory.

.DESCRIPTION
    Copies all files (recursively) from the source directory into a new, 
    timestamped folder under the destination path. Optionally compresses the 
    backup into a ZIP file and logs errors.

.PARAMETER Destination
    The root folder where backups will be stored. Will be created if it doesn't exist.

.PARAMETER Source
    The directory to back up. Defaults to the current working directory.

.PARAMETER Compress
    Switch to compress the backup folder into a ZIP archive after the copy.

.PARAMETER LogFile
    Path to a file where errors will be written. Defaults to 'Backup-Directory.log' 
    in the destination folder.

.EXAMPLE
    .\Backup-Directory.ps1 -Destination 'D:\Backups' -Compress -Verbose

.NOTES
    Exit codes:
      0 = Success
      1 = Invalid parameters or failed to create destination
      2 = Error during copy/compress
#>
[CmdletBinding(SupportsShouldProcess, DefaultParameterSetName = 'Copy')]
param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateNotNullOrEmpty()]
    [string]$Destination,

    [Parameter(Position = 1)]
    [string]$Source = (Get-Location).ProviderPath,

    [switch]$Compress,

    [Parameter()]
    [string]$LogFile
)

begin {
    try {
        # Resolve full paths
        $Destination = Resolve-Path $Destination -ErrorAction Stop
    }
    catch {
        Write-Error "Destination path '$Destination' is invalid: $_"
        exit 1
    }

    if (-not (Test-Path $Destination)) {
        if ($PSCmdlet.ShouldProcess("Create directory", $Destination)) {
            try {
                New-Item -ItemType Directory -Path $Destination -Force -ErrorAction Stop | Out-Null
                Write-Verbose "Created backup root at: $Destination"
            }
            catch {
                Write-Error "Failed to create destination: $_"
                exit 1
            }
        }
    }

    # Prepare logfile
    if (-not $LogFile) {
        $LogFile = Join-Path $Destination 'Backup-Directory.log'
    }
    Write-Verbose "Logging errors to: $LogFile"

    # Timestamp and folder names
    $timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
    $srcLeaf = Split-Path $Source -Leaf
    $backupFolderName = "${srcLeaf}_Backup_$timestamp"
    $fullBackupPath = Join-Path $Destination $backupFolderName

    # Create the working backup directory
    if ($PSCmdlet.ShouldProcess("Create backup folder", $fullBackupPath)) {
        New-Item -ItemType Directory -Path $fullBackupPath -Force -ErrorAction Stop | Out-Null
    }
}

process {
    try {
        Write-Verbose "Starting copy from '$Source' to '$fullBackupPath'"
        Copy-Item -Path (Join-Path $Source '*') `
            -Destination $fullBackupPath `
            -Recurse `
            -Force `
            -ErrorAction Stop `
            -Verbose:$false `
            -PipelineVariable file | ForEach-Object {
            # Manual progress indicator
            Write-Progress -Activity "Backing up files" `
                -Status "Copying $_" `
                -PercentComplete (($file.GetIndex() / $(Get-ChildItem -Recurse -File $Source).Count) * 100)
        }
        Write-Host "✅ Copy completed: $fullBackupPath"
    }
    catch {
        $_ | Out-File -FilePath $LogFile -Append
        Write-Error "Error during file copy. See log: $LogFile"
        exit 2
    }

    if ($Compress) {
        $zipPath = "${fullBackupPath}.zip"
        try {
            Write-Verbose "Compressing to $zipPath"
            if ($PSCmdlet.ShouldProcess("Compress folder", "$fullBackupPath → $zipPath")) {
                Add-Type -AssemblyName System.IO.Compression.FileSystem
                [IO.Compression.ZipFile]::CreateFromDirectory($fullBackupPath, $zipPath)
                Write-Host "🗜️ Compressed backup: $zipPath"
            }
        }
        catch {
            $_ | Out-File -FilePath $LogFile -Append
            Write-Error "Compression failed. See log: $LogFile"
            exit 2
        }
    }
}

end {
    Write-Host "🎉 Backup process finished."
    exit 0
}
