const gulp = require('gulp');
const fs = require('fs')
const mocha = require('gulp-mocha')
const ts = require('gulp-typescript')
const tslint = require('gulp-tslint')
const replace = require('gulp-replace')



// ********** Build **********
const content = require('./content/content.js')
const buildPath = './public'
const buildContentPath = `${buildPath}/content`
const getBuildName = () => {
    const buildNamesJson = './.buildnames.json'
    let buildNames = require(buildNamesJson)
    // Pick random name from 'buildNames.names', that is not equal to 'buildNames.previous'.
    const previous = buildNames.previous
    buildNames = buildNames.names
    if (buildNames.includes(previous))
        buildNames.splice(buildNames.indexOf(previous), 1)
    const buildName = buildNames[Math.round(Math.random() * (buildNames.length - 1))]
    // Mark buildNames.previous.
    if (previous.length > 0)
        buildNames.push(previous)
    fs.writeFileSync(
        buildNamesJson,
        JSON.stringify({
            previous: buildName,
            names: buildNames
        })
    )
    return buildName
}
const buildClean = () => new Promise(function(resolve, reject) {
    fs.readdir(buildPath, (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlinkSync(`${buildPath}/${file}`)
        }
    })
    resolve()
})
gulp.task('build-clean', buildClean)
const buildContent = () => new Promise(function(resolve, reject) {
    const buildName = getBuildName()
    console.log('Build name: ',buildName)

    if (!fs.existsSync(buildPath))
        fs.mkdirSync(buildPath)
    if (!fs.existsSync(buildContentPath))
        fs.mkdirSync(buildContentPath)
    
    // Copy content/index.html to public/index.html
    gulp.src('content/index.html')
        .pipe(replace(/VERSION/g, buildName))
        .pipe(gulp.dest(buildPath))

    var songs = content.songs
    // Write out song contents to individual files.
    var list = []
    for (var song of songs) {
        const { id, name, artist, versions } = song
        if (name.length == 0)
            continue
        
        const fileName = `${artist}_${name}`
            .replace(/\s/g, '_')
            .replace(/,|\'|\.|\(|\)|\:|\&/g, '')
            .toLowerCase()
            + '.json'
        const url = `${fileName}`
        list.push({
            id,
            name,
            artist,
            url
        })
        fs.writeFileSync(
            `${buildContentPath}/${fileName}`,
            JSON.stringify({
                id,
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
const testsRunUnit = () =>
    gulp.src('test/**/*.test.ts')
        .pipe(tsProject())
        .pipe(mocha({
            reporter: 'nyan'
        }))
gulp.task('tests-run-unit', testsRunUnit)

const testsRunLint = () =>
    gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report({
            emitError: false
        }))
gulp.task('tests-run-lint', testsRunLint)
gulp.task('tests-run', gulp.series('tests-run-unit', 'tests-run-lint'))
