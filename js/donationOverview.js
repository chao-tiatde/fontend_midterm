// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDPifQUmES6_NQDDkOzA18SS_2-1-DRZTg",
    authDomain: "frontend-midterm-4a62f.firebaseapp.com",
    projectId: "frontend-midterm-4a62f",
    storageBucket: "frontend-midterm-4a62f.firebasestorage.app",
    messagingSenderId: "922826580440",
    appId: "1:922826580440:web:1aae31a36a0b4a9d1ad2ad",
    measurementId: "G-VXTCCCKXCL"
  };
  // 初始化 Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // 設置欄位結構
  const columnDefs = [
    { headerName: "名義", field: "名義", filter: "agTextColumnFilter"},
    { headerName: "單位名稱", field: "單位名稱", filter: "agTextColumnFilter"},
    { headerName: "日期", field: "日期", filter: "agTextColumnFilter"},
    { headerName: "時間", field: "時間", filter: "agTextColumnFilter"},
    { headerName: "縣市", field: "縣市", filter: "agTextColumnFilter"},
    { headerName: "地區", field: "地區", filter: "agTextColumnFilter"},
    { headerName: "地點（類別）", field: "地點類別", filter: "agTextColumnFilter"},
    { headerName: "詳細地點", field: "詳細地點", filter: "agTextColumnFilter"},
    { headerName: "其他地點", field: "其他地點", filter: "agTextColumnFilter" },
    { headerName: "類別（物品）", field: "物品類別", filter: "agTextColumnFilter" },
    { headerName: "物品名稱/ 件數", field: "物品名稱及件數", filter: "agTextColumnFilter"},
    { headerName: "預計受惠人數", field: "預計受惠人數", type: "numericColumn", filter: "agNumberColumnFilter"},
    { headerName: "備註", field: "備註", sortable: false }
  ];

  // 初始化空的資料
  const rowData = [];

  // 從 Firestore 獲取資料
  db.collection("donate registration")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      rowData.push(doc.data());
    });

    // 初始化 AG Grid
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      headerHeight: 50,
      rowHeight: 55,
      animateRows: true,
      defaultColDef: {
      resizable: true,
      animateRows: true,
      sortable: true,
      filter: true,
      icons: {
        sortAscending: '<i class="fas fa-arrow-up"></i>',  // 使用 FontAwesome 升序箭頭
        sortDescending: '<i class="fas fa-arrow-down"></i>',  // 使用 FontAwesome 降序箭頭
        filter: '<i class="fas fa-filter"></i>'  // 使用 FontAwesome 過濾器圖標
      },
      },
      onGridReady: (params) => {
        params.api.sizeColumnsToFit(); // 初始化时自動調整列寬
      },
      onFilterChanged: (params) => {
        const filteredData = [];
        params.api.forEachNodeAfterFilter((node) => {
          filteredData.push(node.data); // 收集篩選後的資料
        });
        updateCharts(filteredData); // 傳遞篩選後的資料到圖表更新函數
      },
    };

    const eGridDiv = document.querySelector("#myGrid");
    new agGrid.Grid(eGridDiv, gridOptions);

    // 初始化圖表1
    const chartOptions1 = {
      chart: { type: "bar", height: 400 },
      series: [],
      xaxis: { categories: [] },
      colors: ["#19396d","#354567","#a3a5a6" ,"#47587d"],// 設定條形顏色
      title: { text: "詳細地點 vs 預計受惠人數 (分類: 類別)" },
      dataLabels: {
        enabled: false // 隱藏數據標籤
      },
      animations: {
        enabled: false // 預設禁用動畫
      }
    };
    const chart1 = new ApexCharts(document.querySelector("#chart1"), chartOptions1);
    chart1.render();

    

    // 初始化圖表2
    const chartOptions2 = {
      chart: { type: "bar", height: 400 },
      series: [],
      xaxis: { categories: [] },
      colors: ["#19396d","#354567","#a3a5a6" ,"#47587d"],// 設定條形顏色
      title: { text: "類別(物品) vs 預計受惠人數 (分類: 詳細地點)" },
      dataLabels: {
        enabled: false // 隱藏數據標籤
      },
      animations: {
        enabled: false // 預設禁用動畫
      }
    };
    const chart2 = new ApexCharts(document.querySelector("#chart2"), chartOptions2);
    chart2.render();

  // 更新圖表函數
const updateCharts = (data) => {
  // 圖表1: 詳細地點 vs 預計受惠人數
const groupedByLocation = data.reduce((acc, curr) => {
  const key = curr.詳細地點 + "|" + curr.物品類別;
  if (!acc[key]) acc[key] = 0;  // 初始為0
  acc[key] += curr.預計受惠人數;
  return acc;
}, {});

const categories1 = [];
const seriesData1 = {};

// 確保所有詳細地點都有每個物品類別
const allLocations = [...new Set(data.map(item => item.詳細地點))];  // 獲取所有詳細地點
const allCategories = [...new Set(data.map(item => item.物品類別))];  // 獲取所有物品類別

// 填補缺失的數據，確保每個地點和類別的組合都有一個0
allLocations.forEach(location => {
  allCategories.forEach(category => {
    const key = location + "|" + category;
    if (!groupedByLocation[key]) {
      groupedByLocation[key] = 0;  // 若該組合沒有數據，設為0
    }
  });
});

// 設置categories1和seriesData1
allLocations.forEach(location => {
  allCategories.forEach(category => {
    const key = location + "|" + category;
    if (!seriesData1[category]) seriesData1[category] = [];
    seriesData1[category].push(groupedByLocation[key]);  // 加入該組合的數據，若為0則為補充的數據
  });
  if (!categories1.includes(location)) categories1.push(location);
});

chart1.updateOptions({
  xaxis: { categories: categories1 },
  series: Object.keys(seriesData1).map((name) => ({
    name,
    data: seriesData1[name]
  }))
});

 // 圖表2: 類別(物品) vs 預計受惠人數
const groupedByCategory = data.reduce((acc, curr) => {
  const key = curr.物品類別 + "|" + curr.詳細地點;
  if (!acc[key]) acc[key] = 0;  // 初始為0
  acc[key] += curr.預計受惠人數;
  return acc;
}, {});

const categories2 = [];
const seriesData2 = {};

// 確保所有物品類別都有每個詳細地點
const allLocationsForChart2 = [...new Set(data.map(item => item.詳細地點))];  // 獲取所有詳細地點
const allCategoriesForChart2 = [...new Set(data.map(item => item.物品類別))];  // 獲取所有物品類別

// 填補缺失的數據，確保每個類別和地點的組合都有一個0
allCategoriesForChart2.forEach(category => {
  allLocationsForChart2.forEach(location => {
    const key = category + "|" + location;
    if (!groupedByCategory[key]) {
      groupedByCategory[key] = 0;  // 若該組合沒有數據，設為0
    }
  });
});

// 設置categories2和seriesData2
allCategoriesForChart2.forEach(category => {
  allLocationsForChart2.forEach(location => {
    const key = category + "|" + location;
    if (!seriesData2[location]) seriesData2[location] = [];
    seriesData2[location].push(groupedByCategory[key]);  // 加入該組合的數據，若為0則為補充的數據
  });
  if (!categories2.includes(category)) categories2.push(category);
});

chart2.updateOptions({
  xaxis: { categories: categories2 },
  series: Object.keys(seriesData2).map((name) => ({
    name,
    data: seriesData2[name]
  }))
});

};

// 初始更新圖表
updateCharts(rowData);
  })
  .catch((error) => {
    console.error("Error fetching Firestore data:", error);
  });
  
