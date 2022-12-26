const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');


const Router = require('./route');

const router = new Router();
router.setNotFound({toPath: '#404'});
router.addRouter({page:NotFoundPage, toPath: '#404' });
router.addRouter({page:MainPage, toPath: '#main' });
router.addRouter({page:FrontPage, toPath: '#front' });
router.addRouter({page:BackPage, toPath: '#back' });

router.start();




