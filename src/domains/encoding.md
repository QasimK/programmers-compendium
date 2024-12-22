# FFMPEG

ffmpeg cheatsheet: <https://amiaopensource.github.io/ffmprovisr/>

Downcode to x264 1080p \(copy audio and subtitles\)

```terminal
ffmpeg -i input.wmv \
       -c:v libx264 -preset veryslow -tune film -crf 22 -vf scale=-2:1080 \
       -c:a copy -c:s copy \
       output.mp4
```

Transcode audio: `-c:a libfdk_aac -b:a 128k`

-tune parameter: [https://superuser.com/a/564404/229283](https://superuser.com/a/564404/229283)
