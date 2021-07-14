const { $base64, objectToParams, paramsToObject, JSONparse } = require('@root/common/utils');

function searchFilter({ search, route, keywordData, category, warehouseData, prodTypeData, sortData }) {
  // queryObj: url参数对象
  // kcType 0：显示推荐关键词，1：显示面包屑类目
  // keywordData 接口返回的关键字列表
  // category 接口返回的类目数据
  // warehouseData 仓库数据
  // prodTypeData 商品下拉选项
  // sortData 筛选
  const queryObj = paramsToObject(search)
  queryObj.pageNum = 1
  // 关键字列表
  const keywordList = keywordData.map(item => {
    return {
      ...item,
      url: `${route}?${objectToParams({
        ...queryObj,
        id: item.id || '',
        cateArr: $base64.encode(JSON.stringify(keywordData)),
      })}`,
      isActive: queryObj.id === item.id,
    }
  }) || []

  // 类目列表
  let categoryList = [{
    id: '',
    nameEn:"All Categories",
    children: category,
  }]
  if(queryObj.name) {
    const queryName = JSONparse($base64.decode(queryObj.name))[1] || []
    categoryList = queryName.map((item, idx) => {
      if(item.name === "All Categories") {
        item = {
          id: '',
          nameEn:"All Categories",
          children: category,
        }
        return item
      }
      if(idx === 0) { // 当前为一级类目需要获取其下的二级类目
        category.forEach(_ => {
          if(_.id === item.id) {
            item.children = _.children
          }
        })
      } else if(idx === 1) { // 当前为二级类目需要获取其下的三级类目
        const parentId = queryName[idx - 1] ? queryName[idx - 1].id : ''
        category.forEach(_ => {
          if (_.id === parentId) {
            _.children.forEach(child => {
              if (child.id === item.id) {
                item.children = child.children
              }
            })
          }
        })
      }
      return item
    })
  }

  // 仓库列表
  let warehouseCur = 0; // 当前选择仓库
  const warehouseList = warehouseData.map((item, idx) => {
    if(queryObj.from === item.countryCode) {
      warehouseCur = idx
    }
    return {
      ...item,
      url: `${route}?${objectToParams({
        ...queryObj,
        from: item.countryCode || '',
      })}`,
    }
  }) || []


		// 商品下拉选项列表
		let prodTypeCur = 0; // 当前选择仓库
		const prodTypeList = prodTypeData.map((item, idx) => {
			if(queryObj.productType == item.productType) {
				prodTypeCur = idx
			}
			return {
				...item,
				url: `${route}?${objectToParams({
          ...queryObj,
					productType: item.productType || '',
				})}`,
			}
		}) || []

  return {
    queryObj,
    keywordList,
    categoryList,
    warehouseList,
    warehouseCur,
    prodTypeList,
    prodTypeCur,
    sortData
  }
}

module.exports = { searchFilter }