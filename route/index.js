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