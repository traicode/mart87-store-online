// Can we seperate to a file app.module.js
var app = angular.module("TheApp", []);

//app.constant('API_END_POINT', 'http://all-nodes-ravuthz2.c9users.io:8080');
app.constant('API_END_POINT', '');

// This also can seperate to a file app.service.js
app.service('ApiService', function($http, API_END_POINT) {

    this.getProduct = function(page, limit) {
        var url = API_END_POINT + '/api/products?page=' + (page || 1) + '&limit=' + (limit || 10);
        return $http.get(url).then(function(res) {
            return res.data;
        });
    };

    this.getCategory = function(page, limit) {
        var url = API_END_POINT + '/api/categories?page=' + (page || 1) + '&limit=' + (limit || 10);
        return $http.get(url).then(function(res) {
            return res.data;
        });
    }
    
    this.getProductByCategory = function(categoryId , page, limit){
        
        var url = API_END_POINT + '/api/products/category/'+ categoryId +"?page="+ (page || 1) + '&limit=' + (limit || 10);
        return $http.get(url).then(function(res) {
            return res.data;
        });
    }
    
     this.getPartner = function(page, limit) {
        var url = API_END_POINT + '/api/partners?page=' + (page || 1) + '&limit=' + (limit || 10);
        return $http.get(url).then(function(res) {
            return res.data;
        });
    }

});

app.service('Storage', function() {

    this.getProduct = function() {
        var items = localStorage.getItem('products');
        if (items) {
            return JSON.parse(items);
        }
        return {};
    };

    this.setProduct = function(value) {
        console.log("setCartItems value: ", value);
        localStorage.setItem('products', JSON.stringify(value));

    };

    this.addItemToCart = function(item) {
        var products = this.getProduct();
        var oldItem = products[item.id];
        
        if (oldItem) {
            item.qty = Number(oldItem.qty) + Number(item.qty);
        }
        
        products[item.id] = item;
        
        this.setProduct(products);
        
        console.clear();
        angular.forEach(products, function(item, key) {
            console.log("Products " + item.id + ' => ' + item.qty);
        });
        
        return products;
    };

    this.totalQty = function() {
        var products = this.getProduct();
        var total = 0;
        angular.forEach(products, function(item, key) {
            total += Number(item.qty);
        });
        return total;
    }
    
    this.totalPrice = function(){
        var products = this.getProduct();
        var total = 0;
        angular.forEach(products, function(item, key) {
            total += Number(item.price);
        });
        return total;
    }
    
    this.submitOrder =  function(){
        localStorage.setItem('products', null);
    }
});

// Parent Controller for Pager load data with increase and decrease qty for product cart
app.controller('PagerCtr', function($scope, ApiService, Storage) {
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.showProductModal = false;
  
    $scope.loadData = function(page, limit) {
        ApiService.getProduct().then(function(res) {
            if (res.data) {
                $scope.products = res.data;
                $scope.filterQty($scope.products);
            }
        });
    };

    $scope.filterQty = function(items) {
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

    $scope.addToCart = function(item) {
        console.log("addToCart: ", item);
        Storage.addItemToCart(item);
        $scope.filterQty($scope.products);
        console.log("All items in cart: ", Storage.totalQty());
    
        console.log("Select Product ",  item);
        $scope.loadData();
    };
    
    $scope.onImageClick = function(item) {
        $scope.selectedProduct = item;
        $scope.showProductModal = true;
        console.log("Item Click ",  $scope.selectedProduct);
    };
    
    $scope.parseProImage = function (image) {
        return "http://localhost:1337/images/product/"+ image;
    };

    $scope.parseCatImage = function (image) {
        return "http://localhost:1337/images/category/"+ image;
    };
});

// these controllers can seperate to files app.{ controller name }.js
app.controller('NewProductCtr', function($scope, $controller, ApiService) {
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.stock = 10;
    $scope.title = 'New Product';
    
    $scope.selectedItem = {};

    // Override to parent
    $scope.loadData = function(page, limit) {
        ApiService.getProduct(page, 100).then(function(res) {
            if (res.data) {
                $scope.products = res.data;
                $scope.filterQty($scope.products);
            }
        });
    };

    $scope.loadData();
});

app.controller('RecommendProductCtr', function($scope, $controller) {
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.stock = 10;
    $scope.title = 'Recommend Product';

    $scope.loadData();
});

app.controller('PopularProductCtr', function($scope, $controller) {
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.stock = 100;
    $scope.title = 'Popular  Product';

    $scope.loadData();
});

app.controller('CategoryCtr', function($scope, $controller, ApiService) {
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.loadData = function(page, limit) {
        ApiService.getCategory(page, limit).then(function(res) {
            $scope.categories = res.data;
        });
    };

    $scope.loadData();
});

app.controller('ProductByCategoryCtr', function($scope, $controller, ApiService) {
    $scope.loadData = function(categoryId,page, limit) {
        ApiService.getProductByCategory(categoryId, page, limit).then(function(res) {
            $scope.products = res.data;
            $scope.title = 'Category Name';
            console.log("Product By Category : ",  res.data);
        });
    };

    $scope.loadData();
});

app.controller('PartnerCtr', function($scope, $controller, ApiService) {
    $scope.loadData = function(page, limit) {
        ApiService.getPartner(page, limit).then(function(res) {
            $scope.partners = res.data;
        });
    };

    $scope.loadData();
});

app.controller('NavbarCtr', function($scope, $controller, Storage) {
    $scope.cartItems = [];
    $scope.toggleCartBox = false;
    
    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.deliveryFee = 0;
    
    $scope.productSelectedItem = 0;
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.init = function() {
        var products = Storage.getProduct();
        console.log("Product ",  products);
         $scope.cartItems  = products;
         
         var price = Storage.totalPrice();
          $scope.subTotal = price;
          $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee); 
          
          
          $scope.productSelectedItem = Storage.totalQty();
    };
    
    $scope.onToggleCartBox = function() {
        $scope.toggleCartBox = !$scope.toggleCartBox;
        $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee);
    };
    
    $scope.init();
});

app.controller('CheckoutCtr', function($scope, $controller, Storage) {
    $scope.cartItems = [];
    
    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.deliveryFee = 0;
    
    $scope.price = 0;
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.init = function() {
        var products = Storage.getProduct();
        console.log("Product CheckoutCtr ",  products);
         $scope.cartItems  = products;
         
         var price = Storage.totalPrice();
          $scope.subTotal = price;
          $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee); 
    };
    
    $scope.init();
})
