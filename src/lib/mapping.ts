interface KeyMap {
  [key: string]: string | KeyMap;
}

type GetReturnValue<T> = T | undefined;

class Mapping {
  /**
   * 字符串映射对象
   *
   * @param {Record<string, any>} obj 查找的对象
   * @param {string} key 查找的属性
   *
   * @return {any}
   */
  static mapping(obj: Record<string, any>, key: string): any {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Invalid input: obj is null or not an object');
    }
    if (typeof key !== 'string') {
      throw new Error('Invalid input: key is not a string');
    }
    if (key.includes('..') || key.startsWith('.') || key.endsWith('.')) {
      return undefined;
    }
    if (key.includes('.')) {
      return key.split('.').reduce((val, k) => (val !== undefined ? Mapping.get(val, k) : undefined), obj);
    }
    return Mapping.get(obj, key);
  }

  /**
   * 获取数据
   * 支持处理数组指针
   * @param {Record<string, any> | any[]} obj 属性对象
   * @param {string} key 属性名称
   * @return {any}
   */
  static get<T>(obj: Record<string, any> | T[], key: string): GetReturnValue<T> {
    if (!obj || typeof obj !== 'object' || !key) {
      return undefined;
    }

    const indexMatch = key.match(/\[(\d+)\]/);
    if (indexMatch) {
      const [fullMatch, indexStr] = indexMatch;
      const index = Number(indexStr);
      const matchIndex = key.indexOf(fullMatch);

      if (matchIndex === 0) {
        if (Array.isArray(obj) && index < obj.length) {
          const val = obj[index];
          const restKey = key.slice(fullMatch.length);
          return restKey ? Mapping.get(val, restKey) : val;
        }
      } else {
        const pre = key.slice(0, matchIndex);
        const list = (obj as Record<string, any>)[pre];
        if (Array.isArray(list) && index < list.length) {
          const val = list[index];
          const restKey = key.slice(matchIndex + fullMatch.length);
          return restKey ? Mapping.get(val, restKey) : val;
        }
      }
      return undefined;
    }

    return (obj as Record<string, T>)[key];
  }

  /**
   * 数据根据key的映射进行组装
   *
   * @param {KeyMap} keys 映射对象
   * @param {Record<string, any>} data 数据对象
   *
   * @return {Record<string, any>}
   */
  static each(keys: KeyMap, data: Record<string, any>): Record<string, any> {
    if (!keys || typeof keys !== 'object') {
      throw new Error('Invalid input: keys is not a valid object');
    }
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input: data is null or not an object');
    }

    return Object.entries(keys).reduce((acc: Record<string, any>, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = Mapping.mapping(data, value);
      }
      return acc;
    }, {});
  }
}

export const { mapping } = Mapping;
export default Mapping;
