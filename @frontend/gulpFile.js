const { src, dest, watch, series } = require("gulp");
const plumber = require("gulp-plumber"); // エラー時のタスク停止
const notify = require("gulp-notify"); // エラー通知を行う
const browserSync = require("browser-sync"); // ブラウザの自動リロード
const scss = require("gulp-dart-sass"); // scssのコンパイル

const scssCompile = () => {
  const scssOption = {
    outputStyle: "compressed",
  };
  return src("./src/scss/style.scss")
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(scss(scssOption))
    .pipe(dest("./public"));
};

// ブラウザの自動リロード
const browserReload = (done) => {
  browserSync.reload();
  done();
};

// ファイルのwatch
const watchFile = (done) => {
  watch("./src/scss/**/*.scss", series(scssCompile, browserReload));
  done();
};

exports.default = series(scssCompile, watchFile);
