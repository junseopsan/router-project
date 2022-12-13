(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main' },
  { page: FrontPage, toPath: '#front' },
  { page: BackPage, toPath: '#back' },
  { page: NotFoundPage, toPath: '#404' },
];

const router = new Router({ hashRouterPages });
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
    <button id="mainBtn">Main</button>
    </div>`;
  }
}

module.exports = MainPage;
},{}],3:[function(require,module,exports){
class BackPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#frontBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#front');
    });
  }

  render() {
    return `<div><button id="frontBtn">Front</button></div>`;
  }
}

module.exports = BackPage;
},{}],4:[function(require,module,exports){
class FrontPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#back');
    });
  }

  render() {
    return `<div><button id="backBtn">Back</button></div>`;
  }
}

module.exports = FrontPage;
},{}],5:[function(require,module,exports){
class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const frontBtn = document.querySelector('#frontBtn')
    frontBtn.addEventListener('click', () => {
      this.router.push('#front');
    });
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.push('#back');
    });
    const notFoundBtn = document.querySelector('#notFoundBtn')
    notFoundBtn.addEventListener('click', () => {
      this.router.push('#notFound');
    });
  }

  render() {
    return `<div><button id="frontBtn">Front</button></div><div><button id="backBtn">Back</button></div><div><button id="notFoundBtn">NotFound</button></div>`;
  }
}

module.exports = MainPage;
},{}],6:[function(require,module,exports){
class Router {
  constructor({ hashRouterPages }) {
    this.app = document.getElementById('app');
      this.checkRoutes(hashRouterPages);
    }
    
    /**
     * 지정된 이름으로 이동하는 함수.
     * @param {string} pageName 
     */
    push(pageName){
      this.app.innerHTML = '';
      
      window.location.hash = pageName;

      this.app.innerHTML += this.currentPage.render();
      this.currentPage.mounted();
    }

    /**
     * 추가 된 라우트를 확인하고 이동하는 함수.
     * 라우터 등록되지 않은 페이지로 이동했을때 404 페이지로 이동.
     * * @param {object} hashRouterPages 
     */
    checkRoutes(hashRouterPages){
      window.onhashchange = () => {
        const findPage = hashRouterPages.find((page) => page.toPath === window.location.hash);
        this.setNotFound(findPage);
        this.addRoute(findPage);
      };
    }
    
    /**
     * 모든 라우터에서 선택한 페이지를 추가하는 함수
     * @param {string} findPage 
     */
    addRoute(findPage){
        if(findPage){
          const ViewPage = findPage.page;
  
          this.currentPage = new ViewPage({ router: this });
  
          this.push(findPage.toPath);
        }
    }
    /**
     * 404 페이지로 이동하는 함수
     * @param {string} findPage 
     */
    setNotFound(findPage){
      if(!findPage){
        window.location.hash = '#404' 
        return;
      }
    }

    /**
     * to do : action item
     * 버튼 태그로 동작할수 있게 한다: 완료
     * 쿼리 파라미터 파싱할 수 있게.. 
     * 메서드 기능 분리 : 완료
     * 포트폴리오 1차 리뷰
     */
  }
  
  module.exports = Router;
},{}]},{},[1]);
