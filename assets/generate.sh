  #!/bin/bash
     sizes=(16 32 64 128 256 512 1024)
     for size in "${sizes[@]}"; do
       magick convert -background none -resize ${size}x${size} icon.svg Icons.iconset/icon_${size}x${size}.png
     done
