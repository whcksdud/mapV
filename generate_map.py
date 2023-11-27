# generate_map.py
import sys
import pandas as pd
import folium
from folium.plugins import HeatMap
from folium import CircleMarker, Popup

json_file_path = sys.argv[1]
selected_columns = sys.argv[2].split(',')

data = pd.read_json(json_file_path, encoding='utf8')

m = folium.Map(location=[data['위도'].mean(), data['경도'].mean()], zoom_start=15)

heat_data = []
for col in selected_columns:
    if col in data.columns:
        heat_data += [[row['위도'], row['경도'], row[col]] for index, row in data.iterrows()]

HeatMap(heat_data, radius=15).add_to(m)

for index, row in data.iterrows():
    popup_text = ', '.join([f"{col}: {row[col]}" for col in selected_columns if col in row and row[col]])

    circle_marker = CircleMarker(location=[row['위도'], row['경도']], radius=2, color='blue', fill=True, fill_color='blue', fill_opacity=0.5, popup=Popup(popup_text, max_width=200))
    circle_marker.add_to(m)
m.add_child(folium.LatLngPopup())
m.save('./heatmap.html')