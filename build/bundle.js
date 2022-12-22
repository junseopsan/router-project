(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');


const Router = require('./route');

const router = new Router();

router.addRouter({page:NotFoundPage, toPath: '#404' });
router.addRouter({page:MainPage, toPath: '#main' });
router.addRouter({page:FrontPage, toPath: '#front' });
router.addRouter({page:BackPage, toPath: '#back' });

router.init();

// router.setNotFound({path:'#404'});

// this.router.addRoute().addRoute();
// this.router.addRoute().setNotFound({page : NotFoundPage})

// function router(){
//   const route = {} 
//   const routes = []
//   route.addRoute(path, page){
//     routes.push({path, page})
//     return route
//   }
//   route.setNotFound(page){
//     return route
//   }
//   route.start(){
//     window.addEventListener()
//   }
//   return route
// }

// const myRouter = router()
// myRouter.addRoute({path:"", page:""}).addRoute().addRoute().start()








},{"./pages/404":2,"./pages/BackPage":3,"./pages/FrontPage":4,"./pages/MainPage":5,"./route":6}],2:[function(require,module,exports){
class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#mainBtn')
    backBtn.addEventListener('click', () => {
      this.router.navigate('#main');
    });
  }

  render() {
    return `<div>
    <div>this is 404 page.</div>
    </div>`;
  }
}

module.exports = MainPage;
},{}],3:[function(require,module,exports){
class BackPage {
  constructor({ router }) {
    this.router = router;
  }

  render() {
    return `<div>Back Page</div>`;
  }
}

module.exports = BackPage;
},{}],4:[function(require,module,exports){
class FrontPage {
  constructor({ router }) {
    this.router = router;
  }

  render() {
    return `<div>Front Page</div>`;
  }
}

module.exports = FrontPage;
},{}],5:[function(require,module,exports){
class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  render() {
    return `<div>Main Page</div>`;
  }
}

module.exports = MainPage;
},{}],6:[function(require,module,exports){

function Router() {
  const app = document.getElementById('app');
  const router = {}
  let notFoundPage = {}
  let hash = {}
  let hashRouterPages = []
  
  /**
   * 등록한 라우터에 대한 이벤트를 등록한다.
   * 
   */
  router.init =() =>{
    router.setRouter();
    // router.checkRoutes(); 
  }

  /**
   * body 를 클릭하면 이벤트 버블링을 통하여 버튼에 클릭 이벤트가 할당된다.
   * @param {document} document 
   */
  router.setRouter =() => {
    document.body.addEventListener('click', (e) =>{
      e.target.addEventListener('click', (btn) =>{
        if(btn.target.matches('button[data-router-link]')){
          const getLink = btn.target.dataset.routerLink;
          router.navigate(getLink)
        }
      });
    })
  }

  /**
   * URL에서 해쉬 값을 체크 하고 저장한다.
   * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
   * URL에서 쿼리스트링 값을 체크하고 저장한다.
   * 모든 라우트에서 일치된 라우트를 확인하고 해당 페이지로 이동하는 함수.
   */
  router.checkRoutes = () => {
    window.onhashchange = () => {
      hash = window.location.hash;
      setQueryString()
      setQueryParameter()
      
      const findPage = hashRouterPages.find((page) => page.toPath === hash);

      if(findPage){
        const ViewPage = findPage.page;
        this.currentPage = new ViewPage({ router: this });
        app.innerHTML += this.currentPage.render();
      }else{
        const NotFoundPage = hashRouterPages.find((page) => page.toPath === notFoundPage).page;
        this.currentPage = new NotFoundPage({ router: this });
        navigate(this.notFoundPage)
      }
    };
  }
   
    /**
     * 전달받은 url 에 대한 한글 디코딩을 실행한다.
     * 전달받은 값에 대한 공백 제거를 실행한다. 
     * queryString 존재 시 url 에 set.
     * parameter 존재 시 url 에 set.
     * @param {String} page 
     * @returns 
     */
     const checkHashUrl =(page) => {
      let url = page;

      if(this.query) url = page + this.query
      if(this.parameter) url = page + this.parameter

      const decodeURL = decodeURI(url).replace(/ /g, '')
      return decodeURL;
    } 
    /**
     * 지정된 이름으로 이동하는 함수.
     * @param {string} pageName 
     */
     router.navigate = (pageName) => {
      app.innerHTML = '';
      window.location.hash = checkHashUrl(pageName);
    }
    /**
     * URL 에 쿼리스트링이 있을시 set 한다.
     */
    const setQueryString= () => {
      this.query = null;
      const queryStringIndex = window.location.hash.indexOf('?')
      if(queryStringIndex > 0){
        hash = window.location.hash.slice(0, queryStringIndex);
        const queryStringUrl = window.location.hash.slice(queryStringIndex);
        const url = new URLSearchParams(queryStringUrl);
        this.query = '?'+url.toString();
      }
    }
    /**
     * URL 에 쿼리파라미터 있을시 set 한다.
     */
    const setQueryParameter = () => {
      this.parameter = null;
      const queryStringIndex = window.location.hash.indexOf('/')
      if(queryStringIndex > 0){
        hash = window.location.hash.slice(0, queryStringIndex);
        const queryParameterUrl = window.location.hash.slice(queryStringIndex);
        this.parameter = queryParameterUrl
      }
    }
  
    
    /**
     * 모든 라우터에서 일치한 하나의 페이지를 추가하는 함수
     * 라우터 등록되지 않은 페이지로 이동했을때 404 페이지로 이동.
     */
    router.addRouter = (item) => {
      hashRouterPages.push(item)
    }
    /**
     * 404 페이지로 이동하는 함수
     * @param {Page} page 
     */
    router.setNotFound = (page) => {
      notFoundPage = page.path;
    }

    return router;
}
  
module.exports = Router;

},{}]},{},[1]);
