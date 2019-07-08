const gulp = require('gulp');
const fs = require('fs')
const mocha = require('gulp-mocha')
const ts = require('gulp-typescript')



// ********** Build **********
const content = require('./content/content.js')
const buildPath = './public/'
const buildContentPath = `${buildPath}/content`
const buildClean = () => new Promise(function(resolve, reject) {
    fs.readdir(buildPath, (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlinkSync(`${buildPath}${file}`)
        }
    })
    resolve()
})
gulp.task('build-clean', buildClean)
const buildContent = () => new Promise(function(resolve, reject) {
    // Copy content/index.html to public/index.html
    gulp.src('content/index.html')
        .pipe(gulp.dest(buildPath))

    var songs = content.songs
    // Write out song contents to individual files.
    var list = []
    for (var song of songs) {
        const { name, artist, versions } = song
        if (name.length == 0)
            continue
        
        const fileName = `${artist}_${name}`
            .replace(/\s/g, '_')
            .replace(/,|\'|\.|\(|\)|\:|\&/g, '')
            .toLowerCase()
            + '.json'
        const url = `content/${fileName}`
        list.push({
            name,
            artist,
            url
        })
        fs.writeFileSync(
            `${buildContentPath}/${fileName}`,
            JSON.stringify({
                name,
                artist,
                url,
                versions
            })
        )
    }
    // Write song list.
    fs.writeFileSync(
        `${buildContentPath}/list.json`,
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
gulp.task('default', buildContent)



// ********** Tests **********
const tsProject = ts.createProject("./test/tsconfig-tests.json");
const testsRun = () =>
    gulp.src('test/**/*.test.ts')
        .pipe(mocha({
            reporter: 'nyan',
            require: ['ts-node/register']
        }))
        .pipe(tsProject())
        .pipe(mocha())
gulp.task('tests-run', testsRun)
