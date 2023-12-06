# mapV

## **1. 개요**

**해당 서비스는 사용자가 JSON 파일을 업로드하고, 특정 열(column)을 선택하여 환경성평가지도 Heatmap을 생성하는 기능을 제공합니다.** 

## ****2. 기능 목록****

### **2.1 JSON 파일 업로드와 Heatmap 생성 (POST '/json')**

**사용자가 웹 페이지에서 JSON 파일을 업로드하고, 체크박스로 원하는 열(column)을** 

**선택한 후 "Upload json" 버튼을 클릭하면, 서버는 이 정보를 받아 Heatmap을 생성**

**Heatmap 생성에 성공하면, "View Map" 버튼이 화면에 표시**

**error시 에러 코드 콘솔로 반환** 

```jsx
javascript

$.ajax({
    url: '/json',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(data) {
      if (data.success) {
        $('#view-button').show();
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
});

```

### **2.2 Heatmap 보기**

**사용자가 "View Map" 버튼을 클릭하면, 생성된 Heatmap 페이지를 새 탭에서 열어줍니다.**

**요청 예시 (IP주소는 자신 컴퓨터 주소로 변경해야 함)** 

```jsx
javascript

function viewMap() {
  window.open('http://203.234.55.134/heatmap.html', '_blank');
}
```

 

### **2.3  GET '/',  ⇒ index.html 반환**

**get을 통해 index.html 반환** 

```jsx
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
```

### **2.4  POST '/json' ⇒ 사용자가 업로드 한  json을 통해 heatmap 형성**

```jsx
app.post('/json', upload.single('jsonfile'), (req, res) => {
  const options = {
    args: [req.file.path, req.body.selectedColumns],
  };
  PythonShell.run('generate_map.py', options, function (err, result) {
    if (err) throw err;
    res.json({ success: true });  
  });
});
```

### **2.5**  CSV 파일을 JSON 형태로 변경

```jsx

import pandas as pd
import json
 
df = pd.read_csv('DY_HM_concentration.csv', encoding='cp949')
 
df = df[['Name', '경도','위도', 'Cd', 'Cu', 'As', 'Pb', 'Zn', 'Ni']]
 
data_dict = df.to_dict(orient='records')

json_data = json.dumps(data_dict, ensure_ascii=False, indent=4)
 
with open('Data.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
```

**CSV 파일을 데이터 프레임을 통해 CSV 파일을 JSON 형태로 변경** 

