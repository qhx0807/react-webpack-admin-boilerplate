const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd()); // 获取当前工作目录

// 从相对路径中解析绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// 默认的模块扩展名
const moduleFileExtensions = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'json',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'), // 打包路径
  appPublic: resolveApp('public'), // 静态资源路径
  appHtml: resolveApp('public/index.html'), // html 模板路径
  appIndexJs: resolveModule(resolveApp, 'src/index'), // 打包入口路径
  appNodeModules: resolveApp('node_modules'), // node_modules 路径
  appSrc: resolveApp('src'), // 主文件入口路径
  moduleFileExtensions, // 模块扩展名
};
