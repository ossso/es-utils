// Object Key 对象属性查找封装
class Mapping {
  /**
   * 字符串映射对象
   *
   * @param {object} obj 查找的对象
   * @param {string} key 查找的属性
   *
   * @return {any}
   */
  static mapping(obj, key) {
    if (!obj) {
      return undefined;
    }
    if (key.includes('..')) {
      return undefined;
    }
    if (key.indexOf('.') === 0 || key.lastIndexOf('.') === key.length - 1) {
      return undefined;
    }
    if (key.indexOf('.') > 0) {
      const keys = key.split('.');
      let val;
      let o = obj;
      for (let i = 0; i < keys.length; i += 1) {
        const subKey = keys[i];
        val = Mapping.get(o, subKey);
        o = val;
        if (typeof val === 'undefined') {
          break;
        }
      }
      return val;
    }
    return Mapping.get(obj, key);
  }

  /**
   * 获取数据
   * 支持处理数组指针
   * @param {Object} obj 属性对象
   * @param {String} key 属性名称
   * @return {Any}
   */
  static get(obj, key) {
    if (!key) {
      return undefined;
    }
    // 匹配数组指针
    const match = key.match(/\[(\d*)\]/);
    if (match) {
      const pre = key.substring(0, match.index);
      const [
        index,
        num,
      ] = match;
      if (!num) {
        return undefined;
      }
      const list = pre.length > 0 ? obj[pre] : obj;
      const val = list[+num];
      if (!val) {
        return undefined;
      }
      if (key.length - index.length !== match.index) {
        return Mapping.get(val, key.substring(match.index + index.length));
      }
      return val;
    }
    return obj[key];
  }

  /**
   * 数据根据key的映射进行组装
   */
  static each(map, data) {
    const obj = {};
    Object.keys(map).forEach((i) => {
      obj[i] = Mapping.mapping(data, map[i]);
    });
    return obj;
  }
}

export const { mapping } = Mapping;

export default Mapping;
