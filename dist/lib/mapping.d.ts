interface KeyMap {
    [key: string]: string | KeyMap | null | undefined;
}
type GetReturnValue<T> = T | undefined;
declare class Mapping {
    /**
     * 字符串映射对象
     *
     * @param {Record<string, any>} obj 查找的对象
     * @param {string} key 查找的属性
     *
     * @return {any}
     */
    static mapping(obj: Record<string, unknown>, key: string): unknown;
    /**
     * 获取数据
     * 支持处理数组指针
     * @param {Record<string, any> | any[]} obj 属性对象
     * @param {string} key 属性名称
     * @return {any}
     */
    static get<T>(obj: Record<string, unknown> | T[] | T, key: string): GetReturnValue<T>;
    /**
     * 数据根据key的映射进行组装
     *
     * @param {KeyMap} keys 映射对象
     * @param {Record<string, unknown>} data 数据对象
     *
     * @return {Record<string, unknown>}
     */
    static each(keys: KeyMap | null | undefined, data: Record<string, unknown> | null | undefined): Record<string, unknown> | undefined;
}
export declare const mapping: typeof Mapping.mapping;
export default Mapping;
