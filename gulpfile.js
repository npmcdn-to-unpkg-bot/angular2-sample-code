const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
	dist: 'dist',
	srcFiles: ['app/**/*', 'index.html', 'styles.css']

}

//Cleaning
gulp.task('clean', function() {
	return del('dist/**/*');
});


//Typescript
gulp.task('compile', ['clean'], function() {
	return gulp.src([
			'app/**/*.ts',
			'typings/browser.d.ts'
		])
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/app'));
});

//copy
gulp.task('copy', ['clean'], function() {
	return gulp.src([
			'app/**/*', 'index.html', 'styles.css', 'systemjs.config.js', '!app/**/*.ts', 'bower_components/**/*'
		], {base: './'})
		.pipe(gulp.dest('dist'));

});

//tslint
gulp.task('tslint', function() {
	return gulp.src('app/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});

//browser sync
gulp.task('serve', ['build'], function(){
	browserSync({
		server: {
			baseDir: paths.dist
		}
	});

	gulp.watch(paths.srcFiles, ['buildAndReload']);

});

gulp.task('build', ['tslint', 'compile', 'copy']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['serve']);