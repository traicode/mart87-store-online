var PREFIX_ADMIN = '/dashboard';
var PREFIX_ACCOUNT = '/account';
module.exports.routes = {

 
  /**
   * PAGE FRONT-END
   */
  '/': 'PagesController.index',

  '/category/:id': 'PagesController.category',

  '/checkout': {
    view: 'pages/checkout'
  },
  '/shopping': {
    view: 'pages/shopping'
  },
  '/category': {
    view: 'pages/category'
  },
/**
* CHECKOUT
*/
'POST /checkout/submitOrder': 'CheckoutController.submitOrder',



/**
 * OTHER PAGE
 */
  '/frequently-asked-questions': {
    view: 'pages/other/faq'
  },
  '/about': {
    view: 'pages/other/about'
  },
  '/delivery': {
    view: 'pages/other/delivery'
  },
  '/terms-and-conditions': {
    view: 'pages/other/terms-conditions'
  },
  /**
   * ACCOUNT
   */
  ['GET ' + PREFIX_ACCOUNT ]: 'AccountController.account',
  ['GET ' + PREFIX_ACCOUNT + '/edit-account' ]: 'AccountController.editAccount',
  ['POST ' + PREFIX_ACCOUNT + '/update' ]: 'AccountController.updateAccount',
  ['GET ' + PREFIX_ACCOUNT + '/address' ]: 'AccountController.address',
  ['GET ' + PREFIX_ACCOUNT + '/change-password' ]: 'AccountController.changePassword',
  ['GET ' + PREFIX_ACCOUNT + '/download' ]: 'AccountController.download',
  ['GET ' + PREFIX_ACCOUNT + '/edit-address' ]: 'AccountController.editAddress',
  ['GET ' + PREFIX_ACCOUNT + '/forgotten' ]: 'AccountController.forgotton',
  ['GET ' + PREFIX_ACCOUNT + '/new-address' ]: 'AccountController.newAddress',
  ['GET ' + PREFIX_ACCOUNT + '/order' ]: 'AccountController.order',
  ['GET ' + PREFIX_ACCOUNT + '/recurring' ]: 'AccountController.recurring',
  ['GET ' + PREFIX_ACCOUNT + '/return' ]: 'AccountController.return',
  ['GET ' + PREFIX_ACCOUNT + '/reward' ]: 'AccountController.reward',
  ['GET ' + PREFIX_ACCOUNT + '/transaction' ]: 'AccountController.transaction',
  ['GET ' + PREFIX_ACCOUNT + '/wishlist' ]: 'AccountController.wishlist',
  ['GET ' + PREFIX_ACCOUNT + '/newsletter' ]: 'AccountController.newSletter',
  ['POST ' + PREFIX_ACCOUNT + '/newsletter/update' ]: 'AccountController.updateSubscription',
   /**
   * AUTH USER
   */
  'get /login': 'AuthController.loginView',
  'post /login': 'AuthController.login',
  'get /register': 'AuthController.registerView',
  'post /register': 'AuthController.register',
  '/logout': 'AuthController.logout',

  /**
   * DASHBOARD ADMIN
   */
  ['GET ' + PREFIX_ADMIN + '/index']: 'dashboard/IndexController.index',
  //CATEGORY
  ['GET ' + PREFIX_ADMIN + '/category']: 'dashboard/CategoryController.index',
  ['GET ' + PREFIX_ADMIN + '/category/new']: 'dashboard/CategoryController.new',
  ['GET ' + PREFIX_ADMIN + '/category/edit/:id']: 'dashboard/CategoryController.edit',
  ['POST ' + PREFIX_ADMIN + '/category']: 'dashboard/CategoryController.create',
  ['POST ' + PREFIX_ADMIN + '/category/update/:id']: 'dashboard/CategoryController.update',
  ['POST ' + PREFIX_ADMIN + '/category/delete/:id']: 'dashboard/CategoryController.delete',
  //PRODUCT
  ['GET ' + PREFIX_ADMIN + '/product']: 'dashboard/ProductController.index',
  ['GET ' + PREFIX_ADMIN + '/product/new']: 'dashboard/ProductController.new',
  ['GET ' + PREFIX_ADMIN + '/product/edit/:id']: 'dashboard/ProductController.edit',
  ['POST ' + PREFIX_ADMIN + '/product']: 'dashboard/ProductController.create',
  ['POST ' + PREFIX_ADMIN + '/product/update/:id']: 'dashboard/ProductController.update',
  ['POST ' + PREFIX_ADMIN + '/product/delete/:id']: 'dashboard/ProductController.delete',
  //PARTNER
  ['GET ' + PREFIX_ADMIN + '/partner']: 'dashboard/PartnerController.index',
  ['GET ' + PREFIX_ADMIN + '/partner/new']: 'dashboard/PartnerController.new',
  ['GET ' + PREFIX_ADMIN + '/partner/edit/:id']: 'dashboard/PartnerController.edit',
  ['POST ' + PREFIX_ADMIN + '/partner']: 'dashboard/PartnerController.create',
  ['POST ' + PREFIX_ADMIN + '/partner/update/:id']: 'dashboard/PartnerController.update',
  ['POST ' + PREFIX_ADMIN + '/partner/delete/:id']: 'dashboard/PartnerController.delete',
  //SLIDE
  ['GET ' + PREFIX_ADMIN + '/slide']: 'dashboard/SlideController.index',
  ['GET ' + PREFIX_ADMIN + '/slide/new']: 'dashboard/SlideController.new',
  ['GET ' + PREFIX_ADMIN + '/slide/edit/:id']: 'dashboard/SlideController.edit',
  ['POST ' + PREFIX_ADMIN + '/slide']: 'dashboard/SlideController.create',
  ['POST ' + PREFIX_ADMIN + '/slide/update/:id']: 'dashboard/SlideController.update',
  ['POST ' + PREFIX_ADMIN + '/slide/delete/:id']: 'dashboard/SlideController.delete',
  //USER
  ['GET ' + PREFIX_ADMIN + '/user']: 'dashboard/UserController.index',
  ['GET ' + PREFIX_ADMIN + '/user/new']: 'dashboard/UserController.new',
  ['GET ' + PREFIX_ADMIN + '/user/edit/:id']: 'dashboard/UserController.edit',
  ['POST ' + PREFIX_ADMIN + '/user']: 'dashboard/UserController.create',
  ['POST ' + PREFIX_ADMIN + '/user/update/:id']: 'dashboard/UserController.update',
  ['POST ' + PREFIX_ADMIN + '/user/delete/:id']: 'dashboard/UserController.delete',
  //ORDER
  ['GET ' + PREFIX_ADMIN + '/order']: 'dashboard/OrderController.index',
  ['GET ' + PREFIX_ADMIN + '/order/new']: 'dashboard/OrderController.new',
  ['GET ' + PREFIX_ADMIN + '/edit/:id']: 'dashboard/OrderController.edit',
  ['POST ' + PREFIX_ADMIN + '/order']: 'dashboard/OrderController.create',
  ['POST ' + PREFIX_ADMIN + '/order/update/:id']: 'dashboard/OrderController.update',
  ['POST ' + PREFIX_ADMIN + '/order/delete/:id']: 'dashboard/OrderController.delete',
  //ORDER DETAIL
  ['GET ' + PREFIX_ADMIN + '/orderdetail/:id']: 'dashboard/OrderDetailController.index',

  //API
  'GET /api/slides': 'ApiController.getSlides',
  'GET /api/categories': 'ApiController.getCategories',
  'GET /api/partners': 'ApiController.getPartners',
  'GET /api/products/category/:id': 'ApiController.getProductsByCategory',
  'GET /api/products/new': 'ApiController.getNewProducts',
  'GET /api/products/recommend': 'ApiController.getRecommendProducts',
  'GET /api/products/popular': 'ApiController.getPopularProducts',
  'GET /api/product/name': 'ApiController.getProductName',
  'GET /api/category/name': 'ApiController.getCategoryName',
  'GET /api/products': 'ApiController.getProducts',
  'GET /api/products/top':'ApiController.getTopProducts',

  'GET /api/orderdetail':'ApiController.getOrderDetail',
  'GET /api/order':'ApiController.getOrder',

};
