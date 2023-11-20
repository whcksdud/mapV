import sys
import pandas as pd
import folium
from folium.plugins import HeatMap
from folium import CircleMarker, Popup

# Get the CSV file path from the command line arguments
csv_file_path = sys.argv[1]

data = pd.read_csv("DY_HM_concentration.csv", encoding='cp949')

m = folium.Map(location=[data['위도'].mean(), data['경도'].mean()], zoom_start=15)

heat_data = [[row['위도'], row['경도']] for index, row in data.iterrows()]
HeatMap(heat_data).add_to(m)

for index, row in data.iterrows():
    popup_text = f"Cd: {row['Cd']}, Cu: {row['Cu']}, As: {row['As']}, Pb: {row['Pb']}, Zn: {row['Zn']}, Ni: {row['Ni']}"
    
    circle_marker = CircleMarker(location=[row['위도'], row['경도']], radius=5, color='blue', fill=True, fill_color='blue', popup=Popup(popup_text, max_width=200))
    circle_marker.add_to(m)
m.add_child(folium.LatLngPopup())
m.save('heatmap11.html')