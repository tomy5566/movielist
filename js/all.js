//1. API卡片用 https://getbootstrap.com/docs/4.0/components/navs/
// https://github.com/ALPHACamp/movie-list-api#readme

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const allmovies = [];

axios
  .get(INDEX_URL) // 修改這裡
  .then((response) => {
    // console.log(response)
    // console.log(response.data)
    // console.log(response.data.results)
    for (const movie of response.data.results) {
      allmovies.push(movie)
    }
    console.log(allmovies) 
    //輸出全部電影
    // renderMovieList(allmovies);
    //更改成分頁設計 每次輸出一點(12個)
    renderMovieList(getMoviesByPage(1));
    //計算有幾頁
    renderPaginator(allmovies.length);
    
  })
  .catch((err) => console.log(err))


  //注意: 如果直接 allmovies.push(response.data.results)，那 allmovies 會變成一個只有 1 個元素的陣列
  //因此需要用迭代器像 for-of 來整理，把 response.data.results 陣列中的元素一個個拿出來，再推進 allmovies 裡

  //方法一 for
  // for (const movie of response.data.results) {
  //     allmovies.push(movie)
  //   }
  //方法二 ES6 展開運算子(三個點+陣列)
  // allmovies.push(...response.data.results)
  // console.log(allmovies)

  // 以上 說明後，寫回axios中


//2. 渲染卡片
//寫完 renderMovieList 之後，要調用函式。要在 axios 程式碼中的 then() 中呼叫它，並把 allmovies 傳進去：

function renderMovieList(data) {
  let str = ''
  data.forEach((item) => {
    // title, image  //注意card-footer 有增加 data-id="${item.id}"
    //For each 中 item 就是陣列data 裡面的每一個元素。https://ithelp.ithome.com.tw/articles/10228571
    str += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${
          POSTER_URL + item.image
        }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer"> 
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-add-favorite" data-id="${item.id}">❤</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = str;
}


const dataPanel = document.querySelector('#data-panel')

// 監聽 data panel ，設置彈出視窗的MORE的委派點擊事件
dataPanel.addEventListener('click',function onPanelClicked(e){
  if (e.target.matches('.btn-show-movie')) {
    // console.log(e.target)
    // console.log(e)
    // console.log(e.target.dataset.id)
    showMovieModal(Number(e.target.dataset.id)) ;
   } else  if (e.target.matches('.btn-add-favorite')) {
    // console.log(e.target)
    // console.log(e)
    // console.log(e.target.dataset.id)
    addToFavorite(Number(e.target.dataset.id));
    }
})


//3. 跳出MOADAL盒子用的API https://github.com/ALPHACamp/movie-list-api#readme

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id)
        .then((response) => {
            const data = response.data.results
            modalTitle.innerText = data.title
            modalDate.innerText = 'Release date: ' + data.release_date
            modalDescription.innerText = data.description
            modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
          })
}


//4.設定搜尋列的監聽器

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
//監聽表單提交事件
//注意因為是使用"submit"會自動更新傳送，qq會一閃而過，所以要使用e.preventDefault()去排除預設狀況
let filteredMovies = []; 
searchForm.addEventListener('submit', function onSearchFormSubmitted(e)  {
    e.preventDefault()
    // console.log('qq') ;

    //抓輸入值，並且用trim()把字串的頭尾空格去掉。再轉小寫。    
    const keyword = searchInput.value.trim().toLowerCase();
    //  if (!keyword.length) {
    //   return alert('請輸入有效內容！')
    // }

    //filter 篩選
    filteredMovies = [];
    for (const movie of allmovies) {
      if (movie.title.toLowerCase().includes(keyword)) {
      filteredMovies.push(movie)
        }
    }
    // console.log(filteredMovies);
    // 方法二 :上面 條件篩選 也可以改寫成以下這方法
    // filteredMovies = allmovies.filter((movie) =>
    // movie.title.toLowerCase().includes(keyword)


    //無符合條件結果時的狀態 (代表過濾抓到的 filteredMovies = [] 是空的)
    if (filteredMovies.length === 0) {
      return alert(`沒有符合 您輸入的關鍵字：${keyword} 條件的電影`)
    }

    //重製分頁器
    renderPaginator(filteredMovies.length) 
    //重新渲染 預設顯示第 1 頁的搜尋結果
    // renderMovieList(filteredMovies);
    renderMovieList(getMoviesByPage(1));    

  })

//用 includes 查詢某一字串中是否包含特定字串，並會區分大小寫
// const str = 'This is a yellow dog'
//console.log(str.includes('yellow'))   // true
//console.log(str.includes('cat'))   // false


//顯示全部電影的按鈕
const showallbutton = document.querySelector('#show-all-button')
showallbutton.addEventListener('click',function showall(){
  // console.log("showall");
  renderMovieList(allmovies);
  //解決小BUG 點及分頁會清除搜尋欄位的資料
  searchInput.value = '';
  //把最下面的分頁 改成1頁
  let str=''; 
  str +=`<li class="page-item"><a class="page-link" href=" " data-page="1">1</a></li>`
  paginator.innerHTML = str;
})


//5.處理 增加我的最愛 的 電影
const addfavoritebtn = document.querySelector(".btn-add-favorite"); 

//加入最愛(運用 localStora)
function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  //相較於filter 方法在陣列做篩選會找全部，find在找到第一個符合條件的 item 後就回停下來回傳該 item值。
  const lovemovie = allmovies.find(function(allmovies) {return allmovies.id === id} )
  // console.log("69:"+lovemovie.title);
  //  console.log(lovemovie);
  // 使用some處理已經選擇過的
  if (list.some(function(allmovies) {return allmovies.id === id})) {
    return alert('此電影已經在收藏清單中了！')
  }
  list.push(lovemovie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}


//6. 重要新技巧: 分頁設定pagination，切出要的部分資料

const MOVIES_PER_PAGE = 12 
function getMoviesByPage(page) {
  //利用三元運算子判斷，是要用allmovies還是搜尋後的值filteredMovies
  const data = filteredMovies.length ? filteredMovies : allmovies
  //計算起始 index，第一頁0開始(0-11)，第二頁12開始(12-23)，依此類推
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  //回傳切割後的新陣列，注意第二個參數  index 並不會包含在新陣列中
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
} 


//6.1 計算有幾個分頁的頁碼，再重新渲染到頁面下方 
const paginator = document.querySelector("#paginator"); 
function renderPaginator(amount) {
  //計算總頁數，利用Math.ceil()的小數點無條件進位 功能 
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  //製作 頁數碼 template 
  let str = '';
  for (let page = 1; page <= numberOfPages; page++) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
   }
  //放回 HTML  
  paginator.innerHTML = str; 
}

//點擊到分頁的頁碼 a 標籤，呼叫 renderMovieList 根據指定的頁數重新渲染頁面
paginator.addEventListener('click', function onPaginatorClicked(e) {
  //如果被點擊的不是 a 標籤，結束
  if (e.target.tagName !== 'A') return  
  //透過 dataset 取得被點擊的頁數
  const page = Number(e.target.dataset.page)
  //更新畫面，注意，丟進去的是 被切過的allmovies的資料
  renderMovieList(getMoviesByPage(page))
  //解決小BUG 點擊分頁會清除搜尋欄位的資料(但搜尋時不會清掉)
  if (filteredMovies.length !== 0) {
    return ;
  }
  searchInput.value = '';
})

