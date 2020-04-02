var gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  gulpSequence = require("gulp-sequence"),
  sass = require("gulp-sass");

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
  gulp
    .watch("src/assets/styles/**/*.scss", ["sass"])
    .on("change", browserSync.reload);
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/assets/js/*.js").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("src/assets/styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/assets/styles/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulpSequence("sass", "serve"));
