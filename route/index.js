class Router {
  constructor({ hashRouterPages }) {
    this.app = document.getElementById('app');
    this.hash = null;
    this.query = null;
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
      this.query ? this.query = '?'+this.query.toString() : this.query = ''

      window.location.hash = this.checkUrl(pageName+this.query);
      
      this.app.innerHTML += this.currentPage.render();
    }
    /**
     * URL 에 쿼리스트링이 있을시 set 한다.
     */
    setQueryString(){
      const queryStringIndex = window.location.hash.indexOf('?')
      if(queryStringIndex > 0){
        this.hash = window.location.hash.slice(0, queryStringIndex);
        const queryStringUrl = window.location.hash.slice(queryStringIndex);
        this.query = new URLSearchParams(queryStringUrl);
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
        this.addRoute(this.hashRouterPages);
        this.push(this.hash);
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