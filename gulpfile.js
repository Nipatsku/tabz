var gulp = require('gulp');
var fs = require('fs')



var content = require('./content/content.js')
const buildContentPath = './public/content/'
function cleanContent() {
    fs.readdir(buildContentPath, (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlinkSync(`${buildContentPath}${file}`)
        }
    })
}
function buildContent() {
    return new Promise(function(resolve, reject) {
        cleanContent()
        setTimeout(() => {
            var songs = content.songs
            // Write out song contents to individual files.
            var list = []
            for (var song of songs) {
                const { name, artist, versions } = song
                if (name.length == 0)
                    continue
                
                const fileName = name
                    .replace(/\s/g, '_')
                    .replace(/,/g, '')
                    .toLowerCase()
                fs.writeFileSync(
                    `${buildContentPath}${fileName}.json`,
                    JSON.stringify(versions)
                )
                list.push({
                    name,
                    artist,
                    url: `content/${fileName}.json`
                })
            }
            // Write song list.
            fs.writeFileSync(
                `${buildContentPath}list.json`,
                JSON.stringify(list)
            )

            resolve()
        }, 500)
    })
}
function watchContent() {
    buildContent()
        .then(() => {const watcher = gulp.watch(['content/content.js'])
            console.log('Watching content.')
            watcher.on('change', function(path, stats) {
                console.log('Rebuilding content...')
                buildContent()
                    .then(() => console.log('Content ready.'))
            })
        })
}

exports.build = buildContent
exports.watch = watchContent
exports.default = buildContent
