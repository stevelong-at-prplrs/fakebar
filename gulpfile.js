var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
});

gulp.watch([
    'docs/*'
]).on("change", function() {
    browserSync.reload();
});
