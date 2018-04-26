/**
 * @file 百度地图 - 地图找老师专用
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    /**
     * 用来储存已经被初始化过的map控件
     *
     * @inner
     * @type {Object}
     */
    var existedMap = {

    };

    var map;
    var coordinate = [];
    var callback = null;
    var mySwitchCtrl = null ; // 自定义控件
    var myResearchCtrl = null ;
    var switchFlag = true; // 地图搜索开关
    var switchInput = null;
    var markers = [];
    var zIndex = 99999;

    // 复杂的自定义覆盖物
    function CustomOverlay(point, data){
      this._point = point;
      this._avatar = data.avatar;
      this._name = data.name;
      this._school_age = data.school_age;
      this._location = data.location;
      this._url = data.url;
    }
    CustomOverlay.prototype = new BMap.Overlay();
    CustomOverlay.prototype.initialize = function(map){
        /*"<img style='float:left;margin-right:12px' id='imgDemo' src='"+data.avatar+"@1e_40w_40h_1c_0i_1o_90Q_1x.jpeg' width='40' height='40' title='"+data.name+"'/>" +
        "<div style=''>"+
            "<span style='font-size:14px;color:#3d3d3d;margin-right:20px;'>"+data.name+"</span>"+
            "<span style='font-size:12px;color:#6d6d6d;'><img style='margin-right:5px;position:relative;top:3px;' src='http://cdn.gsxservice.com/asset/img/teacher/teach_time.png'>"+school_age_txt+"</span>"+
            "<div style='font-size:12px;color:#6d6d6d;'><img style='margin-right:5px;position:relative;top:3px;' src='http://cdn.gsxservice.com/asset/img/teacher/location.png'>"+data.location+"</div>"+
        "</div>";*/



      this._map = map;
      var div = this._div = document.createElement("a");
      div.href = this._url;
      div.target = "_blank";
      div.style.display = "block";
      div.style.position = "absolute";
      div.style.backgroundColor = '#fff';
      div.style.padding = '12px';
      div.style.width = '250px';
      /*div.style.height = '66px';
      div.style.width = '276px';*/
      div.style.boxShadow = '0px 3px 10px #dfdfdf';
      div.style.borderRadius = '5px';
      div.className = 'teacher-box';



      // 教师头像
      var imgAvatar = document.createElement('img');
      imgAvatar.src = this._avatar;
      imgAvatar.width = 40;
      imgAvatar.height = 40;
      imgAvatar.title = this._name;
      imgAvatar.style.display = 'inline-block';
      imgAvatar.style.zoom = 1;
      imgAvatar.style.float = 'left';
      imgAvatar.style.marginRight = '12px';
      div.appendChild(imgAvatar);

      // 教师信息容器
      var tBox = document.createElement("div");
      tBox.style.float = 'left';
      tBox.style.display = 'inline-block';
      tBox.style.zoom = 1;
      div.appendChild(tBox);

      // 教师名字
      var spanName = document.createElement("span");
      tBox.appendChild(spanName);
      spanName.appendChild(document.createTextNode(this._name));
      spanName.style.fontSize = '14px';
      spanName.style.color = '#3d3d3d';
      spanName.style.marginRight = '10px';
      tBox.appendChild(spanName);

      // 教师教龄
      var spanSchoolAge = document.createElement("span");
      spanSchoolAge.style.fontSize = '12px';
      spanSchoolAge.style.color = '#6d6d6d';
      // 教师教龄图片
      var imgSchoolAge = document.createElement('img');
      imgSchoolAge.src = 'http://cdn.gsxservice.com/asset/img/teacher/teach_time.png';
      imgSchoolAge.width = 17;
      imgSchoolAge.height = 17;
      imgSchoolAge.style.top = '3px';
      imgSchoolAge.style.position = 'relative';
      imgSchoolAge.style.marginRight = '5px';
      spanSchoolAge.appendChild(imgSchoolAge);
      // 教师教龄文字
      spanSchoolAge.appendChild(document.createTextNode(this._school_age));
      // 加入教龄
      tBox.appendChild(spanSchoolAge);

      // 教师地址
      var spanLocation = document.createElement("span");
      spanLocation.style.fontSize = '12px';
      spanLocation.style.color = '#6d6d6d';
      spanLocation.style.display = 'block';
      // 教师地址图片
      var imgLocation = document.createElement('img');
      imgLocation.src = 'http://cdn.gsxservice.com/asset/img/teacher/location.png';
      imgLocation.width = 14;
      imgLocation.height = 16;
      imgLocation.style.top = '3px';
      imgLocation.style.position = 'relative';
      imgLocation.style.marginRight = '5px';
      spanLocation.appendChild(imgLocation);
      // 教师地址文字
      spanLocation.appendChild(document.createTextNode(this._location));
      // 加入教师地址
      tBox.appendChild(spanLocation);


      /*div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }*/

      map.getPanes().labelPane.appendChild(div);

      return div;
    }
    CustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - 120 + "px";
      this._div.style.top  = pixel.y - 100 + "px";
    }

    // 添加样式伪类
    function _registerStyle(){
        // Create a new style tag
        var style = document.createElement("style");

        // Append the style tag to head

        if (document.head) {
            document.head.appendChild(style);
        } else {
            document.appendChild(style);
        }
        // Grab the stylesheet object
        var sheet = style.sheet

        // Use addRule or insertRule to inject styles
        if (sheet) {
            if (sheet.addRule) {
                sheet.addRule('.teacher-box::before',"border:7px solid transparent;content:' ';border-top-color:#dfdfdf;top:67px;left:112px;position:absolute;");
                sheet.addRule('.teacher-box::after',"border:7px solid transparent;content:' ';border-top-color:#fff;top:66px;left:112px;position:absolute;");
            } else if (sheet.insertRule) {
                sheet.insertRule(".teacher-box::before{border:7px solid transparent;content:' ';border-top-color:#dfdfdf;top:67px;left:112px;position:absolute;}", 0);
                sheet.insertRule(".teacher-box::after{border:7px solid transparent;content:' ';border-top-color:#fff;top:66px;left:112px;position:absolute;}", 0);
            }
        }
    }

    // 拖动地图事件
    function _dragMethod(){

        // 改变地图触发搜索
        if (switchFlag) {
            // 触发搜索
            callback('search');
        } else {
            // 替换控件
            map.removeControl(mySwitchCtrl);
            if (myResearchCtrl) {
                map.addControl(myResearchCtrl);
            } else {
                _customResearchControl();
            }
        }

    }

    // 缩放地图事件
    function _zoomMethod(){

        // 改变地图触发搜索
        if (switchFlag) {
            // 触发搜索
            callback('search');
        } else {
            // 替换控件
            map.removeControl(mySwitchCtrl);
            if (myResearchCtrl) {
                map.addControl(myResearchCtrl);
            } else {
                _customResearchControl();
            }
        }
    }

    // 自定义控件 - 移动地图时搜索
    function _customSwitchControl() {
        // 定义一个控件类,即function
        function SwitchControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
          this.defaultOffset = new BMap.Size(80, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        SwitchControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        SwitchControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          var div = document.createElement("div");
          var input = document.createElement('input');
          var label = document.createElement('label');

          input.type = 'checkbox';
          input.checked = true;
          input.style.position = 'relative';
          input.style.top = '2px';
          input.style.marginRight = '5px';
          input.style.cursor = "pointer";

          switchInput = input;

          label.style.cursor = "pointer";
          label.appendChild(input);
          // 添加文字说明
          label.appendChild(document.createTextNode("移动地图时搜索"));

          div.appendChild(label);

          // 设置样式
          div.style.cursor = "pointer";
          div.style.border = "1px solid #B3B3B3";
          div.style.fontSize = "12px";
          div.style.color = "#6d6d6d";
          div.style.padding = "6px 10px";
          div.style.backgroundColor = "white";
          div.style.borderRadius = "2px";

          // 绑定事件,点击一次放大两级
          input.onclick = function(e){
            if (input.checked) {
                // 开启拖动事件
                //map.addEventListener('dragend', _dragMethod);
                switchFlag = true;
            } else {
                // 关闭拖动事件
                //map.removeEventListener('dragend', _dragMethod);
                switchFlag = false;
            }
          }
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        }
        // 创建控件
        mySwitchCtrl = new SwitchControl();
        // 添加到地图当中
        map.addControl(mySwitchCtrl);
    }

    // 自定义控件 - 在此重新搜索
    function _customResearchControl() {
        // 定义一个控件类,即function
        function ResearchControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
          this.defaultOffset = new BMap.Size(80, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ResearchControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ResearchControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          var div = document.createElement("div");

          // 刷新图片
          var img = document.createElement('img');
          img.src = 'http://cdn.gsxservice.com/asset/img/teacher/refresh.png';
          img.width = 14;
          img.height = 15;
          img.style.top = '2px';
          img.style.position = 'relative';
          img.style.marginRight = '5px';
          div.appendChild(img);

          // 添加文字说明
          div.appendChild(document.createTextNode("在此重新搜索"));

          // 设置样式
          div.style.cursor = "pointer";
          div.style.border = "1px solid #D53A48";
          div.style.fontSize = "12px";
          div.style.color = "#fff";
          div.style.padding = "6px 10px";
          div.style.backgroundColor = "#FF5666";
          div.style.borderRadius = "2px";

          // 绑定事件,点击重新搜索
          div.onclick = function(e){
            // TODO: 触发重新搜索操作
            callback('search',null,function(){

                map.removeControl(myResearchCtrl);
                map.addControl(mySwitchCtrl);
                switchInput.checked = false;
                switchFlag = false;
            });
          }

          div.onmouseover = function(e) {
            div.style.backgroundColor = "#E54D5C";
          }

          div.onmouseout = function(e) {
            div.style.backgroundColor = "#FF5666";
          }
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        }
        // 创建控件
        myResearchCtrl = new ResearchControl();
        // 添加到地图当中
        map.addControl(myResearchCtrl);
    }

    // 编写自定义函数,创建标注
    function _addMarker(point,data,index){
        // 自定义图标
        var icon = new BMap.Icon('http://cdn.gsxservice.com/asset/img/teacher/map/point'+(index+1)+'.png', new BMap.Size(29,47));
        var icon_hover = new BMap.Icon('http://cdn.gsxservice.com/asset/img/teacher/map/point_hover'+(index+1)+'.png', new BMap.Size(29,47));
        var marker = new BMap.Marker(point, {icon:icon});
        map.addOverlay(marker);

        var school_age_txt = data.school_age == -1 ? '30年以上教龄' : data.school_age +'年教龄';
        var location_txt = data.location.length > 10 ? data.location.substr(0, 10) + '...' : data.location;
        var name_txt = data.name.length > 4 ? data.name.substr(0,4) + '...' : data.name;

        // 百度地图API功能
        var compOverlay = new CustomOverlay(point, {
            avatar: data.avatar+'@1e_40w_40h_1c_0i_1o_90Q_1x.jpeg',
            name: name_txt,
            school_age: school_age_txt,
            location: location_txt,
            url: data.detail_url
        });
        map.addOverlay(compOverlay);
        compOverlay.hide();

        var zindex = zIndex--;
        marker.setZIndex(zindex);
        marker
        .addEventListener('click', function(){
           compOverlay.show();
           //location.href = 'www.baidu.com';
           window.open(data.detail_url);
           //图片加载完毕重绘infowindow
           /*document.getElementById('imgDemo').onload = function (){
               infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
           }*/
        });
        marker.addEventListener('mouseover', function(e){
            marker.setIcon(icon_hover);
            marker.setZIndex(-99999);
            callback('mouseover',index);
            compOverlay.show();
        });
        marker.addEventListener('mouseout', function(e){
            //setTimeout(function(){
                marker.setIcon(icon);
                marker.setZIndex(99999);
                callback('mouseout',index);
                compOverlay.hide();
            //}, 800);
        });

        markers[index] = {
            marker: marker,
            infoWindow: compOverlay,
            icon: icon,
            icon_hover: icon_hover
        };
    }

    // 数据转换转成标准格式
    function _dataConvert(teachers) {

        coordinate = [];
        markers = [];

        for (var i = 0 ; i < teachers.length ; i++) {
            coordinate.push({
                'name': teachers[i].name,
                'avatar': teachers[i].avatar_url,
                'school_age': teachers[i].school_age,
                'location': teachers[i].location,
                'detail_url': teachers[i].detail_url,
                'lng': teachers[i].longitude,
                'lat': teachers[i].latitude
            });
        }
    }

    // 往地图上加点
    function _addPoints(teachers, first) {

        if (!teachers) {
            return;
        }

        _dataConvert(teachers);

        if (coordinate.length < 1) {
            return;
        }
        var points = [];
        // 遍历存储的坐标点,标注到地图上
        for (var i = 0 ; i < coordinate.length ; i++) {
            var dot = new BMap.Point(coordinate[i].lng, coordinate[i].lat);
            points.push(dot);
            _addMarker(dot,coordinate[i],i);
        }
        // 初始的时候用这个，如果每次都用会干扰缩放
        if (first) {
            map.setViewport(points);
        }
    }

    /**
     * 罗列 areaList 进行标注
     *
     * @param {string} id 元素 ID，不包含 #
     * @param {string} area 地址列表
     */
    exports.init = function (id, teachers, cb) {

        _dataConvert(teachers);
        callback = cb;

        // 添加伪类样式
        _registerStyle();
        // 初始化
        // 百度地图API功能
        map = new BMap.Map(id);

        // 初始化地图,设置中心点坐标和地图级别
        if (teachers && teachers[0]) {
            // 生成中心点和缩放级别
            // 去经纬度的最大最小值相加除2得到中心点
            // 取最远两点的距离和地图的宽度来设置缩放级别3-19
            var minLng = null,
                minLat = null,
                maxLng = null,
                maxLat = null;
            for (var i = 0 ; i < teachers.length; i++) {
                if (!minLng) {
                    minLng = teachers[i].longitude;
                } else {
                    if (minLng > teachers[i].longitude) {
                        minLng = teachers[i].longitude;
                    }
                }
                if (!minLat) {
                    minLat = teachers[i].latitude;
                } else {
                    if (minLat > teachers[i].latitude) {
                        minLat = teachers[i].latitude;
                    }
                }
                if (!maxLng) {
                    maxLng = teachers[i].longitude;
                } else {
                    if (maxLng < teachers[i].longitude) {
                        maxLng = teachers[i].longitude;
                    }
                }
                if (!maxLat) {
                    maxLat = teachers[i].latitude;
                } else {
                    if (maxLat < teachers[i].latitude) {
                        maxLat = teachers[i].latitude;
                    }
                }
            }
            var pA = new BMap.Point(minLng, minLat);
            var pB = new BMap.Point(maxLng, minLat);
            // 百度地图支持的缩放级别 3 - 18
            /*
                2000km - 3
                1000km - 4
                500km  - 5
                200km  - 6
                100km  - 7
                50km   - 8
                25km   - 9
                20km   - 10
                10km   - 11
                5km    - 12
                2km    - 13
                1km    - 14
                0.5km  - 15
                0.2km  - 16
                0.1km  - 17
                0.05km - 18

            */

            // 单位为千米
            var distance = (map.getDistance(pA,pB)/1000).toFixed(3);
            var level = 11;
            if (distance > 2000) {
                level = 4;
            } else if (distance > 1000) {
                level = 5;
            } else if (distance > 500) {
                level = 6;
            } else if (distance > 200) {
                level = 7;
            } else if (distance > 100) {
                level = 8;
            } else if (distance > 50) {
                level = 9;
            } else if (distance > 25) {
                level = 10;
            } else if (distance > 20) {
                level = 11;
            } else if (distance > 10) {
                level = 12;
            } else if (distance > 5) {
                level = 13;
            } else if (distance > 2) {
                level = 14;
            } else if (distance > 1) {
                level = 15;
            } else if (distance > 0.5) {
                level = 16;
            } else if (distance > 0.2) {
                level = 17;
            } else {
                level = 18;
            } /*if (distance > 0.2) {
                level = 18;
            } else if (distance > 0.1) {
                level = 17;
            } else {
                level = 18;
            }*/
            map.centerAndZoom(new BMap.Point( ((minLng+maxLng)/2),
                                          ((minLat+maxLat)/2) ),
                          level);
        } else {
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        }

        // 添加放大缩小按钮
        /*var top_left_navigation = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_ZOOM});*/
        var top_left_navigation = new BMap.NavigationControl();

        map.addControl(top_left_navigation);

        // 启用滚轮放大缩小
        map.enableScrollWheelZoom();

        // 添加自定义控件
        _customSwitchControl();

        //deletePoints();
        //map.getZoom();
        //map.setZoom(4);


        // 第一次加载的时候标注节点
        _addPoints(teachers, true);

        // 拖动事件
        map.addEventListener('dragend', _dragMethod);

        // 缩放事件
        map.addEventListener('zoomend', _zoomMethod);

    }

    /**
     * 清除地图上的节点
     */
    exports.deletePoints = function () {
        var allOverlay = map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++){
            map.removeOverlay(allOverlay[i]);
        }
    }

    /**
     * 添加地图上的节点
     */
    exports.addPoints = function (teachers) {
        _addPoints(teachers);
    }

    /**
     * 删除自定义控件
     */
    exports.removeControl = function () {
        map.removeControl(mySwitchCtrl);
    }

    /**
     * 获取地图半径
     */
    exports.getMapData = function () {
        //获取当前显示地图数据
        var data = {};
        //中心点
        var center = map.getCenter();
        //获取可视区域右上角的点
        var bs = map.getBounds();
        var ne = bs.getNorthEast(); // 东北
        var sw = bs.getSouthWest(); // 西南

        //

        var pointA = new BMap.Point(sw.lng, sw.lat);
        var pointB = new BMap.Point(ne.lng, ne.lat);
        var pointC = new BMap.Point(sw.lng, ne.lat);
        // 半径：单位为千米
        var radiusW = (map.getDistance(pointA,pointC)/2000).toFixed(3);
        var radiusH = (map.getDistance(pointB,pointC)/2000).toFixed(3);

        data.lng = center.lng;
        data.lat = center.lat;
        data.radius = Math.min(radiusW, radiusH);

        return data;
    }


    /**
     * 显示地图上的点的标签
     */
    exports.openInfoWindow = function (index) {

        var element = markers[index];
        if (element) {
            element.infoWindow.show();
            element.marker.setIcon(element.icon_hover);
            element.marker.setZIndex(-99999);
        }

    }


    /**
     * 隐藏地图上的点的标签
     */
    exports.hideInfoWindow = function (index) {

        var element = markers[index];
        if (element) {
            element.infoWindow.hide();
            element.marker.setIcon(element.icon);
            element.marker.setZIndex(99999);
        }

    }


});