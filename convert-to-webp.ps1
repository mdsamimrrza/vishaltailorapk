Add-Type -AssemblyName System.Drawing

$outRoot = "C:\Users\samim_40uxmfb\Desktop\deplyed project\vishaltailorapk\assets\images\nvt"

function ConvertTo-WebP($src, $dest, $quality = 80, $maxSide = 0) {
    $img = [System.Drawing.Image]::FromFile($src)
    if ($maxSide -gt 0) {
        $scale = [Math]::Min(1.0, $maxSide / [Math]::Max($img.Width, $img.Height))
        if ($scale -lt 1.0) {
            $w = [int][Math]::Round($img.Width * $scale)
            $h = [int][Math]::Round($img.Height * $scale)
            $bmp = New-Object System.Drawing.Bitmap $w, $h
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $w, $h)
            $g.Dispose()
            $img.Dispose()
            $img = $bmp
        }
    }
    # System.Drawing doesn't support WebP natively, need alternative
    Write-Host "Would convert $src -> $dest (WebP not directly supported in System.Drawing)"
    $img.Dispose()
}

# Convert root-level images to WebP (using imagemin via npx instead)
Write-Host "Use: npx imagemin assets/images/nvt/*.jpg assets/images/nvt/*.png --plugin=webp --out-dir=assets/images/nvt-webp"
Write-Host "Then replace originals with webp versions"
