
const pathsRepository: Array<Object> = [
  
]

const paths = {};

for (let tagsArrayPaths of pathsRepository) {
  let objectArrayPath: any = tagsArrayPaths;
  for (let path of objectArrayPath) {
    for (let prop in path) {
      // @ts-ignore
      if (paths.hasOwnProperty(prop)) Object.assign(paths[prop], path[prop]);
      // @ts-ignore
      else paths[prop] = path[prop];
    }
  }
}

export { paths };
