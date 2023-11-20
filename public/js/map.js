var mapContainer = document.getElementById("map"),
mapOption = {
center: new kakao.maps.LatLng(35.945581, 126.683075),
level: 3,
};

var map = new kakao.maps.Map(mapContainer, mapOption);

function addMarker(site, lat, lng, pop, pop2) {



  var newPos = new kakao.maps.LatLng(parseFloat(lat), parseFloat(lng));

  var marker = new kakao.maps.Marker({
      position: newPos,
  });

  marker.setMap(map);

  var iwContent =
      '<div style="padding:5px;"> 부지:'+ site +
      '<br>오염물질: ' +
      pop +
      '<br>오염정도: ' +
      pop2 +
      '</div>',

  iwPosition = newPos;

  var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
  });

 // 마커에 클릭 이벤트 리스너를 등록합니다.
 kakao.maps.event.addListener(marker, 'click', function() {
     // 만약 이미 열려있는 인포윈도우가 있다면 닫습니다.
     if (infowindow.getMap()) {
         infowindow.close();
     } else { // 그렇지 않다면 현재 마커의 인포윈도우를 엽니다.
         infowindow.open(map, marker);
     }
 });

 // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
 map.setCenter(newPos);

 return marker;
}