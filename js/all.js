// 其他同學優化:
// 預設解答: 

//1. API卡片用 https://getbootstrap.com/docs/4.0/components/navs/
// https://github.com/ALPHACamp/movie-list-api#readme

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = [];

axios
  .get(INDEX_URL) // 修改這裡
  .then((response) => {
    // console.log(response)
    // console.log(response.data)
    // console.log(response.data.results)
    for (const movie of response.data.results) {
      movies.push(movie)
    }
    // console.log(movies) 
    renderMovieList(movies);
  })
  .catch((err) => console.log(err))


  //注意: 如果直接 movies.push(response.data.results)，那 movies 會變成一個只有 1 個元素的陣列
  //因此需要用迭代器像 for-of 來整理，把 response.data.results 陣列中的元素一個個拿出來，再推進 movies 裡

  //方法一 for
  // for (const movie of response.data.results) {
  //     movies.push(movie)
  //   }

  //方法二 ES6 展開運算子(三個點+陣列)
  // movies.push(...response.data.results)
  // console.log(movies)

  // 以上 說明後，寫回axios中


  //2. 渲染卡片
  //寫完 renderMovieList 之後，要調用函式。請在 axios 程式碼中的 then() 中呼叫它，並把 movies 傳進去：

const dataPanel = document.querySelector('#data-panel')

// 監聽 data panel ，設置彈出視窗的MORE的委派點擊事件
dataPanel.addEventListener('click',function onPanelClicked(event){
  if (event.target.matches('.btn-show-movie')) {
    // console.log(event.target)
    // console.log(event)
    // console.log(event.target.dataset.id)
    showMovieModal(Number(event.target.dataset.id)) ;
   }
})



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
          <button class="btn btn-info btn-add-favorite">+</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//3. API 盒子用 https://github.com/ALPHACamp/movie-list-api#readme

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


