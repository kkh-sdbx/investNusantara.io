/*
백엔드(Node.js) Cron Job 구성안
서버 측에서 24시간마다 데이터를 갱신하는 로직의 핵심 구조입니다.
javascript
*/
const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');

// 매일 새벽 3시에 실행 (인도네시아와 한국 시차 고려 가능)
cron.schedule('0 3 * * *', async () => {
    try {
        console.log('OverPass API 데이터 갱신 시작...');
        // 1. OverPass API 호출 (누산타라 구역 쿼리)
        const response = await axios.get('https://overpass-api.de[out:json];...');
        
        // 2. 필요한 데이터만 가공 (GeoJSON 형식으로 변환)
        const geoData = transformToGeoJSON(response.data); 
        
        // 3. 결과를 파일로 저장 (클라이언트는 이 파일을 읽음)
        fs.writeFileSync('./public/properties.json', JSON.stringify(geoData));
        console.log('데이터 갱신 완료.');
    } catch (error) {
        console.error('갱신 실패:', error);
    }
});


// 3. 서버(Node.js)에서 저장된 JSON 데이터 가져오기
// 이 파일은 Cron Job으로 생성된 최신 부동산 정보라고 가정합니다.
fetch('/api/investment-zones') 
    .then(res => res.json())
    .then(geojsondata => {
        L.geoJSON(geojsondata, {
            style: function(feature) {
                // 투자 등급에 따라 색상 차별화 (예시)
                switch (feature.properties.grade) {
                    case 'A': return { color: "#ff4757", weight: 3, fillOpacity: 0.4 };
                    case 'B': return { color: "#ffa502", weight: 2, fillOpacity: 0.3 };
                    default: return { color: "#2ed573", weight: 1, fillOpacity: 0.2 };
                }
            },
            onEachFeature: function (feature, layer) {
                // 클릭 시 전문적인 투자 정보 팝업
                const content = `
                    <div style="padding:10px">
                        <h3 style="margin:0">${feature.properties.name}</h3>
                        <hr>
                        <p><b>투자 등급:</b> ${feature.properties.grade} 급</p>
                        <p>${feature.properties.description}</p>
                        <button onclick="alert('투자 가이드 신청 완료!')" style="width:100%; cursor:pointer">상세 리포트 받기</button>
                    </div>
                `;
                layer.bindPopup(content);
            }
        }).addTo(map);
    })
    .catch(err => console.error("데이터 로드 실패:", err));
