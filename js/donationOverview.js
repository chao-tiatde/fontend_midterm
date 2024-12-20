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
        sortAscending: '<i class="fas fa-arrow-up"></i>',  // 使用 FontAwesome 升序箭头
        sortDescending: '<i class="fas fa-arrow-down"></i>',  // 使用 FontAwesome 降序箭头
        filter: '<i class="fas fa-filter"></i>'  // 使用 FontAwesome 过滤器图标
      },
      },
      onGridReady: (params) => {
        params.api.sizeColumnsToFit(); // 初始化时自动调整列宽
      },
    };

    const eGridDiv = document.querySelector("#myGrid");
    new agGrid.Grid(eGridDiv, gridOptions);
  })
  .catch((error) => {
    console.error("Error fetching Firestore data: ", error);
  });
