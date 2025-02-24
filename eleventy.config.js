module.exports = (eleventyConfig) => {
  eleventyConfig.addGlobalData('siteName', 'PORTFORIO');

  return {
    dir: {
      input: 'src/pages',
      output: 'dist',
    },
    htmlTemplateEngine: 'ejs',
    markdownTemplateEngine: 'ejs',
    templateFormats: [
      'html',
      'ejs',
    ],
  };
};
