const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main', isAuth: true },
  { page: FrontPage, toPath: '#front', isAuth: true },
  { page: BackPage, toPath: '#back', isAuth: true },
  { page: NotFoundPage, toPath: '#404', isAuth: false },
];

const router = new Router({hashRouterPages});

router.setNotFound({path:'#404'});
router.checkRoutes();

// this.router.addRoute().addRoute();
// this.router.addRoute().setNotFound({page : NotFoundPage})

// function router(){
//   const route = {} 


//   const routes = []

//   route.addRoute(path, page){
//     routes.push({path, page})
    
//     return route
//   }

//   route.setNotFound(page){

//     return route
//   }

//   route.start(){
//     window.addEventListener()
//   }

//   return route
// }


// const myRouter = router()

// myRouter.addRoute({path:"", page:""}).addRoute().addRoute().start()







