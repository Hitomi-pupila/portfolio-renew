module.exports = (eleventyConfig) => {
  eleventyConfig.addGlobalData('siteName', 'simple');

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
