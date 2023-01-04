const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');


const Router = require('./route');

const router = new Router();
router.setNotFound({toPath: '#404'});
router.addRouter({page:MainPage, toPath: '#main' }).addRouter({page:FrontPage, toPath: '#front' }).addRouter({page:BackPage, toPath: '#back' }).addRouter({page:NotFoundPage, toPath: '#404' });

router.start();




