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