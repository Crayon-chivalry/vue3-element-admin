// 筛选数据 (还需要处理时间的筛选)
export function dynamicFilter(data, filters) {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key];

      // 如果筛选条件是空字符串，则跳过该字段的筛选
      if (filterValue === '') {
        return true;
      }

      // 如果筛选条件不是 undefined 或 null，则进行精确匹配
      if (filterValue !== undefined && filterValue !== null) {
        return item[key] === filterValue;
      }

      // 对于 undefined 或 null 的筛选条件，跳过该字段
      return true;
    });
  });
}