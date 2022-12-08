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