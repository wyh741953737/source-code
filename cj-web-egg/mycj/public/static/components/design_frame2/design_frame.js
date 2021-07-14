(function(angular) {

    angular.module('cjCompnentModule')
        .component('designFrame2', {
            templateUrl: '/static/components/design_frame2/design_frame.html',
            controller: designFrameCtrl,
            bindings: {
                parentctrl: '=',
                onLog: '&',
                myselfDesign2:'<'
            }
        })
        .component('designframeShopifym', {
            templateUrl: '/static/components/design_frame2/design_frame_shopifym.html',
            controller: designFrameCtrl,
            bindings: {
                parentctrl: '=',
                onLog: '&'
            }
        })
        .component('designframeShopifypc', {
            templateUrl: '/static/components/design_frame2/design_frame_shopifypc.html',
            controller: designFrameCtrl,
            bindings: {
                parentctrl: '=',
                onLog: '&'
            }
        });
    function designFrameCtrl ($scope, dsp,$timeout) {
        //初始化
        var that=this;
        var canvas;
        var canvasList = [];//canvas对象列表
        var toObjectList = [];//当前区域数据
        var oriSkuMap = {};//商品信息各种列表
        var sucessLinks=[];//最终生成的图片链接
        var canbeTwo = [];//选择变量的列表
        var canvasImgList = [];//背景图片对象
        var finalVitems=[];//选择的变体信息
        $scope.uploadImgType='file';//解决为可重复上传
        $scope.layerList = [];//图层列表
        $scope.width=500;
        $scope.height=500;
        $scope.sendData={//保存时上传数据
            printItemName:'',//区域名称
            description:'',//商品描述
            shopMethod:'Please Select',//物流方式
            customeDesign:[],//设计数据
            originalPid:'',
            cid:'',
            variantKey:'',
            variantKeyEn:''
        };
        $scope.isLoad=false;
        $scope.areaList = [];//区域所有数据
        $scope.isshowColor = false;//添加文字编辑弹框是否显示
        $scope.corlorIndex ='0';//添加文字编辑弹框中颜色
        $scope.colorListTxt = [{color:'#000',name:'black'},{color:'#fff',name:'white'},{color:'#646A69',name:'gray1'},{color:'#989899',name:'gray2'},{color:'#BBBABA',name:'gray3'},{color:'#C70F28',name:'red1'},{color:'#ED1C24',name:'red2'},{color:'#B53333',name:'red3'},{color:'#A95252',name:'red4'},{color:'#680000',name:'red5'},{color:'#C52D89',name:'pink1'},{color:'#D072A6',name:'pink2'},{color:'#F26522',name:'org1'},{color:'#FFC829',name:'yellow1'},{color:'#FFE94D',name:'yellow2'},{color:'#BF854B',name:'brown1'},{color:'#603913',name:'brown2'},{color:'#74A952',name:'green1'},{color:'#46C06E',name:'green2'},{color:'#006838',name:'green3'},{color:'#3399B5',name:'blue1'},{color:'#6EA5D9',name:'blue2'},{color:'#0E3D84',name:'blue3'},{color:'#5D6BD1',name:'blue4'},{color:'#46276B',name:'purple1'},{color:'#8A6AA7',name:'purple2'},{color:'#BB50C3',name:'purple3'}]
        $scope.fontList = ['Arial', 'Amrak', 'Antre', 'Azedo-Light', 'Bend-One', 'Hensa', 'BOMB', 'Cloud-Light', 'Didactic-Regular', 'Facile-Sans', 'GROTESKIA', 'JustinRoad', 'Legendary-ultra-light', 'Matematica-Regular', 'NavyQueenLT', 'NIKOLETA', 'octomorf', 'Panthony', 'QanelasSoftDEMO-UltraLight', 'Rabiola', 'Racer-med-100-font', 'Reef', 'SEANCo-Firefly-2015']
        $scope.areaItem='';//当前区域数据
        $scope.areaType = 0;//定制区域类型
        $scope.isshowMore=false;//是否显示更多区域提示
        $scope.areaListLeft = 0;//区域列表左边距
        $scope.imgShopifyM ="";//shopify中全局区域图片上传
        $scope.productType = dsp.getQueryString('productType');//为2时则是个性包装
        var activeObj = {//选择时边框样式
            hasBorders: true,
            transparentCorners: false,
            borderColor:'#F9AE08',
            cornerColor: '#fff',
            cornerStrokeColor: '#F9AE08',
            cornerSize:6,
            rotatingPointOffset:15
        }
        $scope.isEditText = false;//文字是否是编辑状态
        $scope.chooseIndex = 0;//当前图层选择的节点
        $scope.showType=1;//1：设计图层；2：商品信息;3:显示字体编辑
        $scope.operaObj={//画布下方旋转与大小缩放
            angle:0,
            scale:1
        }
        this.$onChanges = (data)=>{
            if(data.myselfDesign2 && data.myselfDesign2.currentValue){
                const result = data.myselfDesign2.currentValue
                //mycjdesign进入
                if (that.parentctrl == 'designlist') showDesignDo(result);
                $scope.printProFlag = true;
            }
        }
        function resetAreaBackImg(){
            let imgList = [];
            if($scope.varientArr.length>0){
                $scope.varientArr.forEach(item=>{
                    if(item.name=='Color'){
                        item.key.forEach(itemC=>{
                            imgList.push({color:itemC.val,imgsrc:''});
                        })
                    }
                })
            }
            function getBackImg(backList){
                let imgL = imgList.map(item=>{
                    let temp = {color:item.color};
                    backList.forEach(_item=>{
                        if(temp.color==_item.color){
                            temp.imgsrc = _item.imgsrc;
                        }
                    })
                    return temp;
                })
                return imgL;
            }
            $scope.areaList = $scope.areaList.map(item=>{
                item.backImgList = getBackImg(item.backImgList)
                return item;
            })
        }
        function showDesignDo(result){
            $scope.stanProducts = result.stanProducts;//获取的产品详情
            $scope.SKU = result.SKU;
            $scope.sendData.originalPid=result.ID;
            $scope.sendData.cid=result.CATEGORYID;
            $scope.sendData.variantKeyEn=result.VARIANTKEYEN;
            $scope.sendData.variantKey=result.VARIANTKEY;
            infoDatafun(result);
            getPostData(result);
            
            $scope.width=500;
            $scope.height=500;
            if($scope.areaList.length==0){
                $scope.areaList = JSON.parse(result.customMessage);
                // 区域重新赋值
                resetAreaBackImg();
                for(let i=0;i<$scope.areaList.length;i++){
                    $scope.areaList[i].oindex=String.fromCharCode(64 + parseInt(i+1)).toLowerCase();
                }
                setTimeout(function(){//防止dom未渲染获取canvas对象
                    dataInit();
                },400)
            }
        }
        $scope.$on('showdesignframe', function(d,data) {
            $scope.printProFlag = true;
            if (that.parentctrl == 'designlist') {//mycjdesign进入
                if(Array.isArray(JSON.parse(data.customMessage))){
                    let result = data;
                    showDesignDo(result);
                }
            }else{
                dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({
                    id: data,
                    token: ''
                }), function (data) {
                    let result = data.data.result;
                    showDesignDo(result);
                })
            }
            
        });
        // 区域tab操作
        $scope.changeType = function(item,index){
            $scope.showType=1;
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            for(var i=0;i<$scope.layerList.length;i++){
                $scope.layerList[i].isShow=false;
            }
            //存下当前区域图层信息
            let areaObj ={
                layerList:$scope.layerList
            }
            toObjectList.splice($scope.areaType,1,areaObj);

            //切换为点击后的区域
            $scope.areaType = index;
            $scope.areaItem = $scope.areaList[index];
            canvas=canvasList[index];
            $scope.layerList=[];
            $scope.layerList = toObjectList[$scope.areaType].layerList;

            if($scope.areaItem.podType==1){
                if($scope.layerList.length>0){
                    $scope.fontObj.val= $scope.layerList[0].title;
                }else{
                    $scope.fontObj.val= '';
                }
            }
            mouseDown();
        }
        // 数据初始化
        function dataInit(){
            //当前是否生成过背景canvas对象，防止取消后重新点击生成新的对象
            if(canvasImgList.length==0){
                for(let i=0;i<$scope.areaList.length;i++){
                    //初始化所有区域
                    let canvasId = 'canvas'+$scope.areaList[i].oindex;
                    canvas= new fabric.Canvas(canvasId);
                    canvas.lockScalingX = canvas.lockScalingY = true;
                    $scope.areaList[i].left = parseFloat($scope.areaList[i].left);
                    $scope.areaList[i].top = parseFloat($scope.areaList[i].top);
                    $scope.areaItem = $scope.areaList[i];
                    if($scope.areaItem.podType!=2){
                        drawArea();
                    }
                    canvasList.push(canvas); 
                    //处理背景图渲染慢，提前渲染
                    if($scope.areaList[0].backImgList.length>0){
                        let childLen = $scope.areaList[0].backImgList;
                        for(let j=0;j<childLen.length;j++){
                            let canvasImgId = 'canvasimg'+i+j;
                            let canvasImgObj = new fabric.Canvas(canvasImgId);
                            canvasImgObj.lockScalingX = canvasImgObj.lockScalingY = true;
                            let oImage = new Image();
                            oImage.setAttribute('crossOrigin', 'anonymous');
                            oImage.src = $scope.areaList[i].backImgList[j].imgsrc+'?timeStamp='+new Date().getTime();
                            oImage.onload = function(){
                                let omultiple;
                                if(oImage.width>oImage.height){
                                    omultiple=$scope.width/oImage.width;
                                }else{
                                    omultiple=$scope.height/oImage.height; 
                                }
                                let oimg = new fabric.Image(oImage,{
                                    scaleX: omultiple,
                                    scaleY: omultiple,
                                    selectable: false,
                                    left: $scope.width/2, 
                                    top: $scope.height/2,
                                    originX: 'center',
                                    originY: 'center',
                                });
                                canvasImgObj.add(oimg);
                            }
                            canvasImgList.push(canvasImgObj);
                        }
                    }else{
                        let canvasImgId = 'canvasimg'+i;
                        let canvasImgObj = new fabric.Canvas(canvasImgId);
                        canvasImgObj.lockScalingX = canvasImgObj.lockScalingY = true;
                        let oImage = new Image();
                        oImage.setAttribute('crossOrigin', 'anonymous');
                        oImage.src = $scope.areaList[i].img+'?timeStamp='+new Date().getTime();
                        oImage.onload = function(){
                            let omultiple;
                            if(oImage.width>oImage.height){
                                omultiple=$scope.width/oImage.width;
                            }else{
                                omultiple=$scope.height/oImage.height; 
                            }
                            let oimg = new fabric.Image(oImage,{
                                scaleX: omultiple,
                                scaleY: omultiple,
                                selectable: false,
                                left: $scope.width/2, 
                                top: $scope.height/2,
                                originX: 'center',
                                originY: 'center',
                            });
                            canvasImgObj.add(oimg);                                                        
                        }
                        canvasImgList.push(canvasImgObj);
                    }
                    
                    //初始化图层列表
                    let areaObj ={
                        layerList:[]
                    }
                    toObjectList.push(areaObj);
                    
                }
            }
            //初始化数据
            canvas = canvasList[0];
            $scope.areaType = 0;
            $scope.areaItem = $scope.areaList[$scope.areaType];
            canvas.requestRenderAll();
            mouseDown();
            //判断当前区域列表是否溢出，显示滚动条
            let areaListWidth = angular.element('#areaList').width();
            if(areaListWidth>500){
                $scope.isshowMore = true;
            }else{
                $scope.isshowMore = false;
            }
            $scope.$apply();
        }
        //当前区域可编辑框
        function drawArea(){
            var oclipPath='';
            var oclipPath1 ='';
            var areaObj = {
                width: 100, 
                height: 100,
                radius: 50,
                fill: '',
                scaleY: parseFloat($scope.areaItem.scaleY),
                scaleX: parseFloat($scope.areaItem.scaleX),
                left:parseFloat($scope.areaItem.left),
                top:parseFloat($scope.areaItem.top),
                angle:parseFloat($scope.areaItem.angle),
                originX: 'center',
                originY: 'center',
                selectable:false,
                strokeWidth: 2,
                stroke: '#f70',
                strokeDashArray:[3,1] 
            }
            if($scope.areaItem.areaType==1){
                oclipPath = new fabric.Rect(areaObj);
                oclipPath1 = new fabric.Rect(areaObj);
            }else if($scope.areaItem.areaType==2){
                oclipPath = new fabric.Circle(areaObj);
                oclipPath1 = new fabric.Circle(areaObj);
            }else{
                areaObj.strokeWidth=1;
                oclipPath = new fabric.Path($scope.areaItem.path, areaObj);
                oclipPath1 = new fabric.Path($scope.areaItem.path, areaObj);
            }
            canvas.clipPath = oclipPath;
            canvas.add(oclipPath1);
            canvas.requestRenderAll();
        }
        //根据选择画布中的某个item对图层操作
        function mouseDown(){
            canvas.on('mouse:down', function(options) {
                var olist = $scope.layerList;
                if(canvas.getActiveObject()&&!canvas.getActiveObject()._objects){
                    canvas.item(0).set({
                        strokeWidth:1
                    })
                    canvas.requestRenderAll();
                    $scope.operaObj= {
                        angle:canvas.getActiveObject().angle,
                        scale:canvas.getActiveObject().scaleX
                    }
                    changeItemCurr(getCurrentIndex());
                    if (options.target.hasOwnProperty('text')) { 
                        console.log(options.target)
                        $scope.layerList[getCurrentIndex()].title = options.target.text;
                        $scope.fontObj.val = options.target.text;
                        $scope.fontObj.fontSize = options.target.fontSize;
                        $scope.fontObj.charSpacing = options.target.charSpacing;
                        $scope.fontObj.angle = options.target.angle;
                        $scope.fontObj.fontFamily = options.target.fontFamily;
                        $scope.fontObj.strokeWidth = options.target.strokeWidth;
                        for(let i=0;i<$scope.colorListTxt.length;i++){
                            if(options.target.fill==$scope.colorListTxt[i].color){
                                $scope.fontObj.colorName=$scope.colorListTxt[i].name;
                                $scope.fontObj.fill=$scope.colorListTxt[i].color;
                            }
                        }
                    }else{
                        $scope.showType=1;
                    }   
                }else{
                    for(var i=0;i<olist.length;i++){
                        $scope.layerList[i].isShow=false;
                    }
                }
                $scope.$apply();
            });
            canvas.on('mouse:up', function(options) {
                if(canvas.item(0)){
                    canvas.item(0).set({
                        strokeWidth:0
                    })
                    canvas.requestRenderAll();
                }
            })
            canvas.on('object:modified', function(options) {
                console.log(options)
                if(!options.target._objects){
                    if(options.target.hasOwnProperty('text')){
                        $scope.layerList[getCurrentIndex()].title = options.target.text;
                        $scope.fontObj.val = options.target.text;
                    }
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].scaleX = canvas.getActiveObject().scaleX;
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].scaleY = canvas.getActiveObject().scaleY;
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = canvas.getActiveObject().angle;
                    $scope.operaObj.angle = canvas.getActiveObject().angle;
                    $scope.fontObj.angle = canvas.getActiveObject().angle;
                    $scope.$apply();
                }
            });
        }
        // 上传图片
        $scope.upLoadItemImg = function(files){
            if(canvas.getActiveObject()){
                 canvas.discardActiveObject();
            }
            const fileSize = files[0].size/1024/1024
            console.log(files[0].size/1024/1024)
            if(fileSize - 20 > 0 || fileSize*1024 - 10 <= 0){
                layer.msg('The file size should be 10KB – 20MB.');
                return;
            }
            $scope.uploadImgType='text';
            dsp.ossUploadFile(files, function (data) {
                $scope.uploadImgType='file';
                if(data.succssLinks && data.succssLinks[0]){
                    var obj = {
                        type:'Picture',
                        imgsrc:data.succssLinks[0],
                        title:files[0].name,
                        info:'Excellent/178DPI',
                        isShow:true,
                        angle:0
                    }
                    var oImage = new Image();
                    $scope.isLoad=true;
                    oImage.setAttribute('crossOrigin', 'anonymous');
                    oImage.src = data.succssLinks[0]+'?timeStamp='+new Date().getTime();
                    oImage.onload = function(){
                        if(parseFloat($scope.areaItem.scaleX)*100<oImage.width){//当图片大于当前区域时
                            oscalex = parseFloat($scope.areaItem.scaleX)*100/oImage.width;
                        }else{
                            oscalex=1;
                        }
                        var oimg = new fabric.Image(oImage,{
                            left: parseFloat($scope.areaItem.left), 
                            top: parseFloat($scope.areaItem.top),
                            originX: 'center',
                            originY: 'center',
                            scaleX:oscalex,
                            scaleY:oscalex,
                        });
                        obj.imgScalex = oscalex;
                        canvas.add(oimg).setActiveObject(oimg);
                        $scope.layerList.splice(0,0,obj);
                        changeItemCurr(0);
                        canvas.item($scope.layerList.length).set(activeObj);
                        toObjectList.splice($scope.areaType,1,{
                            layerList:$scope.layerList
                        });
                        $scope.isLoad=false;
                        canvas.requestRenderAll();
                        $scope.$apply();
                    }
                }
                
            });
        }
        //添加文字
        $scope.fontObj =  {
            type:"Text",
            left: $scope.areaItem.left,
            top: $scope.areaItem.top,
            fill: '#000',
            strokeWidth: 0,
            stroke: '#000',
            scaleX:1,
            scaleY:1,
            originX: 'center',
            originY: 'center',
            fontFamily:'Arial',
            fontSize:16,
            angle:0,
            charSpacing:0,
            val:'',
            colorName:'black',
            editable:false
        }
        $scope.showAddText = function(){
            $scope.showType=3;
            if(canvas.getActiveObject()){
                canvas.discardActiveObject();
            }
            $scope.isEditText=false;
            // 数据初始化
            $scope.fontObj =  {
                type:"Text",
                left: $scope.areaItem.left,
                top: $scope.areaItem.top,
                fill: '#000',
                strokeWidth: 0,
                stroke: '#000',
                scaleX:1,
                scaleY:1,
                originX: 'center',
                originY: 'center',
                fontFamily:'Arial',
                fontSize:16,
                angle:0,
                charSpacing:0,
                val:'',
                colorName:'black',
                editable:false
            }
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
        //添加文字
        $scope.addTextFun = function(){
            if(!$scope.fontObj.val){
                layer.msg("Please Input the Text");
                return false;
            }
            $scope.showType=1;
        }
        //选择当前图层
        $scope.chooseFun = function(index){
            changeItemCurr(index);
            let canvasI = canvas.getObjects().length-index-1;
            canvas.setActiveObject(canvas.item(canvasI));
            canvas.requestRenderAll();
        }
        //上移图层
        $scope.moveUp = function(index){
            var selected=canvas.getActiveObject();
            if(index!=0){
                selected.bringForward();
                $scope.layerList[index] = ($scope.layerList).splice(index-1,1,$scope.layerList[index])[0];
            }
        }
        //下移图层
        $scope.moveDown= function(index){
            var selected=canvas.getActiveObject();
            var list = $scope.layerList;
            if(index<list.length-1){
                selected.sendBackwards();
                $scope.layerList[index] = ($scope.layerList).splice(index+1,1,$scope.layerList[index])[0];
            }
        }
        //编辑图层
        $scope.editItem = function(index){
            $scope.showType=3;
            $scope.isEditText = true;
            $scope.fontObj.val=$scope.layerList[index].title;
        }
        //复制图层
        var _clipboard;
        $scope.copyFun = function(index){
            if($scope.layerList.length<20){
                if(canvas.getActiveObject().hasOwnProperty('text')){//当前为文字时
                    var _obj = $scope.layerList[index];
                    var newObj = {};
                    for(var key in _obj){
                        newObj[key] = _obj[key];
                    }
                    newObj.isShow = false;
                    canvas.getActiveObject().clone(function(cloned) {
                        _clipboard = cloned;
                    })
                    _clipboard.set({
                        left: _clipboard.left + 10,
                        top: _clipboard.top + 10,
                        evented: true,
                    });
                    canvas.add(_clipboard).setActiveObject(_clipboard);
                    $scope.layerList.splice(0,0,newObj);
                    canvas.item($scope.layerList.length).set(activeObj)
                    changeItemCurr(0);
                    canvas.requestRenderAll();
                }else{
                    $scope.isLoad=true;
                    var obj = {
                        type:'Picture',
                        imgsrc:$scope.layerList[getCurrentIndex()].imgsrc,
                        title:$scope.layerList[getCurrentIndex()].title,
                        info:'Excellent/178DPI',
                        isShow:true,
                        angle:$scope.layerList[getCurrentIndex()].angle,
                        imgScalex:$scope.layerList[getCurrentIndex()].imgScalex
                    }
                    var oImage = new Image();
                    oImage.setAttribute('crossOrigin', 'anonymous');
                    oImage.src = obj.imgsrc+'?timeStamp='+new Date().getTime();
                    oImage.onload = function(){
                        var oimg = new fabric.Image(oImage,{
                            left: $scope.areaItem.left, 
                            top: $scope.areaItem.top,
                            originX: 'center',
                            originY: 'center',
                            scaleX:$scope.layerList[getCurrentIndex()].imgScalex,
                            scaleY:$scope.layerList[getCurrentIndex()].imgScalex,
                        });
                        canvas.add(oimg).setActiveObject(oimg);
                        $scope.layerList.splice(0,0,obj);
                        changeItemCurr(0);
                        canvas.item($scope.layerList.length).set(activeObj);
                        toObjectList.splice($scope.areaType,1,{
                            layerList:$scope.layerList
                        });
                        $scope.isLoad=false;
                        canvas.requestRenderAll();
                        $scope.$apply();
                    }
                }
            }else{
                layer.msg('20 Layers Maximum');
                return false;
            }
        }
        //重置图层
        $scope.resetFun = function(index){
            if(canvas.getActiveObject()){
                $scope.fontObj.left=$scope.areaItem.left;
                $scope.fontObj.top=$scope.areaItem.top;
                $scope.fontObj.angle=0;
                $scope.operaObj.angle=0;
                $scope.operaObj.scale=1;
                if(!canvas.getActiveObject().hasOwnProperty('text')){
                    $scope.fontObj.scaleX=$scope.layerList[getCurrentIndex()].imgScalex;
                    $scope.fontObj.scaleY=$scope.layerList[getCurrentIndex()].imgScalex;
                }
                canvas.getActiveObject().set($scope.fontObj)
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again.')
                }
            }
        }
        //删除图层
        $scope.delItem = function(index){
            let canvasI = canvas.getObjects().length-index-1;
            $scope.layerList.splice(index,1);
            canvas.remove(canvas.item(canvasI))
        }
        //图层选择显示
        function changeItemCurr(index){
            var olist = $scope.layerList;
            for(var i=0;i<olist.length;i++){
                $scope.layerList[i].isShow=false;
            }
            $scope.layerList[index].isShow=true;
            $scope.chooseIndex = index;
        }
        //获取编辑的当前图层index
        function getCurrentIndex(){
            let oindex;
            for(var i=0;i<canvas.getObjects().length;i++){
                if(canvas.getObjects()[i]==canvas.getActiveObject()){
                    oindex=canvas.getObjects().length-1-i;
                }
            }
            return oindex;
        }
        //减少旋转角度
        $scope.reduceAngle=function(){
            if($scope.operaObj.angle<=-360){
                $scope.operaObj.angle=-360;
                return;
            }
            if(canvas.getActiveObject()){
                $scope.operaObj.angle = parseInt($scope.operaObj.angle)-1;
                $scope.fontObj.angle =  $scope.operaObj.angle;
                canvas.getActiveObject().set({
                    'angle':$scope.operaObj.angle
                })
                canvas.requestRenderAll();
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.operaObj.angle;
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //增加旋转角度
        $scope.addAngle = function(){
            if($scope.operaObj.angle>=360){
                $scope.operaObj.angle=360;
                return;
            }
            if(canvas.getActiveObject()){
                $scope.operaObj.angle = parseInt($scope.operaObj.angle)+1;
                $scope.fontObj.angle =  $scope.operaObj.angle;
                canvas.getActiveObject().set('angle', $scope.operaObj.angle);
                canvas.requestRenderAll();
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.operaObj.angle;
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        $scope.blurAngel = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set('angle', $scope.operaObj.angle);
                $scope.fontObj.angle =  $scope.operaObj.angle;
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.operaObj.angle;
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        $scope.blurAngel = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set('angle', $scope.operaObj.angle);
                canvas.requestRenderAll();
            }
        }
        //缩小或扩大
        $scope.changeScale = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set({
                    'scaleX':$scope.operaObj.scale,
                    'scaleY':$scope.operaObj.scale
                });
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].scale = $scope.operaObj.scale;
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //水平居中
        $scope.alignCenterFun = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set({
                    'left':$scope.areaItem.left
                });
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].left = $scope.areaItem.left;
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //垂直居中
        $scope.middleCenterFun = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set({
                    'top':$scope.areaItem.top
                });
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].top = $scope.areaItem.top;
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //文字输入控制
        $scope.textInput = function(){
            if(canvas.getActiveObject()){
                if($scope.fontObj.val){
                    canvas.getActiveObject().set({
                        'text':$scope.fontObj.val
                    });
                    $scope.operaObj= {
                        angle:canvas.getActiveObject().angle,
                        scale:canvas.getActiveObject().scaleX
                    }
                    changeItemCurr(getCurrentIndex());
                    $scope.layerList[getCurrentIndex()].title = $scope.fontObj.val;
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].title = $scope.fontObj.val;
                    canvas.requestRenderAll();
                }else{
                    canvas.remove(canvas.getActiveObject());
                    $scope.layerList.splice(getCurrentIndex(),1)
                }
            }else{
                if(!$scope.isEditText){
                    var obj = {
                        type:'Text',
                        imgsrc:'',
                        title:$scope.fontObj.val,
                        info:'Excellent/178DPI',
                        isShow:true,
                        fill: '#000',
                        strokeWidth: 0,
                        stroke: '#000',
                        scaleX:1,
                        scaleY:1,
                        originX: 'center',
                        originY: 'center',
                        fontFamily:'Arial',
                        fontSize:16,
                        angle:0,
                        charSpacing:0,
                        val:'Default Font',
                    }
                    $scope.fontObj.left = parseFloat($scope.areaItem.left);
                    $scope.fontObj.top = parseFloat($scope.areaItem.top);
                    if($scope.areaItem.podType==1){
                        if(canvas.item(1)){
                            canvas.remove(canvas.item(1));
                            $scope.layerList =[];
                        }
                        $scope.fontObj.fill="#000";
                    }
                    var otext = new fabric.IText($scope.fontObj.val,$scope.fontObj);
                    canvas.add(otext).setActiveObject(otext);
                    $scope.layerList.splice(0,0,obj);
                    var olen = $scope.layerList.length;
                    canvas.item($scope.layerList.length).set(activeObj);
                    changeItemCurr(olen-1);
                    canvas.requestRenderAll();
                    toObjectList.splice($scope.areaType,1,{
                        layerList:$scope.layerList
                    });
                }
            }
        }
        //改变字体颜色
        $scope.changeTextColor = function(item){
            $scope.fontObj.fill  =item.color;
            $scope.fontObj.colorName  =item.name;
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set({
                    'fill':item.color
                });
                canvas.requestRenderAll();
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].fill = item.color;
                console.log('toObjectList====',toObjectList)
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //改变文字字体
        $scope.changeFontStyle = function(){
            if(canvas.getActiveObject()){
                canvas.getActiveObject().set({
                    'fontFamily':$scope.fontObj.fontFamily
                });
                canvas.requestRenderAll();
                toObjectList[$scope.areaType].layerList[getCurrentIndex()].fontFamily = $scope.fontObj.fontFamily;
                canvas.requestRenderAll();
            }else{
                if($scope.layerList.length==0){
                    layer.msg('No layer found. Please add a layer at least.')
                }else{
                    layer.msg('No layer selected, please select it and try again')
                }
            }
        }
        //添加文字减少操作
        $scope.reduceFont = function(type){
            if(type=='size'){
                if($scope.fontObj.fontSize==12){
                    return;
                }
                if(canvas.getActiveObject()){
                    $scope.fontObj.fontSize = parseFloat($scope.fontObj.fontSize)-1;
                    canvas.getActiveObject().set({
                        'fontSize':$scope.fontObj.fontSize
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].fontSize = $scope.fontObj.fontSize;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='space'){
                if(canvas.getActiveObject()){
                    $scope.fontObj.charSpacing=parseFloat($scope.fontObj.charSpacing)-10;
                    canvas.getActiveObject().set({
                        'charSpacing':$scope.fontObj.charSpacing
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].charSpacing = $scope.fontObj.charSpacing;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='angle'){
                if($scope.fontObj.angle==0){
                    return;
                }
                if(canvas.getActiveObject()){
                    $scope.fontObj.angle=parseFloat($scope.fontObj.angle)-1;
                    $scope.operaObj.angle=$scope.fontObj.angle;
                    canvas.getActiveObject().set({
                        'angle':$scope.fontObj.angle
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.fontObj.angle;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='stroke'){
                if($scope.fontObj.strokeWidth==0){
                    return;
                }
                if(canvas.getActiveObject()){
                    $scope.fontObj.strokeWidth = parseFloat($scope.fontObj.strokeWidth)-1;
                    canvas.getActiveObject().set({
                        'strokeWidth':$scope.fontObj.strokeWidth
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].strokeWidth = $scope.fontObj.strokeWidth;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }
            canvas.requestRenderAll();
        }
        //添加文字增加操作
        $scope.addFont = function(type){
            if(type=='size'){
                if(canvas.getActiveObject()){
                    $scope.fontObj.fontSize = parseFloat($scope.fontObj.fontSize)+1;
                    canvas.getActiveObject().set({
                        'fontSize':$scope.fontObj.fontSize
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].fontSize = $scope.fontObj.fontSize;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='space'){
                if(canvas.getActiveObject()){
                    $scope.fontObj.charSpacing=parseFloat($scope.fontObj.charSpacing)+10;
                    canvas.getActiveObject().set({
                        'charSpacing':$scope.fontObj.charSpacing
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].charSpacing = $scope.fontObj.charSpacing;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='angle'){
                if(canvas.getActiveObject()){
                    $scope.fontObj.angle=parseFloat($scope.fontObj.angle)+1;
                    $scope.operaObj.angle=$scope.fontObj.angle;
                    canvas.getActiveObject().set({
                        'angle':$scope.fontObj.angle
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.fontObj.angle;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='stroke'){
                if(canvas.getActiveObject()){
                    $scope.fontObj.strokeWidth = parseFloat($scope.fontObj.strokeWidth)+1;
                    canvas.getActiveObject().set({
                        'strokeWidth':$scope.fontObj.strokeWidth
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].strokeWidth = $scope.fontObj.strokeWidth;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }
            canvas.requestRenderAll();
        }
        $scope.fontBlur = function(type){
            if(type=='size'){
                if($scope.fontObj.fontSize<12){
                    $scope.fontObj.fontSize=12;
                }
                if(canvas.getActiveObject()){
                    canvas.getActiveObject().set({
                        'fontSize':$scope.fontObj.fontSize
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].fontSize = $scope.fontObj.fontSize;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='space'){
                if(canvas.getActiveObject()){
                    canvas.getActiveObject().set({
                        'charSpacing':$scope.fontObj.charSpacing
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].charSpacing = $scope.fontObj.charSpacing;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='angle'){
                if(canvas.getActiveObject()){
                    canvas.getActiveObject().set({
                        'angle':$scope.fontObj.angle
                    });
                    $scope.operaObj.angle=$scope.fontObj.angle;
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].angle = $scope.fontObj.angle;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }else if(type=='stroke'){
                if(canvas.getActiveObject()){
                    canvas.getActiveObject().set({
                        'strokeWidth':$scope.fontObj.strokeWidth
                    });
                    toObjectList[$scope.areaType].layerList[getCurrentIndex()].strokeWidth = $scope.fontObj.strokeWidth;
                }else{
                    if($scope.layerList.length==0){
                        layer.msg('No layer found. Please add a layer at least.')
                    }else{
                        layer.msg('No layer selected, please select it and try again')
                    }
                }
            }
            canvas.requestRenderAll();
        }
        //限制数字输入
        $scope.numberInput=function(type){
            if(type=='anglel'){
                $scope.operaObj.angle=($scope.operaObj.angle).replace(/[^\d]/g,'');
            }else if(type=='anglef'){
                $scope.fontObj.angle=($scope.fontObj.angle).replace(/[^\d]/g,'');
            }else if(type=='size'){
                $scope.fontObj.fontSize = $scope.fontObj.fontSize.replace(/[^\d]/g,'');
            }else if(type=='space'){
                $scope.fontObj.charSpacing=($scope.fontObj.charSpacing).replace(/[^\d]/g,'');
            }else if(type=='stroke'){
                $scope.fontObj.strokeWidth = ($scope.fontObj.strokeWidth).replace(/[^\d]/g,'');
            }
        } 
        $scope.printItemNameInput = function(){
            $scope.sendData.printItemName = $scope.sendData.printItemName.replace(/[_]/g,'');
        }
        //区域超出范围加提示
        $scope.showMoreArea = function(){
            let areaListWidth =angular.element('#areaList').width();
            if($scope.areaListLeft+50<areaListWidth){
                $scope.areaListLeft = $scope.areaListLeft+50;
            }else{
                $scope.areaListLeft = 0;
            }
            angular.element('.area-list-box').scrollLeft($scope.areaListLeft);
        }
        // 最终提交
        $scope.colorList = [];
        $scope.saveFun=function(){
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            $scope.colorList = [];//选择后的颜色列表
            let allCheck=true,uncheckName;//未选择的信息
            let oriSkuMapKey = Object.keys(oriSkuMap);
            for(let i=$scope.varientArr.length-1;i>=0;i--){
                //判断有颜色时是否选中
                if($scope.varientArr[i].name=='Color'){
                    let colorL = $scope.varientArr[i].key;
                    for(let j=0;j<colorL.length;j++){
                        $scope.colorList.push(colorL[j]);
                    }
                }
                if(!$scope.varientArr[i].isCheck){
                    uncheckName = $scope.varientArr[i].name;
                    allCheck=false;
                }
            }
            if(allCheck){//全部已选中处理数据
                var result = new Array();
                finalVitems=[];
                var Vitems = []
                for (let i = 0; i < $scope.varientArr.length; i++) {
                    result = getChooseData($scope.varientArr[i].key, result);
                    if(i==$scope.varientArr.length-1){
                        Vitems = result;//获取最终生成的变量信息
                    }
                }
                for(let i=0;i<Vitems.length;i++){
                    if(oriSkuMapKey.indexOf(Vitems[i])>-1){
                        finalVitems.push(Vitems[i])
                    }
                }
                if(finalVitems.length==0 && !~oriSkuMapKey.indexOf('default')){
                    return layer.msg('The current catagory does not exist, please select again')
                }
            }
            if(!$scope.sendData.printItemName){
                layer.msg('Please Input Product Title');
                return false;
            }else if(!allCheck){
                if (uncheckName == 'size' || uncheckName == 'Size') {
                    layer.msg('Please select at least 1 ' + uncheckName.toLowerCase() + '.');
                    return false;
                }
                layer.msg('Please Select ' + uncheckName);
                return false;
            }else if($scope.sendData.shopMethod=='Please Select'&& that.parentctrl!='shopifym'&&$scope.productType!=3){
                layer.msg('Please select the shipping method.');
                return false;
            }
            getImages();
        }
        function dataURLtoFile(dataurl, filename) { //将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        function getImages(){
            let fileLists=[];
            $scope.isLoad = true;
            for(let i=0;i<canvasList.length;i++){
                let canvasObj = canvasList[i];//编辑区域画板
                if(canvasObj.item(0)){//去掉当前区域的区域框
                    canvasObj.item(0).set({
                        strokeWidth:0
                    });
                }
                let areaImg = canvasObj.toDataURL();
                let imgIcon = new Image();
                imgIcon.setAttribute('crossOrigin', 'anonymous');
                imgIcon.src = areaImg;
                imgIcon.onload = function(){
                    let acimg = new fabric.Image(imgIcon,{
                        left: $scope.width/2, 
                        top: $scope.height/2,
                        originX: 'center',
                        originY: 'center',
                    });
                    if($scope.colorList.length!=0){
                        let colorL = $scope.colorList.length;
                        for(let j=0;j<colorL;j++){
                            if($scope.colorList[j].check){
                                let canvasImg=canvasImgList[i*colorL+j];
                                canvasImg.add(acimg);
                                canvasImg.requestRenderAll();
                                let htmlImg = canvasImg.toDataURL();
                                let colorVal=($scope.colorList[j].val).replace(/\s/g,'');
                                let areaName=($scope.areaList[i].areaName).replace(/\s/g,'');
                                fileLists.push(dataURLtoFile(htmlImg,`_${areaName}_${colorVal}.png`));
                            }
                        }
                    }else{//不存在颜色变体时
                        let canvasImg=canvasImgList[i];
                        canvasImg.add(acimg);
                        canvasImg.requestRenderAll();
                        let htmlImg = canvasImg.toDataURL();
                        let areaName=($scope.areaList[i].areaName).replace(/\s/g,'');
                        //当前会有两种情况，无颜色cj端的pod商品，及其无颜色的shopify端的pod商品
                        if($scope.areaList[i].backImgList.length==0){
                            if($scope.productType==3){//当前为个性包装
                                fileLists.push(dataURLtoFile(htmlImg,`_${areaName}_default.png`));
                            }else{
                                fileLists.push(dataURLtoFile(htmlImg,`_${areaName}_default.png`));
                            }
                        }else{//有颜色的shopify端的pod商品
                            let colorVal=($scope.areaList[i].backImgList[0].color).replace(/\s/g,'');
                            fileLists.push(dataURLtoFile(htmlImg,`_${areaName}_${colorVal}.png`));
                        }
                        
                    }
                    if(i==canvasList.length-1){
                        $scope.isLoad = false;
                        const showLinks = [];
                        fileLists.forEach((item, idx) => {
                             let callback = (cmd, arg) => {
                                let name = arg;
                                if (cmd === 'filename') {
                                    console.log('==========', arg);
                                    name = arg.split('.')[0]+item.name;
                                }
                                return name;
                            };
                            console.log(item)
                            cjUtils.uploadFileToOSS({
                                signatureURL: dsp.signatureURL,
                                callback,
                                file: item,
                            }).then(link => {
                                $scope.isLoad = false;
                                showLinks.push(link);
                                console.log('---------------', showLinks);
                                if (showLinks.length === fileLists.length) {
                                    $scope.$apply();
                                    $scope.sendData.img=showLinks.join(',');
                                    for(let k=0;k<showLinks.length;k++){
                                        let linkArr = showLinks[k].split('_');
                                        let linkObj = {
                                            imgsrc:showLinks[k],
                                            areaName:linkArr[1],
                                            color:linkArr[2].split('.')[0]
                                        }
                                        if(linkArr[1]==($scope.areaList[0].areaName).replace(/\s/g,'')){
                                            $scope.sendData.bigImg=showLinks[k];
                                        }
                                        sucessLinks.push(linkObj);
                                    }
                                    if(that.parentctrl=='shopifypc'||that.parentctrl=='shopifym'){
                                        realSubmitShopify();
                                    }else{
                                        realSubmit();
                                    }
                                }
                            }).catch(err=>{
                                console.log(err)
                                $scope.isLoad = false;
                                layer.msg("Submission failed. Please try it again.")
                            })
                        })
                    }
                }
                
            }       
        }
        function realSubmit () {
            //设计信息及其效果图存储
            $scope.sendData.customeDesign = []
            for(let i=0;i<$scope.areaList.length;i++){
                let designObj = {
                    layer:toObjectList[i].layerList,
                    links:[],
                    areaName:$scope.areaList[i].areaName,
                    type:$scope.areaList[i].type
                }
                for(let j=0;j<sucessLinks.length;j++){
                    if(sucessLinks[j].areaName==($scope.areaList[i].areaName).replace(/\s/g,'')){
                        designObj.links.push(sucessLinks[j].imgsrc);
                    }
                }
                $scope.sendData.customeDesign.push(designObj);
            }
            //变体信息
            var variants = [];
            let colorI=-1;
            let areaName = $scope.areaList[0].areaName.replace(/\s/g,'');
            for(let k=0;k<$scope.varientArr.length;k++){
                if($scope.varientArr[k].name=='Color'){
                    colorI = k;
                }
            }
            if(finalVitems.length>0){
                for(let i=0;i<finalVitems.length;i++){
                    let olink='';
                    let color= '';
                    if(colorI != -1){
                        color=finalVitems[i].split('-')[colorI].replace(/\s/g,'');
                        for(let j=0;j<sucessLinks.length;j++){
                            if(sucessLinks[j].color==color&&sucessLinks[j].areaName==areaName){
                                olink = sucessLinks[j].imgsrc;
                            }
                        }
                    }else{
                        olink = $scope.sendData.bigImg;
                    }
                    variants.push({
                        originalVid: oriSkuMap[finalVitems[i]].ID,
                        childsku: finalVitems[i],
                        img: olink,
                        variantKey: finalVitems[i],
                        nameEn: $scope.sendData.printItemName + ' ' + finalVitems[i].replace(/-/g, ' ')
                    });
                }
            }else{
                variants.push({
                    originalVid: oriSkuMap['default'].ID,
                    childsku: 'default',
                    img: $scope.sendData.bigImg,
                    variantKey: 'default',
                    nameEn: $scope.sendData.printItemName
                });
            }
            $scope.sendData.variants=variants;
            $scope.sendData.nameEn = $scope.sendData.printItemName;
            const type = dsp.getQueryString('type');
            $scope.sendData.type = type || '1';
            layer.load(2);
            dsp.postFun('product-api/app/locProduct/addIndividualization', $scope.sendData, function (data) {
                console.log(data);
                if (data.data.statusCode == 200) {
                    $scope.printProFlag=false;
                    if($scope.sendData.type=='2'){
                        $scope.designHref="myCJ.html#regular-packaging/MY";
                        $scope.designText = "This product added to your My Custom Packaging successfully!";
                    }else{
                        $scope.designHref = "myCJ.html#pod/design-myself";
                        $scope.designText = "The product you designed has been added. You can find it in My CJ > Print on Demand > My Design.";
                    }
                    layer.closeAll('loading');
                    if (that.parentctrl == 'productdetail') {
                        $scope.designSuccLayer = 1;
                    }
                    if (that.parentctrl == 'designlist') {
                        layer.msg('Submit successfully');
                    }
                    $scope.$emit('todesignlist', 'deleteone');
                    resetData();
                } else {
                    layer.closeAll();
                    layer.msg('Submit failed');
                    $scope.sendData.customeDesign =[];
                    sucessLinks=[];
                    for(let i=0;i<canvasList.length;i++){
                        let canvasObj = canvasList[i];//编辑区域画板
                        if(canvasObj.item(0)){//去掉当前区域的区域框
                            canvasObj.item(0).set({
                                strokeWidth:1
                            });
                        }
                    }
                    
                }
            });
        }
        //处理选中的列表
        function getChooseData(list, temp) {
            var result = new Array();
            if (temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                    for (var j = 0; j < list.length; j++) {
                        if (!!list[j].check) {
                            result.push(temp[i] + '-' + list[j].val);
                        }
                    }
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    if (!!list[i].check) {
                        result.push(list[i].val);
                    }
                }
            }
            return result;
        }
        //商品信息选择操作，单选与全选
        $scope.checkAllFun = function(index){
            /* if($scope.varientArr[index].disable){
                return;
            } */
            $scope.varientArr[index].checkAll=true;
            $scope.varientArr[index].isCheck=true;
            for(let i=0;i<$scope.varientArr[index].key.length;i++){
                $scope.varientArr[index].key[i].check=true;
            }
            for (var i = 0; i < $scope.varientArr.length; i++) {
                $scope.varientArr[i].currKey = null;
                for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
                    $scope.varientArr[i].key[j].disable= false;
                }
            }
        }
        /* 移除当前变体全选 */
        $scope.removeCheckAllFun = function(index){
            $scope.varientArr[index].checkAll=false;
            $scope.varientArr[index].isCheck=false;
            for(let i=0;i<$scope.varientArr[index].key.length;i++){
                $scope.varientArr[index].key[i].check=false;
            }
        }
        /* 单个变体选择 */
        $scope.checkFun = function(index,indexChild){
            if($scope.varientArr[index].key[indexChild].disable){
                return;
            }
            $scope.varientArr[index].key[indexChild].check=true;
            $scope.varientArr[index].isCheck=true;
            let ischeckAll = true;
            for(let i=0;i<$scope.varientArr[index].key.length;i++){
                if(!$scope.varientArr[index].key[i].check){
                    ischeckAll=false;
                }
            }
            $scope.varientArr[index].checkAll=ischeckAll;
            $scope.varientArr[index].disable=false;
            let oval = $scope.varientArr[index].key[indexChild].val;

            changeVarientArr(oval,index);
        }
        /* 移除单个变体选择 */
        $scope.removeCheckFun = function(index,indexChild){
            $scope.varientArr[index].key[indexChild].check=false;
            $scope.varientArr[index].checkAll=false;
            let choose=false;
            canbeTwo = [];//重置选择
            for(let i=0;i<$scope.varientArr[index].key.length;i++){
                if($scope.varientArr[index].key[i].check){
                    choose=true;
                    $scope.varientArr[index].isCheck=true;
                    changeVarientArr($scope.varientArr[index].key[i].val,index);
                }
            }
            if(!choose){
                for(let i=0;i<$scope.varientArr.length;i++){
                    for(let j=0;j<$scope.varientArr[i].key.length;j++){
                        $scope.varientArr[i].key[j].disable=false;
                    }
                }
            }
        }
        function changeVarientArr(checkVal, curIndex) {
            if (checkVal == null) {
                for (let i = 0; i < $scope.varientArr.length; i++) {
                    if (i == curIndex) continue;
                    for (let j = 0; j < $scope.varientArr[i].key.length; j++) {
                        if ($scope.varientArr[i].key[j].disable != true) {
                            $scope.varientArr[i].key[j].disable = false;
                        }
                    }
                }
                return;
            }
            // checkVal:当前选择的变量 blue
            // curIndex:当前选择的变量索引 0
            var filterKeysOne = []; // 第一个过滤数组
            for (let m = 0; m < $scope.varientKeysInner.length; m++) {
                // 对变体数组进行遍历，
                var curVarKey = $scope.varientKeysInner[m].split('-');
                if (curVarKey[curIndex] == checkVal) {
                    filterKeysOne.push(curVarKey);
                }
            }

            console.log(filterKeysOne);
            for (let i = 0; i < $scope.varientArr.length; i++) {
                if (i == curIndex) continue;
                for (let j = 0; j < filterKeysOne.length; j++) {
                    if(canbeTwo.indexOf(filterKeysOne[j][i])==-1){
                        canbeTwo.push(filterKeysOne[j][i])
                    }
                }
                console.log(canbeTwo);
                for (let j = 0; j < $scope.varientArr[i].key.length; j++) {
                    if (canbeTwo.indexOf($scope.varientArr[i].key[j].val) != -1) {
                        $scope.varientArr[i].key[j].disable = false;
                    } else {
                        $scope.varientArr[i].key[j].disable = true;
                        $scope.varientArr[i].key[j].check=false;
                        $scope.varientArr[i].disable=true;
                    }
                }
            }
        }
        
        //商品信息数据
        function infoDatafun(currentMerch){
            
            $scope.stanProducts = currentMerch.stanProducts;
            $scope.varientArr = [];
            $scope.varientKeys = [];
            if (currentMerch.VARIANTKEYEN != '') {
                $scope.varientKeys = currentMerch.VARIANTKEYEN.split('-');
                for (var i = 0; i < $scope.varientKeys.length; i++) {
                    $scope.varientArr.push({
                        name: $scope.varientKeys[i] && $scope.varientKeys[i].replace(/^\S/, s => s.toUpperCase()),
                        key: [],
                        checkAll: false,
                        isCheck:false
                    });
                }
                for (var i = 0; i < $scope.stanProducts.length; i++) {
                    if ($scope.stanProducts[i].VARIANTKEY != null) {
                        var curVarientVal = $scope.stanProducts[i].VARIANTKEY.split('-');
                        for (var j = 0; j < curVarientVal.length; j++) {
                            $scope.varientArr[j].key.push({
                                val: curVarientVal[j],
                                check: false,

                            });
                        }
                    }
                    oriSkuMap[$scope.stanProducts[i].VARIANTKEY] = $scope.stanProducts[i];
                }
                for (var i = 0; i < $scope.varientArr.length; i++) {
                    var temArr = []
                    for (var j = 0; j < $scope.varientArr[i].key.length; j++){
                        if (temArr.indexOf($scope.varientArr[i].key[j].val)==-1) {
                           temArr.push($scope.varientArr[i].key[j].val) ;
                        }
                    }
                    $scope.varientArr[i].key = [];
                    for (var k = 0; k < temArr.length; k++) {
                       $scope.varientArr[i].key.push({
                            val: temArr[k],
                            check: false,
                            disable:false
                       });
                    }
                }
            } else {
                $scope.varientArr = [];
                oriSkuMap[$scope.stanProducts[0].VARIANTKEY] = $scope.stanProducts[0];
            }
            if ($scope.varientArr.length == 1 && $scope.varientArr[0].key.length == 0) {
                $scope.varientArr = [];
            }
            $scope.varientKeysInner = Object.keys(oriSkuMap);
            console.log(oriSkuMap)
            console.log($scope.varientArr);
        }
        //获取物流方式
        function getPostData(currentMerch){
            var getWayData = {}
            getWayData.weight = currentMerch.PACKWEIGHT;
            getWayData.lcharacter = currentMerch.PROPERTYKEY;
            dsp.postFun2('getWayBy.json', JSON.stringify(getWayData), function (n) {
              $scope.postlist = n.data;
            }, function (error) {
                console.log('物流获取失败，原因：'+error)
            });
        }
        //重置数据
        function resetData(){
            $scope.areaList=[];
            canvasList = [];//canvas对象列表
            toObjectList = [];//当前区域数据
            oriSkuMap = {};//商品信息各种列表
            sucessLinks=[];//最终生成的图片链接
            canvasImgList = [];//背景图片对象
            finalVitems=[];
            $scope.areaList = [];//区域所有数据
            $scope.isshowColor = false;//添加文字编辑弹框是否显示
            $scope.corlorIndex ='0';//添加文字编辑弹框中颜色
            $scope.areaItem='';//当前区域数据
            $scope.areaType = 0;//定制区域类型
            $scope.isshowMore=false;//是否显示更多区域提示
            $scope.areaListLeft = 0;//区域列表左边距
            $scope.isshowColor = false;//添加文字编辑弹框是否显示
            $scope.corlorIndex ='0';//添加文字编辑弹框中颜色
            $scope.isEditText = false;//文字是否是编辑状态
            $scope.chooseIndex = 0;//当前图层选择的节点
            $scope.showType=1;//1：设计图层；2：商品信息;3:显示字体编辑
            $scope.printProFlag=false;
            $scope.fontObj.val="";
            $scope.layerList =[];
            $scope.sendData={//保存时上传数据
                printItemName:'',//区域名称
                description:'',//商品描述
                shopMethod:'Please Select',//物流方式
                customeDesign:[],//设计数据
                originalPid:'',
                cid:'',
                variantKey:'',
                variantKeyEn:''
            };
        }
        // shopify处理数据
        if(this.parentctrl=='shopifym' ||this.parentctrl=='shopifypc'){
            // 重置区域
            if(this.parentctrl=='shopifym'){
                $scope.width=320;
                $scope.height=320;
            }else{
                $scope.width=500;
                $scope.height=500;
                $scope.printProFlag=true;
            }
            let omultiple = 500/$scope.width;
            // 区域重新赋值
            $scope.$on('mdata', function(event,data) {
                if($scope.areaList.length==0){
                    $scope.language = data.language;
                    $scope.areaList = [...data.areaList];
                    setTimeout(function(){//防止dom未渲染获取canvas对象
                        dataInit();
                    },400)
                }else{
                    for(let i=0;i<canvasImgList.length;i++){
                        canvasImgList[i].clear().renderAll();
                    }
                    for(let i=0;i<$scope.areaList.length;i++){
                        $scope.areaList[i].backImgList=data.areaList[i].backImgList;
                        let oImage = new Image();
                        oImage.setAttribute('crossOrigin', 'anonymous');
                        if($scope.areaList[i].backImgList.length>0){
                            oImage.src = $scope.areaList[i].backImgList[0].imgsrc+'?timeStamp='+new Date().getTime();
                        }else{
                            oImage.src = $scope.areaList[i].img+'?timeStamp='+new Date().getTime();
                        }
                        oImage.onload = function(){
                            let omultiple;
                            if(oImage.width>oImage.height){
                                omultiple=$scope.width/oImage.width;
                            }else{
                                omultiple=$scope.height/oImage.height; 
                            }
                            let oimg = new fabric.Image(oImage,{
                                scaleX: omultiple,
                                scaleY: omultiple,
                                selectable: false,
                                left: $scope.width/2, 
                                top: $scope.height/2,
                                originX: 'center',
                                originY: 'center',
                            });
                            canvasImgList[i].add(oimg);
                            canvasImgList[i].requestRenderAll
                        }
                    }
                }
                for(let i=0;i<$scope.areaList.length;i++){
                    $scope.areaList[i].oindex=String.fromCharCode(64 + parseInt(i+1)).toLowerCase();
                    $scope.areaList[i].left=$scope.areaList[i].left/omultiple;
                    $scope.areaList[i].top=$scope.areaList[i].top/omultiple;
                    $scope.areaList[i].scaleX=$scope.areaList[i].scaleX/omultiple;
                    $scope.areaList[i].scaleY=$scope.areaList[i].scaleY/omultiple;
                }
                
                $scope.$apply();
            });
        }
        //shopify全局区域素材图上传
        $scope.upLoadItemImgShopify = function(files){
            toObjectList[0].layerList=[];
            dsp.ossUploadFile(files, function (data) {
                if(data.succssLinks&& data.succssLinks[0]){
                    $scope.imgShopifyM=data.succssLinks[0];
                    toObjectList[0].layerList.push({
                        type:'Picture',
                        imgsrc:data.succssLinks[0],
                        title:files[0].name,
                        info:'Excellent/178DPI',
                        isShow:true,
                        angle:0
                    })
                    $scope.$apply();
                }
            })
        }
        //shopify最终保存
        $scope.saveShopify = function(){
            getImages();
        }
        // shopify提交接口
        function realSubmitShopify(){
            var orderHttp = 'https://order.cjdropshipping.com/order/oldOrder/addPodPropertiesInfo';
            customInfoSubmit =[]
            for(let i=0;i<$scope.areaList.length;i++){
                let designObj = {
                    layer:toObjectList[i].layerList,
                    links:[],
                    areaName:$scope.areaList[i].areaName,
                    type:$scope.areaList[i].type
                }
                for(let j=0;j<sucessLinks.length;j++){
                    if(sucessLinks[j].areaName==($scope.areaList[i].areaName).replace(/\s/g,'')){
                        designObj.links.push(sucessLinks[j].imgsrc);
                    }
                }
                customInfoSubmit.push(designObj);
            }
            postFun(orderHttp, JSON.stringify({
                Custom_id: JSON.stringify(customInfoSubmit)
            }), function (data) {
                console.log(data);
                var data = JSON.parse(data);
                if (data.statusCode == 200) {
                    layer.msg('Save successfully');

                    var customInfo='';
                    for(let i=0;i<toObjectList.length;i++){
                        for(let j=0;j<toObjectList[i].layerList.length;j++){
                            customInfo=customInfo+','+toObjectList[i].layerList[j].title;
                        }
                    }
                    console.log(customInfo)
                    window.parent.postMessage({
                        flag: 'saveFromCJ',
                        data: {
                            customId: data.result,
                            customeInfo: customInfo
                        }
                    }, "*");
                } else {
                    layer.msg('Save failed');
                }
            });
        }
        $scope.closeIframe=function(){
            window.parent.postMessage({
                flag: 'closeFromCJ',
                data: ''
              }, "*");
        }
        function postFun(url, data, fn) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            // 添加http头，发送信息至服务器时内容编码类型
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
              }
            };
            xhr.send(data);
        }
    }

})(angular);