function Router() {
  const app = document.getElementById('app');
  const router = {}

  let query = null
  let parameter = null
  let notFoundPage = {}
  let getHash = null
  let hashRouterPages = []
  
  /**
   * 해시 라우터를 사용할수 있도록 값을 셋팅.
   */
  router.start =() =>{
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
   * URL에서 해쉬 값을 체크 하고 저장한다.
   * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
   * URL에서 쿼리스트링 값을 체크하고 저장한다.
   * 모든 라우트에서 일치된 라우트를 확인하고 해당 페이지로 이동하는 함수.
   */
  router.checkRoutes = () => {
    window.onhashchange = () => {
      getHash = window.location.hash;
      setQueryString(getHash)
      setQueryParameter(getHash)
      const findPage = hashRouterPages.find((page) => page.toPath === getHash);
      if(findPage){
        app.textContent = '';
        const ViewPage = findPage.page;
        app.textContent += new ViewPage({ router: this }).render();
      }else{
        const NotFoundPage = hashRouterPages.find((page) => page.toPath === notFoundPage).page;
        app.textContent += new NotFoundPage({ router: this }).render();
        router.navigate(notFoundPage)
      }
    };
  }

   /**
   * 지정된 이름으로 이동하는 함수.
   * @param {string} routerLink 
   */
  router.navigate = (routerLink) => {
    router.checkRoutes(); 
    window.location.hash = checkHashUrl(routerLink);
  }

  /**
   * 라우터를 등록한다. 
   */
  router.addRouter = (item) => {
    hashRouterPages.push(item)
  }
  /**
   * 전달받은 url 에 대한 한글 디코딩을 실행한다.
   * 전달받은 값에 대한 공백 제거를 실행한다. 
   * queryString 존재 시 url 에 set.
   * parameter 존재 시 url 에 set.
   * @param {String} page 
   * @returns 
   */
  const checkHashUrl =(page) => {
    let url = page;

    if(query) url = page + query
    if(parameter) url = page + parameter

    const decodeURL = decodeURI(url).replace(/ /g, '')
    return decodeURL;
  } 

  /**
   * URL 에 쿼리스트링이 있을시 set 한다.
   */
  const setQueryString = (getRouter) => {
    query = null;
    const queryStringIndex = getRouter.indexOf('?')
    if(queryStringIndex > 0){
      getHash = getRouter.slice(0, queryStringIndex);
      const queryStringUrl = getRouter.slice(queryStringIndex);
      const url = new URLSearchParams(queryStringUrl);
      query = `?${url}`

    }
  }

  /**
   * URL 에 쿼리파라미터 있을시 set 한다.
   */
  const setQueryParameter = (getRouter) => {
    parameter = null;
    const queryParameterIndex = getRouter.indexOf('/')

    if(getRouter.includes('/')){
      getHash = getRouter.slice(0, queryParameterIndex);
      const queryParameterUrl = getRouter.slice(queryParameterIndex);
      parameter = queryParameterUrl
    }
  }
  /**
   * 404 페이지를 설정한다.
   * @param {Page} page 
   */
   router.setNotFound = (page) => {
    notFoundPage = page.toPath;
  }

  return router;
}
  
module.exports = Router;
