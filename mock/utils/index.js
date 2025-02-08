// 筛选数据 (还可以进行的优化，某字段的模糊查询)
export function dynamicFilter(data, filters) {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key];

      // 如果筛选条件值是空字符串，则跳过该字段的筛选
      if (filterValue === '') {
        return true;
      }

      // 如果筛选条件是 date, 根据 sdate 和 edate 进行筛选
      if(key === 'date') {
        const sdate = new Date(filters.sdate); // 开始时间
        const edate = new Date(filters.edate); // 结束时间
        const itemDate = new Date(item[key]); // item 的日期
        return itemDate >= sdate && itemDate <= edate
      }

      // 如果筛选条件有值，并且 key 不是 date 相关，进入精确匹配
      if (filterValue && !['sdate', 'edate'].includes(key)) {
        return item[key] == filterValue;
      }

      // 对于 undefined 或 null 的筛选条件，跳过该字段
      return true;
    });
  });
}