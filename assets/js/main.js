// Can we seperate to a file app.module.js
var app = angular.module("TheApp", []);

//app.constant('API_END_POINT', 'http://all-nodes-ravuthz2.c9users.io:8080');
app.constant('API_END_POINT', '');

// This also can seperate to a file app.service.js
app.service('ApiService', function($http, API_END_POINT) {

    var jsonToQueryParams = function(json) {
        var params = [];
        angular.forEach(json, function(val, key) {
            params.push(key + '=' + val);
        });
        return '?' + params.join('&');
    };

    var fetchApi = function(url, json) {
        var link = API_END_POINT + url + jsonToQueryParams(json);
        console.log("fetchApi completed url: ", link);
        return $http.get(link).then(function(res) {
            return res.data;
        });
    };

    var fetchApiByPage = function(url, page, limit) {
        var jsonParams = {
            page: (page || 1),
            limit: (limit || 10)
        };
        return fetchApi(url, jsonParams);
    };

    this.getPartner = function(page, limit) {
        return fetchApiByPage('/api/partners', page, limit);
    };

    this.getProduct = function(page, limit) {
        return fetchApiByPage('/api/products', page, limit);
    };

    this.getCategory = function(page, limit) {
        return fetchApiByPage('/api/categories', page, limit);
    };

    this.getProductByCategory = function(cateId, page, limit) {
        return fetchApiByPage('/api/products/category/' + cateId, page, limit);
    };

});

app.service('Storage', function() {

    var PRODUCT_KEY = 'products';

    this.setJson = function(name, json) {
        if (json) {
            localStorage.setItem(name, JSON.stringify(json));
        }
    };

    this.getJson = function(name) {
        var item = localStorage.getItem(name);
        return item ? JSON.parse(item) : {};
    };

    this.getProduct = function() {
        return this.getJson(PRODUCT_KEY);
    };

    this.setProduct = function(json) {
        this.setJson(PRODUCT_KEY, json);
    };

    this.addItemToCart = function(item) {
        var products = this.getProduct();
        var oldItem = products[item.id];
        if (oldItem) {
            item.qty = Number(oldItem.qty) + Number(item.qty);
        }
        products[item.id] = item;

        this.setProduct(products);

        angular.forEach(products, function(item, key) {
            console.log("Products " + item.id + ' => ' + item.qty);
        });

        return products;
    };

    this.removeItemFromCart = function(item) {

    // this.totalQty = function() {

        var products = this.getProduct();
        if (products[item.id]) {
            delete products[item.id];
        }
        this.setProduct(products);

        angular.forEach(products, function(item, key) {
            console.log("Products " + item.id + ' => ' + item.qty);
        });

        return products;
    };

    this.totalQty = function() {
        var total = 0;
        var products = this.getProduct();
        angular.forEach(products, function(item, key) {
            total += Number(item.qty);
        });
        return total;
    }

    this.totalPrice = function() {
        var total = 0;
        var products = this.getProduct();
        angular.forEach(products, function(item, key) {
            total += (Number(item.qty) * Number(item.price));
        });
        return total;
    }

    // what is function do ???
    this.submitOrder = function() {
        localStorage.setItem('products', null);
    }
});

