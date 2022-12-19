(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const historyRouterPages = [
  { page: MainPage, toPath: '/main' },
  { page: FrontPage, toPath: '/front'},
  { page: BackPage, toPath: '/back'},
  { page: NotFoundPage, toPath: '/404'},
];

const definedRoutes = Array.from(document.querySelectorAll('[data-router-link]'));
const router = new Router({historyRouterPages, definedRoutes});

// router.setNotFound({path:'/404'});
router.init();
router.setClickEventToRouterBtn();









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
    router.render();
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
    router.render();
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
    router.render();
  }

  render() {
    return `<div>Main Page</div>`;
  }
}

module.exports = MainPage;
},{}],6:[function(require,module,exports){
class Router {
  constructor({ historyRouterPages, definedRoutes }) {
    this.app = document.getElementById('app');
    this.pathname = new URL(window.location.href).pathname;
    this.historyRouterPages = historyRouterPages;
    this.definedRoutes = definedRoutes;
  }
  /**
   * data-router-link 를 가진 엘리먼트에 클릭 이벤트(push)를 부여한다. 
   */
  setClickEventToRouterBtn(){
    this.definedRoutes.forEach((router) => {
      router.addEventListener('click', () =>{
        const link = router.dataset.routerLink;
        this.push(link)
      });
    });
  }

  /**
   * 지정된 이름으로 이동하는 함수.
   * @param {string} pageName 
   */
  push(pageName){
    this.app.innerHTML = '';
    this.pageName = pageName
    this.setRoute(pageName);
    
    history.pushState({}, '', pageName);
  }

  /**
   *  화면을 보여준다.
   */
  render() {
    this.app.innerHTML += this.pageName
  }

  /**
   * 최초의 URL 을 /root 로 설정한다.
   */
  init(){
    history.replaceState({},'','/root');
  }
    
  /**
   * 모든 라우터에서 일치한 하나의 페이지를 추가하는 함수
   * 라우터 등록되지 않은 페이지로 이동했을때 404 페이지로 이동.
   */
   setRoute(pageName){
    const findPage = this.historyRouterPages.find(page => page.toPath === pageName);
    if(findPage){
      const ViewPage = findPage.page;
      this.currentPage = new ViewPage({ router: this });
    }
  }
  
  /**
   * 뒤로가기
   */
  back(){

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
