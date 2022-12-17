(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main', isAuth: true },
  { page: FrontPage, toPath: '#front', isAuth: true },
  { page: BackPage, toPath: '#back', isAuth: true },
  { page: NotFoundPage, toPath: '#404', isAuth: false },
];

const router = new Router({hashRouterPages});

router.setNotFound({path:'#404'});
router.checkRoutes();

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

  // mounted() {
  //   const frontBtn = document.querySelector('#frontBtn')
  //   frontBtn.addEventListener('click', () => {
  //     this.router.push('#front?sch_keyword=한  글&type=1');
  //   });
  // }

  render() {
    return `<div>Main Page</div>`;
  }
}

module.exports = MainPage;
},{}],6:[function(require,module,exports){
class Router {
  constructor({ hashRouterPages }) {
    this.app = document.getElementById('app');
    this.hash = null;
    this.hashRouterPages = hashRouterPages;
  }
    // todo : 쿼리 스트링이 아닌 파라미터
    // 3차 스펙 : 히스토리 라우터 과제가 있다. 그 사이에 해시라우터 미흡했던 부분 같이. 
    // 라우터는 히스토리가 더 어렵다. 
    // 버튼 attr 사용해서 버튼에서 네비게이트 될수 있게 한다.

    // done : trim, 한글 인코딩, 

    checkUrl(url) {
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
      
      this.app.innerHTML += this.currentPage.render();
      
  
      // this.currentPage.mounted();
    }

    /**
     * 추가 된 라우트를 확인하고 이동하는 함수.
     * 라우터 등록되지 않은 페이지로 이동했을때 404 페이지로 이동.
     * URL에서 해쉬 값을 체크 하고 저장한다.
     * URL에서 쿼리스트링 값을 체크하고 저장한다.
     * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
     * * @param {object} hashRouterPages 
     */
    checkRoutes(){
      window.onhashchange = () => {
        const queryStringIndex = window.location.hash.indexOf('?')
        
        this.hash = queryStringIndex > 0 ? window.location.hash.slice(0, queryStringIndex) : window.location.hash;
        this.query = queryStringIndex > 0 ? window.location.hash.slice(queryStringIndex) : ''

        console.log(this.hash)
        console.log(this.query)
        
        this.addRoute(this.hashRouterPages);
        this.push(this.hash+this.query);
      };
    }
    
    /**
     * 모든 라우터에서 일치한 하나의 페이지를 추가하는 함수
     * @param {string} findPage 
     * @param {string} queryStringUrl 
     */
    addRoute(hashRouterPages){
      const findPage = hashRouterPages.find((page) => page.toPath === this.hash);
      if(findPage){
        const ViewPage = findPage.page;
        this.currentPage = new ViewPage({ router: this });
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
