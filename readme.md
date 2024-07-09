# 常用工具

## 简介
`@ossso/utils` 是一个常用工具库，提供了一些实用的工具函数，旨在简化日常开发中的常见任务。

## 安装
你可以使用 npm 或 yarn 进行安装：
```bash
npm install @ossso/utils
# 或者
yarn add @ossso/utils
```

## 使用方法

### 导入模块
你可以根据需要导入整个模块或单个工具函数：
```javascript
// 导入整个模块
import * as utils from '@ossso/utils';

// 导入单个工具函数
import { Mapping } from '@ossso/utils';
```

### 示例
以下是一些使用示例：

#### Mapping 类
`Mapping` 类提供了一些用于对象属性映射和获取的方法。

##### mapping 方法
根据给定的键路径从对象中获取值。
```javascript
const obj = { a: { b: { c: 42 } } };
const value = Mapping.mapping(obj, 'a.b.c'); // 返回 42
```

##### get 方法
从对象或数组中获取指定键的值。
```javascript
const obj = { a: [ { b: 42 } ] };
const value = Mapping.get(obj, 'a[0].b'); // 返回 42
```

##### each 方法
根据键映射对象从数据对象中提取值并组装成新的对象。
```javascript
const keys = { x: 'a.b.c', y: 'd.e' };
const data = { a: { b: { c: 42 } }, d: { e: 24 } };
const result = Mapping.each(keys, data); // 返回 { x: 42, y: 24 }
```

## 许可证
本项目基于 MIT 许可证开源。

## 相关链接
- [仓库地址](https://github.com/ossso/es-utils)
- [问题反馈](https://github.com/ossso/es-utils/issues)
- [主页](https://github.com/ossso/es-utils)
