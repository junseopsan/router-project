function Router() {
  const app = document.getElementById('app');
  const router = {}
  let query = null;
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
     * URL 에 쿼리스트링이 있을시 set 한다.
     */
   const setQueryString= () => {
    query = null;
    const queryStringIndex = window.location.hash.indexOf('?')
    if(queryStringIndex > 0){
      hash = window.location.hash.slice(0, queryStringIndex);
      const queryStringUrl = window.location.hash.slice(queryStringIndex);
      const url = new URLSearchParams(queryStringUrl);
      this.query = '?'+url.toString();
    }
  }

  /**
   * URL에서 해쉬 값을 체크 하고 저장한다.
   * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
   * URL에서 쿼리스트링 값을 체크하고 저장한다.
   * 모든 라우트에서 일치된 라우트를 확인하고 해당 페이지로 이동하는 함수.
   */
  router.checkRoutes = (pageName) => {
      setQueryString()
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