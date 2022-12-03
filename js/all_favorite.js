//1. API卡片用 https://getbootstrap.com/docs/4.0/components/navs/
// https://github.com/ALPHACamp/movie-list-api#readme

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

//2.最重要，要改這邊，是從localStorge引入 我的最愛資料
const allmovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
console.log(allmovies);


const dataPanel = document.querySelector('#data-panel')

// 監聽 data panel ，設置彈出視窗的MORE的委派點擊事件
dataPanel.addEventListener('click',function onPanelClicked(e){
  if (e.target.matches('.btn-show-movie')) {
    // console.log(e.target)
    // console.log(e)
    // console.log(e.target.dataset.id)
    showMovieModal(Number(e.target.dataset.id)) ;
     }  else if (e.target.matches('.btn-del-favorite')) {
    removeFromFavorite(Number(e.target.dataset.id))
    }
 })

//3.移除最愛
function removeFromFavorite(id) {
  //防止 movies 是空陣列的狀況
  if (!allmovies || !allmovies.length) return 
  //透過 id 找到要刪除電影的 index
  //findIndex 只告訴我們那個項目的 index。 若沒能找到符合的項目，則會回傳 -1
  const movieIndex = allmovies.findIndex((movie) => movie.id === id)
  if(movieIndex === -1) return
  //刪除該筆電影
  allmovies.splice(movieIndex,1)
  //存回 local storage
  localStorage.setItem('favoriteMovies', JSON.stringify(allmovies))
  //更新 重新渲染頁面
  renderMovieList(allmovies)
}


//4. 渲染卡片

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image  //注意card-footer 有增加 data-id="${item.id}"
    //For each 中 item 就是陣列data 裡面的每一個元素。https://ithelp.ithome.com.tw/articles/10228571
    rawHTML += `<div class="col-sm-3">
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
          <button class="btn btn-danger btn-del-favorite" data-id="${item.id}">x</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//5. API 盒子用 https://github.com/ALPHACamp/movie-list-api#readme

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


//6.設定搜尋列的監聽器

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
//監聽表單提交事件
//注意因為是使用"submit"會自動更新傳送，qq會一閃而過，所以要使用e.preventDefault()去排除預設狀況
 searchForm.addEventListener('submit', function onSearchFormSubmitted(e)  {
    e.preventDefault()
    // console.log('qq') ;

    //抓輸入值，並且用trim()把字串的頭尾空格去掉。再轉小寫。    
    const keyword = searchInput.value.trim().toLowerCase();
    //  if (!keyword.length) {
    //   return alert('請輸入有效內容！')
    // }


    //filter 篩選

    let filteredMovies = [];

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

    renderMovieList(filteredMovies);

  })

//用 includes 查詢某一字串中是否包含特定字串，並會區分大小寫
// const str = 'This is a yellow dog'
//console.log(str.includes('yellow'))   // true
//console.log(str.includes('cat'))   // false


//顯示全部電影的按鈕
const showallbutton = document.querySelector('#show-all-button')
showallbutton.addEventListener('click',function showall(){
  console.log("showall");
  renderMovieList(allmovies);
  //解決小BUG 點及分頁會清除搜尋欄位的資料
  searchInput.value = '';
  //把最下面的分頁 改成1頁
  let str=''; 
  str +=`<li class="page-item"><a class="page-link" href=" " data-page="1">1</a></li>`
  paginator.innerHTML = str;
})




//重新渲染(要放在後面)
renderMovieList(allmovies);
