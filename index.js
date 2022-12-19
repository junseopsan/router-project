const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const historyRouterPages = [
  { page: MainPage, toPath: '/main' },
  { page: FrontPage, toPath: '/front'},
  { page: BackPage, toPath: '/back'},
  { page: NotFoundPage, toPath: '/404'},
];

const definedRoutes = Array.from(document.querySelectorAll('[data-router-link]'));
const router = new Router({historyRouterPages, definedRoutes});

// router.setNotFound({path:'/404'});
router.init();
router.setClickEventToRouterBtn();








