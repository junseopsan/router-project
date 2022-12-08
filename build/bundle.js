(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main' },
  { page: FrontPage, toPath: '#front' },
  { page: BackPage, toPath: '#back' },
];

const router = new Router({ hashRouterPages });

// 메서드는 하나의 역할을 가져야한다. 기능이 확장 되면 안된다. 
// 테스트 코드가 부정확해진다. 
// 푸쉬는 건드리면 안된다. 
// 좋은 코드가 될려면 머리속에서 탑다운으로 설계가 되어야 한다. 
// 인터페이스를 먼저 개발을 할수 있도록 한다. 

// 기능을 만들었을때 남들이 어떻게 쓰면 편할까? <- 기능 구현 안하고 인터페이스.. 
// DDD <- 인터페이스를 만들고,, 

// router.push({path:'#main', component: MainPage});
// router.setNotFound({component: NotFoundPage});
// router.push({type:'hash', path:'main', component: MainPage}).setNotFound(()=> {component: NotFoundPage}).push({path:'#back', component: BackPage});

// const hashRouter = new Router({ pages });

// window.location.hash = pageName;
// type 이 hash 일때 replace 함수를 활용하여 # 값을 제거한 뒤 path 값을 참조하여 페이지 이동을 한다. 그렇지 않을땐 바로 페이지 이동 한다. 
},{"./pages/BackPage":2,"./pages/FrontPage":3,"./pages/MainPage":4,"./route":5}],2:[function(require,module,exports){
class BackPage {
  constructor({ router }) {
    this.router = router;
  }

  render() {
    return `<span>Back</span>`;
  }
}

module.exports = BackPage;
},{}],3:[function(require,module,exports){
class FrontPage {
  constructor({ router }) {
    this.router = router;
  }

  render() {
    return `<span>Front</span>`;
  }
}

module.exports = FrontPage;
},{}],4:[function(require,module,exports){
class MainPage {
  constructor({ router }) {
    this.router = router;
  }

  mounted() {
    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', () => {
      this.router.checkRoutes('#back');
    });
  }

  render() {
    return `<div><button id="backBtn">Back</button></div>`;
  }
}

module.exports = MainPage;
},{}],5:[function(require,module,exports){
class Router {
  constructor({ hashRouterPages }) {
    this.app = document.getElementById('app');
    
    window.onhashchange = () => {
      console.log(hashRouterPages)
        this.app.innerHTML = '';
        // hashRouterPages.mounted();
        this.addRoute(hashRouterPages)
        
        this.app.innerHTML += this.currentPage.render();

        this.currentPage.mounted();
      };
    }
    
    /**
     * 추가 된 라우트를 확인하고 이동하는 함수
     */
    checkRoutes(pageName){
      console.log('checkRoutes')
      window.location.hash = pageName;
      // 여기서 Not found 를 리턴 해야한다.
    }
    
    /**
     * 라우트를 추가하는 함수
     * @param {Object {page, toPath} } hashRouterPages 
     */
    addRoute(hashRouterPages){
      const getToPage = hashRouterPages.find((page) => page.toPath === window.location.hash);
      const ViewPage = getToPage.page;
      this.currentPage = new ViewPage({ router: this });
    }
    /**
     * 404 페이지를 세팅 하는 함수
     */
    setNotFound(){

    }

    /**
     * action item
     * 버튼 태그로 동작할수 있게.. 
     * 쿼리 파라미터 파싱할 수 있게.. 
     * 메서드 기능 분리
     * 포트폴리오 1차 리뷰
     */
  }
  
  module.exports = Router;
},{}]},{},[1]);
