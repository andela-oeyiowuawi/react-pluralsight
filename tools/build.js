import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod.js';
import colors from 'colors';
process.env.NODE_ENV = 'production';
/*eslint-disable no-console*/
console.log('generating minified bundle for production via webpack. This may take a moment'.blue);

webpack(webpackConfig).run((err, stats)=>{
  if(err){
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(error.red));
  }


  if(jsonStats.hasWarnings){
    console.log('Webpack generated these warnings: '.bold.yellow);
    jsonStats.warnings.map( warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been ompiled in production mode and written to /dist. It\'s ready to roll'.green);
  return 0;
});
