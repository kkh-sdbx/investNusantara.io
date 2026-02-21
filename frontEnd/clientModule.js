// https://kkh-sdbx.github.io/investNusantara.io/ 로 접속

console.log("https://kkh-sdbx.github.io/investNusantara.io/");

/*
2. z-index를 활용한 구역 표시 (Overlay)
지도 위에 특정 '구역(Polygon)'을 그려 투자 유망 지역을 시각화하고 싶으시다면, CSS의 z-index보다 Leaflet의 도형 함수를 쓰는 것이 훨씬 정확하고 쉽습니다.
방법: L.rectangle이나 L.polygon을 사용하면 지도 줌 수준에 맞춰 구역 크기가 자동으로 조절됩니다.
javascript
// 투자 유망 구역을 사각형으로 표시
var investZone = L.rectangle([
    [-0.840, 116.685], // 좌측 상단
    [-0.860, 116.720]  // 우측 하단
], {color: "#ff7800", weight: 1, fillOpacity: 0.3}).addTo(map);

investZone.bindPopup("외국인 투자 우대 구역 (VAT 면제)");


!!3. GeoJSON으로 '부동산 투자 맵' 만들기
GeoJSON은 지도 위의 점, 선, 면을 설명하는 표준 JSON 형식입니다. 마커 하나보다 '구역 전체'를 보여줄 때 강력합니다.
[GeoJSON 예시: 누산타라 KIPP 구역]
json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "정부 핵심 구역(KIPP)",
        "investment_status": "High",
        "description": "대통령궁 및 주요 부처 밀집 지역"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [116.680, -0.830], [116.700, -0.830],
            [116.700, -0.850], [116.680, -0.850], [116.680, -0.830]
          ]
        ]
      }
    }
  ]
}
    [Leaflet에서 GeoJSON 그리기]
javascript
fetch('properties.json')
    .then(res => res.json())
    .then(geojsondata => {
        L.geoJSON(geojsondata, {
            style: function(feature) {
                return { color: "#ff7800", weight: 2, fillOpacity: 0.5 };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.name + "</h3>" + feature.properties.description);
            }
        }).addTo(map);
    });

*/