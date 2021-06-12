const pathToRegex = (path) =>
  new RegExp(
    "^" +
      path
        .replace(/\//g, "\\/")
        .replace(/-\w+/g, "([A-Za-z][A-Za-z0-9]+)")
        .replace(/@\w+/g, "([A-Za-z0-9]+)") +
      "$"
  );

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/(?:-|@)(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
};
module.exports.pathToRegex = pathToRegex;
module.exports.getParams = getParams;
