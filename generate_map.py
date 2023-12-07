# generate_map.py
import sys
import pandas as pd
import folium
from folium.plugins import HeatMap
from folium import CircleMarker, Popup
from folium.plugins import MarkerCluster
import uuid  
import json

jsondata = sys.argv[1]
data = json.loads(jsondata)
df = pd.DataFrame(data)

m = folium.Map(location=[df['위도'].mean(), df['경도'].mean()], zoom_start=15)

# 히트맵을 위한 데이터 리스트 생성
heat_data = [[row['위도'], row['경도']] for idx, row in df.iterrows()]

# 히트맵 생성 및 지도에 추가
HeatMap(heat_data).add_to(m)

# 마커 클러스터 생성
marker_cluster = MarkerCluster().add_to(m)

# 각 데이터 포인트에 대해 지도에 마커 추가
for idx, row in df.iterrows():
    folium.Marker(
        location=[row['위도'], row['경도']],
        popup=f"<b>{row['Name']}</b><br>Cd: {row['Cd']}, Cu: {row['Cu']}, As: {row['As']}, Pb: {row['Pb']}, Zn: {row['Zn']}, Ni: {row['Ni']}",
        icon=folium.Icon(color='blue', icon='info-sign')
    ).add_to(marker_cluster)
m.add_child(folium.LatLngPopup())

uuid_str = str(uuid.uuid4())
file_name = f'./{uuid_str}.html'
m.save(file_name)

print(file_name)