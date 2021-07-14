let warehouseList = [
    { name: 'Ship from All Warehouses', val: 'all', nationType: 'all' },
    { name: 'China Warehouse', val: 'china', nationType: 'China' },
    { name: 'US Warehouse', val: 'us', nationType: 'USA' },
    { name: 'Thailand Warehouse', val: 'th', nationType: 'TH' }
]
let typeList = [
    { name: 'Sort All Types', val: 'all', isShow: true, flag: 0 },
    { name: 'Video Products', val: 'video', isShow: true, flag: 0 },
    { name: 'Listable Products', val: 'list', isShow: true, flag: 2 },
    { name: 'Source Products', val: 'source', isShow: true, flag: 1 },
    { name: 'New Products', val: 'new', isShow: true, flag: 3 }
]
let bannerList = [
    { img_url: 'static/image/list-detail/banner-1.jpg', link: '', skipType: '1' },
    { img_url: 'static/image/list-detail/banner-2.png', link: 'https://cjdropshipping.com/2019/10/09/cjdropshipping-is-helping-dropshippers-who-want-to-scale-up-selling-to-usa-in-q4/', skipType: '2' },
    { img_url: 'static/image/list-detail/banner-3.jpg', link: 'special/thai/index.html', skipType: '3' },
];
export {warehouseList,typeList,bannerList};