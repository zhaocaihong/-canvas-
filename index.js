// Import stylesheets
import './style.css';
import { Map, Marker, Icon, Canvas, CircleMarker, Polygon } from 'leaflet';

// 一、地图层叠
// 创建道德api
const amap = new AMap.Map('amap', {
  fadeOnzoom: false,
  navigationMode: 'classic',
  zooms: [1, 20],
  viewMode: '2D',
  features: ['road', 'point', 'bg'],
  zoomEnable: false,
  animateEnable: false,
  dragEnable: false,
  doubleClickZoom: false,
  keyboardEnable: false,
  scrollWheel: false,
  // mapStyle: 'normal',
  // mapStyle: 'amap://styles/961a0543d63fa02fc8e6fd8231401d99', // 自定义地图的地址https://geohub.amap.com/mapstyle/index
});

// 创建leaflet,
// 二、默认是svg渲染，改为canvas渲染，marker是img，其余是path，改为canvas
const map = new Map('map', {
  renderer: new Canvas(),
});

map.on('zoom', (e) => {
  amap.setZoom(e.target.getZoom());
});

map.on('move', (e) => {
  const pt = e.target.getCenter();
  amap.setZoomAndCenter(e.target.getZoom(), [pt.lng, pt.lat]);
});

map.setView([39.90656, 116.397411], 10);

// 点，图标
const svg =
  '<svg t="1656483609762" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2371" width="200" height="200"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#FF3D00" p-id="2372"></path></svg>';
new Marker([39.909186, 116.397411], {
  icon: new Icon({
    iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
    iconSize: [40, 40],
  }),
}).addTo(map);

new CircleMarker([39.909186, 116.33711]).addTo(map);

// 三、地图层级
// zIndex只对img有效，其他canvas，path无效
// bringToFront()  bringToBack()
// 后画在上面

// 第二种方法：marker:400,  线，图形（600）
map.createPane('myPane');
map.getPane('myPane').style.zIndex = 403;

const g1 = new Polygon(
  [
    [39.953438, 116.2923431],
    [39.953174, 116.388816],
    [116.382293, 39.917899],
    [116.319808, 39.92421],
    [116.28479, 39.9547534],
  ],
  {
    stroke: false,
    fillColor: 'blue',
    fillOpacity: 1,
    pane: 'myPane',
  }
).addTo(map);

const g2 = new Polygon(
  [
    [39.94527896472492, 116.32392883300781],
    [39.9436996796908, 116.35637283325194],
    [139.93435483065249, 16.35242462158202],
    [116.32701873779297, 39.93488133494281],
    [116.31757736206053, 39.94159390960449],
    [116.31328582763672, 39.947911025436746],
    [116.32307052612305, 39.94514735903112],
  ],
  {
    stroke: false,
    fillColor: 'red',
    fillOpacity: 1,
  }
).addTo(map);

// 改变层级:第一种方法
g1.bringToFront();
