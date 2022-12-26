function Router() {
    const app = document.getElementById('app');
    const router = {}
    let query = null;
    let pageName = new URL(window.location.href).pathname;
    console.log('pageName :: ', pageName)
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
            const routerLink = btn.target.dataset.routerLink;
            router.navigate(routerLink)
          }
        });
      })
    }
  
    /**
       * URL 에 쿼리스트링이 있을시 set 한다.
       */
     const setQueryString= (routerLink) => {
      query = null;
      const queryStringIndex = routerLink.indexOf('?')
      if(queryStringIndex > 0){
        pageName = routerLink.slice(0, queryStringIndex);
  
        const queryStringUrl = routerLink.slice(queryStringIndex);
        const url = new URLSearchParams(queryStringUrl);
        query = `?${url}`
      }
    }
  
    /**
     * URL 에 쿼리파라미터 있을시 set 한다.
     */
     const setQueryParameter = (routerLink) => {
      parameter = null;
      if(routerLink.indexOf('/', 1) !== -1){
        const queryParameterIndex = routerLink.indexOf('/', 1)
        debugger
        pageName = routerLink.slice(0, queryParameterIndex);
        const queryParameterUrl = routerLink.slice(queryParameterIndex);
        parameter = queryParameterUrl
      }
    }
  
    /**
     * URL에서 해쉬 값을 체크 하고 저장한다.
     * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
     * URL에서 쿼리스트링 값을 체크하고 저장한다.
     * 모든 라우트에서 일치된 라우트를 확인하고 해당 페이지로 이동하는 함수.
     */
    router.checkRoutes = (routerLink) => {
        // 현재 페이지와 동일했을때 navigate 하지 않는다. 
        if(routerLink.includes(pageName)) return false;
        
        pageName = routerLink
        setQueryString(routerLink)
        setQueryParameter(routerLink)
        
        const findPage = historyRouterPages.find(page => page.toPath === pageName);
  
        if(findPage){
          app.textContent = '';
          const ViewPage = findPage.page;
          app.textContent += new ViewPage({ router: this }).render();
        }else{
          router.navigate(notFoundPage)
        }
    }
  
    /**
     * 지정된 이름으로 이동하는 함수.
     */
    router.navigate = (routerLink) => {
      router.checkRoutes(routerLink)
      history.pushState({}, '', routerLink);
      return;
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