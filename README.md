# 劃位系統 Booking 元件
## 程式碼來源 
此為應徵玩美移動時提供之片段程式碼  
擷取自[台大魔夜劃位系統 github repo](https://github.com/xieyou0608/ntumagic) 底下的 /src/components/booking 資料夾  
主要 300 行程式碼聚焦在以下檔案
```
- Booking.jsx
- Auditorium/
    - index.jsx
    - Seat.jsx
```
&nbsp;

## 技術使用
- React
- Material UI(Styled API)
- Redux Toolkit  
- React Router  
&nbsp;

## 功能展示
此元件會渲染劇場座位表，並且提供選擇座位、清除座位、劃位等功能  
![劃位範例](https://i.imgur.com/V4Ks3Kk.gif)

&nbsp;

## 程式碼說明
##### Booking.jsx 
此元件負責管理整個座位頁面的 states，再以 props 傳遞給底下元件渲染畫面細節  
只有此元件會用到的狀態 (seatsData, chosenSeats) 使用 useState 管理   
並且也包含取得座位資料的函數 (loadSeatsData)   
而需要額外資訊的功能細節不放在此元件，如訂票 (bookTickets) 實作在 redux store  

##### Auditorium/index.jsx
此元件負責整個座位圖顯示  
後端傳來的資料已照左上到右下排列，此處將座位資料分成多個列  
並且控制每列顯示高度及處理行動裝置顯示  

##### Auditorium/Seat.jsx
此元件負責單個座位顯示  
以接到的 props 區分不同顏色及功能的座位  
- BlankSpace：無色，非座位區 (走道)
- RowSign：無色藍字，為第幾列的提示
- SoldSeat：白色，已售出或特別座
- PreviewSeat：彩色，ABC 區待售座位，預覽使用，不可點選
- AvailableSeat：彩色，ABC 區待售座位，能被點選及 hover 放大
- ChosenSeat：暗紅色，用戶目前選擇座位