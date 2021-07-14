const { objectToParams, paramsToObject } = require('@root/common/utils');

/** 分页html */
function pageModule({ host, pageNum = 1, pageSize = 10, totalNum = 0, route = '', search = '' }) {
  const totalPage = Math.ceil(totalNum / pageSize)
  const frist = `${host}${route}/1/${pageSize}${search}`
  const prev = `${host}${route}/${(pageNum - 1) < 1 ? 1 : pageNum - 1}/${pageSize}${search}`
  const next = `${host}${route}/${pageNum + 1}/${pageSize}${search}`
  const last = `${host}${route}/${totalPage}/${pageSize}${search}` 

  const nullLink = 'javascript:void(0)'

  const fristLink = `<a class="prev" href="${pageNum == 1 ? nullLink : frist}">&lt;&lt;</a>`
  const prevLink = `<a class="prev" href="${pageNum == 1 ? nullLink : prev}">&lt;</a>`
  const nextLink = `<a class="next" href="${pageNum == totalPage ? nullLink : next}">&gt;</a>`
  const lastLink = `<a class="next" href="${pageNum == totalPage ? nullLink : last}">&gt;&gt;</a>`


  let headLinks = ''
  let headCount = pageNum - 5 < 0 ? ((pageNum - 1) > 2 ? 2 : pageNum - 1) : 2

  let endLinks = ''
  let endCount = pageNum + 5 > totalPage ? ((totalPage - pageNum) > 2 ? 2 : totalPage - pageNum) : 2

  if (endCount + headCount != 4) {
    if (endCount < 2) {
      const needCount = 2 - endCount
      headCount += (pageNum - needCount - headCount) >= 0 ? needCount : 0
    }
    if (headCount < 2) {
      const needCount = 2 - headCount
      endCount += (pageNum + needCount + endCount) <= totalPage ? needCount : 0
    }
  }

  for (let i = pageNum - 1; i > pageNum - 10; i--) {
    if (headCount == 0 || i <= 0) break
    headLinks = `<a href="${host}${route}/${i}/${pageSize}${search}">${i}</a>` + headLinks
    headCount--
  }

  let centerLinks = `<a href="${nullLink}" class="current">${pageNum}</a>`

  for (let i = pageNum + 1; i < pageNum + 10; i++) {
    if (endCount == 0) break
    endLinks += `<a href="${host}${route}/${i}/${pageSize}${search}">${i}</a>`
    endCount--
  }

  const pagesizearr = ['10', '20', '50']
  let pagesizeList = ''
  pagesizearr.forEach((item, index) => {
    pagesizeList += `<option value="${item}" ${item == pageSize ? 'selected' : ''}>${item}</option>`
  })

  return {
    pageNum,
    pageSize,
    pagesizeList,
    pageLinks: fristLink + prevLink + headLinks + centerLinks + endLinks + nextLink + lastLink,
    totalNum,
    totalPage
  }
}

function searchPageModule({ host, pagenum, pagesize, totalnum, totalpage, route, search = '' }) {
  const pageNum = parseInt(pagenum)
  const pageSize = parseInt(pagesize)
  const totalNum = parseInt(totalnum)
  const totalPage = parseInt(totalpage) || Math.ceil(pageNum / pageSize)
  const searchObj = paramsToObject(search)
  const frist = `${route}?${objectToParams({
    ...searchObj,
    pageNum: 1,
    pageSize
  })}`
  const prev = `${route}?${objectToParams({
    ...searchObj,
    pageNum: (pageNum - 1) < 1 ? 1 : pageNum - 1,
    pageSize
  })}`
  const next = `${route}?${objectToParams({
    ...searchObj,
    pageNum: pageNum + 1,
    pageSize
  })}`
  const last = `${route}?${objectToParams({
    ...searchObj,
    pageNum: totalPage,
    pageSize
  })}`

  const nullLink = 'javascript:void(0)'

  const fristLink = `<a class="prev" href="${pageNum == 1 ? nullLink : frist}">&lt;&lt;</a>`
  const prevLink = `<a class="prev" href="${pageNum == 1 ? nullLink : prev}">&lt;</a>`
  const nextLink = `<a class="next" href="${pageNum == totalPage ? nullLink : next}" page-data="">&gt;</a>`
  const lastLink = `<a class="next" href="${pageNum == totalPage ? nullLink : last}">&gt;&gt;</a>`


  let headLinks = ''
  let headCount = pageNum - 5 < 0 ? ((pageNum - 1) > 2 ? 2 : pageNum - 1) : 2

  let endLinks = ''
  let endCount = pageNum + 5 > totalPage ? ((totalPage - pageNum) > 2 ? 2 : totalPage - pageNum) : 2

  if (endCount + headCount != 4) {
    if (endCount < 2) {
      const needCount = 2 - endCount
      headCount += (pageNum - needCount - headCount) >= 0 ? needCount : 0
    }
    if (headCount < 2) {
      const needCount = 2 - headCount
      endCount += (pageNum + needCount + endCount) <= totalPage ? needCount : 0
    }
  }

  for (let i = pageNum - 1; i > pageNum - 10; i--) {
    if (headCount == 0 || i <= 0) break
    headLinks = `<a href="${route}?${objectToParams({
      ...searchObj,
      pageNum: i,
      pageSize
    })}">${i}</a>` + headLinks
    headCount--
  }

  let centerLinks = `<a href="${nullLink}" class="current">${pageNum}</a>`

  for (let i = pageNum + 1; i < pageNum + 10; i++) {
    if (endCount == 0) break
    endLinks += `<a href="${route}?${objectToParams({
      ...searchObj,
      pageNum: i,
      pageSize
    })}">${i}</a>`
    endCount--
  }

  const pagesizearr = ['10', '20', '50']
  let pagesizeList = ''
  pagesizearr.forEach((item, index) => {
    pagesizeList += `<option value="${item}" ${item == pageSize ? 'selected' : ''}>${item}</option>`
  })
  return {
    pageNum,
    pageSize,
    pagesizeList,
    pageLinks: fristLink + prevLink + headLinks + centerLinks + endLinks + nextLink + lastLink,
    totalNum,
    totalPage
  }
}

module.exports = { pageModule, searchPageModule }