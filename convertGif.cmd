FOR %i IN (*) DO magick convert -dispose 3 -delay 4 -loop 0 %i.png -crop 64x64 +repage %i.gif