import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import { buildBabelConfig } from 'haste-node/tools';
import graphql from 'gulp-graphql';

const paths = {
  lib: './lib',
  src: './src',
  entry: './src/index.js',
  graphqlSchema: './lib/graphql/Schema.js',
  srcGlob: [
    'src/**/*.js',
    '!src/**/__tests__/**/*.js',
    '!src/**/__mocks__/**/*.js',
  ],
};

gulp.task('clean', function(cb) {
  del([paths.lib]).then(() => cb());
});

gulp.task('build', ['clean'], (cb) => {
  buildBabelConfig(paths.entry, paths.src)
    .then(config => {
      const babelOpts = {
        ...config,
      };

      gulp
        .src(paths.srcGlob)
        .pipe(babel(babelOpts))
        .pipe(gulp.dest(paths.lib))
        .on('end', () => {
          cb();
        });
    });
});

gulp.task('graphql', ['build'], () => {
  return gulp.src(paths.graphqlSchema)
    .pipe(graphql({
      json: true,
      graphql: false,
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./lib')
    .on('end', () => {
      setTimeout(() => {
        process.exit(0);
      }, 500);
    }));
});

gulp.task('default', ['clean', 'build', 'graphql']);
