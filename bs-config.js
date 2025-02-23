module.exports = {
  files: [
    'dist/**/*.html',
    'dist/**/*.css',
    'dist/**/*.js',
  ],
  startPath: '/',
  watch: true,
  open: 'external',
  server: {
    baseDir: 'dist',
    https: true,
  },
  middleware: [
    require('connect-ssi')({
      baseDir: 'dist',
      ext: '.html',
    }),
  ],
  notify: false,
};
