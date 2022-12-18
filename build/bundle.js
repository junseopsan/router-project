(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main' },
  { page: FrontPage, toPath: '#front'},
  { page: BackPage, toPath: '#back'},
  { page: NotFoundPage, toPath: '#404'},
];

const definedRoutes = Array.from(document.querySelectorAll('[data-router-link]'));
const router = new Router({hashRouterPages, definedRoutes});

router.setNotFound({path:'#404'});
router.checkRoutes();
router.setRouter();

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
      this.router.push('#main');
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
class Router {
  constructor({ hashRouterPages, definedRoutes }) {
    this.app = document.getElementById('app');
    this.hash = null;
    this.query = null;
    this.parameter = null;
    this.hashRouterPages = hashRouterPages;
    this.definedRoutes = definedRoutes;

  }
    // todo : 쿼리 스트링이 아닌 파라미터
    // 3차 스펙 : 히스토리 라우터 과제가 있다. 그 사이에 해시라우터 미흡했던 부분 같이. 
    // 라우터는 히스토리가 더 어렵다. 
    // done : trim, 한글 인코딩, 버튼 attr 사용해서 버튼에서 네비게이트 될수 있게 한다.

    setRouter(){
      this.definedRoutes.forEach((router) => {
        router.addEventListener('click', () =>{
          const link = router.dataset.routerLink;
          this.push(link)
        });
      });
    }
    /**
     * 전달받은 url 에 대한 한글 디코딩을 실행한다.
     * 전달받은 값에 대한 공백 제거를 실행한다. 
     * queryString 존재 시 url 에 set.
     * parameter 존재 시 url 에 set.
     * @param {String} page 
     * @returns 
     */
    checkUrl(page) {
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
    push(pageName){
      this.app.innerHTML = '';
      window.location.hash = this.checkUrl(pageName);
      console.log('pushhh')
    }
    /**
     * URL 에 쿼리스트링이 있을시 set 한다.
     */
    setQueryString(){
      this.query = null;
      const queryStringIndex = window.location.hash.indexOf('?')
      if(queryStringIndex > 0){
        this.hash = window.location.hash.slice(0, queryStringIndex);
        const queryStringUrl = window.location.hash.slice(queryStringIndex);
        const url = new URLSearchParams(queryStringUrl);
        this.query = '?'+url.toString();
      }
    }
    /**
     * URL 에 쿼리파라미터 있을시 set 한다.
     */
    setQueryParameter(){
      this.parameter = null;
      const queryStringIndex = window.location.hash.indexOf('/')
      if(queryStringIndex > 0){
        this.hash = window.location.hash.slice(0, queryStringIndex);
        const queryParameterUrl = window.location.hash.slice(queryStringIndex);
        this.parameter = queryParameterUrl
      }
    }
    /**
     * URL에서 해쉬 값을 체크 하고 저장한다.
     * 추가 된 라우트를 확인하고 이동하는 함수.
     * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
     * URL에서 쿼리스트링 값을 체크하고 저장한다.
     * * @param {object} hashRouterPages 
     */
    checkRoutes(){
      window.onhashchange = () => {
        this.hash = window.location.hash;
        this.setQueryString()
        this.setQueryParameter()
        this.addRoute(this.hashRouterPages);
      };
    }
    
    /**
     * 모든 라우터에서 일치한 하나의 페이지를 추가하는 함수
     * 라우터 등록되지 않은 페이지로 이동했을때 404 페이지로 이동.
     * @param {Page} hashRouterPages 
     */
    addRoute(hashRouterPages){
      const findPage = hashRouterPages.find((page) => page.toPath === this.hash);
      if(findPage){
        const ViewPage = findPage.page;
        this.currentPage = new ViewPage({ router: this });
        this.app.innerHTML += this.currentPage.render();
      }else{
        const NotFoundPage = hashRouterPages.find((page) => page.toPath === this.notFoundPage).page;
        this.currentPage = new NotFoundPage({ router: this });
        this.push(this.notFoundPage)
      }
    }
    /**
     * 404 페이지로 이동하는 함수
     * @param {Page} page 
     */
    setNotFound(page){
      this.notFoundPage = page.path;
    }
}
  
module.exports = Router;
},{}]},{},[1]);
