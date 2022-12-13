class Router {
  constructor({ hashRouterPages }) {
    this.app = document.getElementById('app');
    this.checkRoutes(hashRouterPages);
    }
    
    /**
     * 전달받은 쿼리 파라미터를 키 : 값을 가진 map 으로 반환한다.
     * @param {string} queryParameter 
     * @returns param
     */
    getParamMap(queryParameter){
      let queryParamList = queryParameter.replace("?","").split(/[=?&]/);
      let param = {};
      queryParamList.forEach((item, key)=> {
        if (key % 2 === 0) {
          param[queryParamList[key]] = queryParamList[key + 1]
        }
      });
      return param
    }
    
    /**
     * URl 에서 쿼리 파라미터 추출
     */
    getParams(){
      const queryIndex = window.location.href.indexOf('?');
      const queryParameter =  queryIndex > 0 ? window.location.href.slice(queryIndex) : '';
      return this.getParamMap(queryParameter);
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
     * 쿼리파라미터가 존재했을때 URL에 합쳐서 경로를 넘겨준다. 
     * * @param {object} hashRouterPages 
     */
    checkRoutes(hashRouterPages){
      window.onhashchange = () => {
        const queryStringIndex = window.location.hash.indexOf('?')
        
        const locationHash = queryStringIndex > 0 ? window.location.hash.slice(0, queryStringIndex) : window.location.hash;
        const queryStringUrl = queryStringIndex > 0 ? window.location.hash.slice(queryStringIndex) : ''

        const findPage = hashRouterPages.find((page) => page.toPath === locationHash);

        this.setNotFound(findPage);
        this.addRoute(findPage, queryStringUrl);
      };
    }
    
    /**
     * 모든 라우터에서 선택한 페이지를 추가하는 함수
     * @param {string} findPage 
     * @param {string} queryStringUrl 
     */
    addRoute(findPage, queryStringUrl){
        if(findPage){
          const ViewPage = findPage.page;
          this.currentPage = new ViewPage({ router: this });
          this.push(findPage.toPath+queryStringUrl);
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
     * 쿼리 파라미터 파싱할 수 있게 한다 : 완료
     * 메서드 기능 분리 : 완료
     * 포트폴리오 1차 리뷰
     */
  }
  
  module.exports = Router;