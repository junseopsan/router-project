function Router() {
  const app = document.getElementById('app');
  const router = {}

  let notFoundPage = {}
  let hash = {}
  let hashRouterPages = []
  
  /**
   * 해시 라우터를 사용할수 있도록 값을 셋팅.
   */
  router.start =() =>{
    router.setRouter();
    router.checkRoutes(); 
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
   * URL에서 해쉬 값을 체크 하고 저장한다.
   * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
   * URL에서 쿼리스트링 값을 체크하고 저장한다.
   * 모든 라우트에서 일치된 라우트를 확인하고 해당 페이지로 이동하는 함수.
   */
  router.checkRoutes = () => {
    window.onhashchange = () => {
      hash = window.location.hash;
      setQueryString()
      setQueryParameter()
      
      const findPage = hashRouterPages.find((page) => page.toPath === hash);

      if(findPage){
        const ViewPage = findPage.page;
        this.currentPage = new ViewPage({ router: this });
        app.innerHTML += this.currentPage.render();
      }else{
        const NotFoundPage = hashRouterPages.find((page) => page.toPath === notFoundPage).page;
        this.currentPage = new NotFoundPage({ router: this });
        navigate(this.notFoundPage)
      }
    };
  }

   /**
   * 지정된 이름으로 이동하는 함수.
   * @param {string} pageName 
   */
  router.navigate = (pageName) => {
    app.innerHTML = '';
    window.location.hash = checkHashUrl(pageName);
  }

  /**
   * 라우터를 등록한다. 
   */
  router.addRouter = (item) => {
    hashRouterPages.push(item)
  }

  /**
   * 404 페이지를 설정한다.
   * @param {Page} page 
   */
  router.setNotFound = (page) => {
    notFoundPage = page.path;
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

    if(this.query) url = page + this.query
    if(this.parameter) url = page + this.parameter

    const decodeURL = decodeURI(url).replace(/ /g, '')
    return decodeURL;
  } 

  /**
   * URL 에 쿼리스트링이 있을시 set 한다.
   */
  const setQueryString= () => {
    this.query = null;
    const queryStringIndex = window.location.hash.indexOf('?')
    if(queryStringIndex > 0){
      hash = window.location.hash.slice(0, queryStringIndex);
      const queryStringUrl = window.location.hash.slice(queryStringIndex);
      const url = new URLSearchParams(queryStringUrl);
      this.query = '?'+url.toString();
    }
  }

  /**
   * URL 에 쿼리파라미터 있을시 set 한다.
   */
  const setQueryParameter = () => {
    this.parameter = null;
    const queryStringIndex = window.location.hash.indexOf('/')
    if(queryStringIndex > 0){
      hash = window.location.hash.slice(0, queryStringIndex);
      const queryParameterUrl = window.location.hash.slice(queryStringIndex);
      this.parameter = queryParameterUrl
    }
  }

  return router;
}
  
module.exports = Router;
