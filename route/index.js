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