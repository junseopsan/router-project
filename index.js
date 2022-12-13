const MainPage = require('./pages/MainPage');
const FrontPage = require('./pages/FrontPage');
const BackPage = require('./pages/BackPage');
const NotFoundPage = require('./pages/404');
const Router = require('./route');

const hashRouterPages = [
  { page: MainPage, toPath: '#main' },
  { page: FrontPage, toPath: '#front' },
  { page: BackPage, toPath: '#back' },
  { page: NotFoundPage, toPath: '#404' },
];

const router = new Router({ hashRouterPages });