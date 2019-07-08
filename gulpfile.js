var gulp = require('gulp');
var fs = require('fs')
var mocha = require('gulp-mocha')



// ********** Build **********
var content = require('./content/content.js')
const buildContentPath = './public/content/'
const buildClean = () => new Promise(function(resolve, reject) {
    fs.readdir(buildContentPath, (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlinkSync(`${buildContentPath}${file}`)
        }
    })
    resolve()
})
gulp.task('build-clean', buildClean)
const buildContent = () => new Promise(function(resolve, reject) {
    var songs = content.songs
    // Write out song contents to individual files.
    var list = []
    for (var song of songs) {
        const { name, artist } = song
        if (name.length == 0)
            continue
        
        const fileName = `${artist}_${name}`
            .replace(/\s/g, '_')
            .replace(/,|\'|\.|\(|\)|\:|\&/g, '')
            .toLowerCase()
            + '.json'
        fs.writeFileSync(
            `${buildContentPath}${fileName}`,
            JSON.stringify(song)
        )
        list.push({
            name,
            artist,
            url: `content/${fileName}`
        })
    }
    // Write song list.
    fs.writeFileSync(
        `${buildContentPath}list.json`,
        JSON.stringify(list)
    )
    resolve()
})
gulp.task('build-content', gulp.series('build-clean', buildContent))
const buildWatch = () => new Promise(function(resolve, reject) {
    const watcher = gulp.watch(['content/content.js'])
    console.log('Watching content.')
    watcher.on('change', function(path, stats) {
        console.log('Rebuilding content...')
        buildContent()
            .then(() => console.log('Content ready.'))
    })
})
gulp.task('build-watch', gulp.series('build-content', buildWatch))



// ********** Tests **********



const testsRun = () =>
    gulp.src('tests/**/*.test.ts')
        .pipe(mocha({
            reporter: 'nyan',
            require: ['ts-node/register']
        }))
gulp.task('tests-run', testsRun)




gulp.task('default', buildContent)