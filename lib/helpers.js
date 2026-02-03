const path = require("path");

let DEBUG = false;

module.exports = {
  repoForPath(goalPath) {
    const iterable = atom.project.getPaths();
    for (let i = 0; i < iterable.length; i++) {
      const projectPath = iterable[i];
      if ((goalPath === projectPath) || (goalPath.indexOf(projectPath + path.sep) === 0)) {
        return atom.project.getRepositories()[i];
      }
    }
    return null;
  },

  getStyleObject(el) {
    const computed = window.getComputedStyle(el);
    const styleObject = {};
    const props = [
      'color', 'font-size', 'font-family', 'font-weight', 'font-style',
      'line-height', 'background-color', 'background-image',
      'padding-left', 'padding-right', 'padding-top', 'padding-bottom',
      'text-decoration', 'opacity'
    ];
    for (let prop of props) {
      const value = computed.getPropertyValue(prop);
      if (value) {
        const camelized = prop.replace(/-([a-z])/g, (_, b) => b.toUpperCase());
        styleObject[camelized] = value;
      }
    }
    return styleObject;
  },

  getFullExtension(filePath) {
    const basename = path.basename(filePath);
    const position = basename.indexOf('.');
    if (position > 0) { return basename.slice(position); } else { return ''; }
  },

  isDebug() {
    return DEBUG;
  },

  setDebug(newValue) {
    DEBUG = newValue;
  },
};
