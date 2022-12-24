(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const router = new Router();

router.addRouter({page:NotFoundPage, toPath: '/404' });
router.addRouter({page:MainPage, toPath: '/main' });
router.addRouter({page:FrontPage, toPath: '/front' });
router.addRouter({page:BackPage, toPath: '/back' });

router.start();
router.setNotFound({page:NotFoundPage, toPath: '/404' });









},{"./pages/404":2,"./pages/BackPage":3,"./pages/FrontPage":4,"./pages/MainPage":5,"./route":6}],2:[function(require,module,exports){
class MainPage {
  constructor({ router }) {
    this.router = router;
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

  let pageName = new URL(window.location.href).pathname;
  let notFoundPage = {}
  let historyRouterPages = []

  /**
   * 해시 라우터를 사용할수 있도록 값을 셋팅.
   */
  router.start =() =>{
    router.init();
    router.setRouter();
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
  router.checkRoutes = (pageName) => {
      // setQueryString()
      // setQueryParameter()
      const findPage = historyRouterPages.find(page => page.toPath === pageName);
      let currentPage = ''
      if(findPage){
        const ViewPage = findPage.page;
        currentPage = new ViewPage({ router: this });
        // app.innerHTML += pageName
        app.innerHTML += currentPage.render();
      }else{
        const NotFoundPage = historyRouterPages.find((page) => page.toPath === notFoundPage).page;
        currentPage = new NotFoundPage({ router: this });
        router.navigate(notFoundPage)
      }
  }

  /**
   * 지정된 이름으로 이동하는 함수.
   */
  router.navigate = (pageName) => {
    app.innerHTML = '';
    pageName = pageName
    router.checkRoutes(pageName)
    history.pushState({}, '', pageName);
  }
  
  /**
   * 라우터를 등록한다. 
   */
   router.addRouter = (item) => {
    historyRouterPages.push(item)
  }

  /**
   * 최초의 URL 을 /root 로 설정한다.
   */
   router.init= () => {
    history.replaceState({},'','/root');
  }

  /**
   * 브라우저에서 뒤로가기 함수로 했을때 넘어갈수 있도록.
   */
  // back(){

  // }

  /**
   * 404 페이지로 이동하는 함수
   * @param {Page} page 
   */
  router.setNotFound = (page) => {
    notFoundPage = page.toPath;
  }

  return router;
}
  
module.exports = Router;
},{}]},{},[1]);
