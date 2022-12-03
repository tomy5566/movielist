# movielist 電影清單練習專案readme
movielist 電影清單

## 主要介紹
使用axios搭配Bootstrap建立經典專輯見影清單，跳出資訊訊窗的查詢網頁。

## DEMO link
[https://tomy5566.github.io/movielist/](https://tomy5566.github.io/movielist/)

## 使用技術
- HTML
- CSS: [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
- JavaScript
- AJAX : [axios](https://github.com/axios/axios)
- [Bootstrap](https://getbootstrap.com/)

## JavaScript 使用技術介紹

1. 使用 AJAX : [axios](https://github.com/axios/axios)串接兩個電影資訊的 API，取得資料。
2. 使用[Bootstrap](https://getbootstrap.com/)建立版型，包含導覽列，資訊卡片，跳出資訊視窗，RWD設計與漢堡選單。
3. 建立動態電影陣列，並利用 [Element.innerHTML](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/innerHTML) 渲染卡片清單。
4. 利用 [includes](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)方法比對字串，與陣列的 [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法篩選條件，應用於搜尋功能中。
5. 利用 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)保存篩選後的資料，將資料使用在其他同網域下的分頁。
6. 建立分頁選單[paginator](https://getbootstrap.com/docs/4.0/components/pagination/)，可自動態動產生分頁，利於瀏覽。
 

## 功能介紹
- 主要內容顯示全部電影的清單，並有分頁設計。
- 具有RWD響應式設計，導覽列在手機上會縮成漢堡選單。
- 點選More 按鈕會有彈出視窗，可以看到電影的更多資訊。
- 點選+ 按鈕 可以加入最愛蒐藏電影。並於另外分頁中顯示。
- 可利用上方搜尋功能，搜尋電影資訊，方便瀏覽訊息。
- 下方有分頁選單，每頁顯示12部電影，便於瀏覽的便利性。

## 介面展示
PC
![image](https://github.com/tomy5566/movielist/blob/main/movie_demo_01.JPG)
RWD
![image](https://github.com/tomy5566/movielist/blob/main/movie_demo_02.JPG)


## 參考資料
六角學院JavaScrip線上課程
ALPHA Camp 網路資源
