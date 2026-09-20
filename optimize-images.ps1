Add-Type -AssemblyName System.Drawing

# 1) Re-encode gallery + catalogue mains from the original PNG backups at q90.
$backupRoot = "C:\Users\samim_40uxmfb\Desktop\deplyed project\nvt-originals-backup\nvt"
$outRoot    = "C:\Users\samim_40uxmfb\Desktop\deplyed project\vishaltailorapk\assets\images\nvt"

function ConvertTo-Jpeg($srcPng, $destJpg, $maxSide, $quality) {
  $img = [System.Drawing.Image]::FromFile($srcPng)
  $scale = [Math]::Min(1.0, $maxSide / [Math]::Max($img.Width, $img.Height))
  $w = [int][Math]::Round($img.Width * $scale)
  $h = [int][Math]::Round($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($destJpg, $codec, $ep)
  $ep.Dispose(); $bmp.Dispose(); $img.Dispose()
}

# gallery-09..12 came from pag6-img2/4/5/1 respectively
$pairs = @(
  @{ g = "gallery-01"; src = "gallery\gallery-01.png" },
  @{ g = "gallery-02"; src = "gallery\gallery-02.png" },
  @{ g = "gallery-03"; src = "gallery\gallery-03.png" },
  @{ g = "gallery-04"; src = "gallery\gallery-04.png" },
  @{ g = "gallery-05"; src = "gallery\gallery-05.png" },
  @{ g = "gallery-06"; src = "gallery\gallery-06.png" },
  @{ g = "gallery-07"; src = "gallery\gallery-07.png" },
  @{ g = "gallery-08"; src = "gallery\gallery-08.png" },
  @{ g = "gallery-09"; src = "gallery\pag6-img2.png" },
  @{ g = "gallery-10"; src = "gallery\pag6-img4.png" },
  @{ g = "gallery-11"; src = "gallery\pag6-img5.png" },
  @{ g = "gallery-12"; src = "gallery\pag6-img1.png" }
)
foreach ($p in $pairs) {
  $src = Join-Path $backupRoot $p.src
  $dst = Join-Path $outRoot ("gallery\" + $p.g + ".jpg")
  if (Test-Path $src) { ConvertTo-Jpeg $src $dst 1080 90 }
}
Get-ChildItem (Join-Path $backupRoot "catalogue") -Filter *.png | ForEach-Object {
  ConvertTo-Jpeg $_.FullName (Join-Path $outRoot ("catalogue\" + $_.BaseName + ".jpg")) 1080 90
}
Write-Host "mains re-encoded at q90"

# 2) 500px thumbnails for every list image (q85).
foreach ($folder in @("gallery", "catalogue", "suit", "shirt", "safari", "khandress", "kurtapajama")) {
  $dir = Join-Path $outRoot $folder
  if (-not (Test-Path $dir)) { continue }
  $thumbDir = Join-Path $dir "thumbs"
  New-Item -ItemType Directory -Force -Path $thumbDir | Out-Null
  Get-ChildItem $dir -File | Where-Object { $_.Extension -match "^\.(jpg|jpeg|png)$" } | ForEach-Object {
    $thumb = Join-Path $thumbDir ($_.BaseName + ".jpg")
    ConvertTo-Jpeg $_.FullName $thumb 500 85
  }
  Write-Host ("thumbs: " + $folder + " -> " + (Get-ChildItem $thumbDir).Count)
}