// Parent Controller for Pager load data with increase and decrease qty for product cart
app.controller('PagerCtr', function($scope, $rootScope, API_END_POINT, ApiService, Storage) {
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.showProductModal = false;

    $rootScope.toggleCartBox = false;

    $scope.resetQty = function(items) {
        angular.forEach(items, function(item, key) {
            item.qty = Number(1);
        });
    };

    $scope.increaseQty = function(item) {
        if (item.qty < $scope.stock) {
            item.qty += 1;
        }
    };

    $scope.decreaseQty = function(item) {
        if (item.qty > 1) {
            item.qty -= 1;
        }
    };
    
    $scope.loadData = function(page, limit) {
        ApiService.getProduct().then(function(res) {
            if (res.data) {
                $scope.products = res.data;
                $scope.resetQty($scope.products);
            }
        });
    };

    $scope.addToCart = function(item) {
        Storage.addItemToCart(item);
        $scope.loadData();
        $rootScope.initCartBox();
        console.log("addToCart: ", item);
        console.log("All items in cart: ", Storage.totalQty());
    };

    $scope.removeFromCart = function(item) {
        Storage.removeItemFromCart(item);
        $scope.loadData();
        $rootScope.initCartBox();
        console.log("removeFromCart: ", item);
        console.log("All items in cart: ", Storage.totalQty());
    };

    $scope.onImageClick = function(item) {
        $scope.selectedProduct = item;
        $scope.showProductModal = true;
        console.log("Item Click ", $scope.selectedProduct);
    };

    $scope.parseProImage = function(image) {
        return API_END_POINT + "/images/product/"+image;
    };

    $scope.parseCatImage = function(image) {
        return API_END_POINT + "/images/category/"+image;
    };

    $scope.onToggleCartBox = function() {
        $scope.toggleCartBox = !$scope.toggleCartBox;
        $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee);
    };

    $rootScope.initCartBox = function() {
        $rootScope.deliveryFee = 0;
        $rootScope.totalQty = Storage.totalQty();
        $rootScope.subTotal = Storage.totalPrice();
        $rootScope.grandTotal = $rootScope.subTotal + $rootScope.deliveryFee;
        $rootScope.cartItems = Storage.getProduct();
        $rootScope.orderItems = [];

        angular.forEach($rootScope.cartItems, function(item, key) {
            $rootScope.orderItems.push({ "proId": key, "proQty": item.qty });
        });
    };

    $rootScope.resetCartBox = function() {
        $rootScope.deliveryFee = 0;
        $rootScope.totalQty = 0;
        $rootScope.subTotal = 0;
        $rootScope.grandTotal = 0;
        $rootScope.cartItems = [];
        $rootScope.orderItems = [];
    };

    $rootScope.initCartBox();

});

// these controllers can seperate to files app.{ controller name }.js
app.controller('NewProductCtr', function($scope, $controller, ApiService) {
    // angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.stock = 10;
    $scope.title = 'New Product';

    $scope.selectedItem = {};

    // Override to parent
    $scope.loadData = function(page, limit) {
        ApiService.getProduct(page, 100).then(function(res) {
            if (res.data) {
                $scope.products = res.data;
                $scope.resetQty($scope.products);
            }
        });
    };

    $scope.loadData();
});

app.controller('RecommendProductCtr', function($scope) {
    $scope.stock = 10;
    $scope.title = 'Recommend Product';
    
    $scope.loadData();
});

app.controller('PopularProductCtr', function($scope) {
    $scope.stock = 100;
    $scope.title = 'Popular  Product';
    
    $scope.loadData();
});

app.controller('ProductByCategoryCtr', function($scope, ApiService) {
    $scope.title = 'Category Name';
    $scope.loadData = function(page, limit) {
        ApiService.getProductByCategory(page, limit).then(function(res) {
            $scope.products = res.data;
            $scope.resetQty($scope.products);
        });
    };

    $scope.loadData();
});

app.controller('CategoryCtr', function($scope, ApiService) {
    $scope.loadData = function(page, limit) {
        ApiService.getCategory(page, limit).then(function(res) {
            $scope.categories = res.data;
        });
    };

    $scope.loadData();
});

app.controller('PartnerCtr', function($scope, ApiService) {
    $scope.loadData = function(page, limit) {
        ApiService.getPartner(page, limit).then(function(res) {
            $scope.partners = res.data;
        });
    };

    $scope.loadData();
});

app.controller('CheckoutCtr', function($scope, $rootScope, Storage, $http) {

    $scope.onSubmitOrder = function() {
        // reload data before submit
        $rootScope.initCartBox();

        var data = {
            //cartItems: $rootScope.cartItems, // all cart items
            orderItems: $rootScope.orderItems, // all order items => {"proId": "value", "proQty": "value"}
            subTotal: $rootScope.subTotal,
            grandTotal: $rootScope.grandTotal,
            deliveryFee: $rootScope.deliveryFee
        };

    };
    
    $scope.onToggleCartBox = function() {
        $scope.toggleCartBox = !$scope.toggleCartBox;
        $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee);
    };
    
    $scope.init();

});

// app.controller('CheckoutCtr', function($scope, $controller, Storage,$http) {
//     angular.extend(this, $controller('PagerCtr', { $scope: $scope }));

//         //TODO: Chivon u need to change back follow this {data}
//         //TODO: Or u can change the order item in $rootScope.initCartBox()

//         console.log("onSubmitOrder data: ", data);

//         $http.post("/checkout/submitOrder", { json: data }).then(function(res) {
//             console.log("res :  ", res);
//             // reset data after submit
//             $rootScope.resetCartBox();
//         });
//     };

// })

app.controller('SearchCtr', function($scope, Storage, $http) {

});
