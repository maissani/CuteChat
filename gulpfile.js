var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    cofee = require('gulp-coffee'),
    useref = require('gulp-useref'),
    compass = require('gulp-compass');


gulp.task('coffee',function(){
return gulp.src('js/*.coffee')
.pipe(coffee({
  bare:true
}))
.pipe(gulp.dest('js'));

});

gulp.task('compass',function(){
return gulp.src('css/*.scss')
.pipe(compass({
  css: 'css',
  sass: 'css',
  image: 'img'
}))
.pipe(gulp.dest('css'));

});

gulp.task('default',['cofee','compass'],function(){
  return gulp.src('*.html')
  .pipe(useref.assets())
  .pipe(useref.restore())
  .pipe(useref())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
  var server = livereload();
  gulp.watch('js/*.coffee',['coffee']).on('change', function(event){
    console.log('Le fichier'+ event.path + ' a ete modifie');
  });
  gulp.watch('scss/*.scss',['compass']);
  gulp.watch(['*.html', 'js/*.js', 'css/*.css']).on('change',function(event){
    server.changed(event.path);
  });
});
