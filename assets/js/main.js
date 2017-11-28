// Can we seperate to a file app.module.js
var app = angular.module("TheApp", []);

//app.constant('API_END_POINT', 'http://all-nodes-ravuthz2.c9users.io:8080');
app.constant('API_END_POINT', '');

app.run(function($rootScope,Storage) {
    $rootScope.totalQty = 0;
});

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
app.controller('PagerCtr', function($scope,  $rootScope, ApiService, Storage) {
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.showProductModal = false;

    $scope.loadData = function(page, limit) {
        ApiService.getProduct().then(function(res) {
            if (res.data) {
                $scope.products = res.data;
                $scope.filterQty($scope.products);
                $scope.countQty();
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
    
    $scope.countQty =  function(){
        $rootScope.totalQty = Storage.totalQty();
        console.log("Total Qty ",    $rootScope.totalQty);        
    };

    $scope.onImageClick = function(item) {
        $scope.selectedProduct = item;
        $scope.showProductModal = true;
        console.log("Item Click ",  $scope.selectedProduct);
    };
    
    $scope.parseProImage = function (image) {
        return "/images/product/"+ image;
      //return "http://all-nodes-ravuthz2.c9users.io:8080/images/product/"+image;    
    };

    $scope.parseCatImage = function (image) {
        return "/images/category/"+image;
    //return "http://all-nodes-ravuthz2.c9users.io:8080/images/category/"+image;
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
                $scope.countQty();
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
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));
    $scope.title = 'Category Name';
    $scope.loadData = function(page, limit) {
        ApiService.getProductByCategory(page, limit).then(function(res) {
            $scope.products = res.data;
            $scope.filterQty($scope.products);
            $scope.countQty();
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
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));

    $scope.cartItems = [];
    $scope.toggleCartBox = false;
    
    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.deliveryFee = 0;
    
    $scope.init = function() {
        var products = Storage.getProduct();
        console.log("Product ",  products);
         $scope.cartItems  = products;
         
         var price = Storage.totalPrice();
          $scope.subTotal = price;
          $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee); 
        
    };
    
    $scope.onToggleCartBox = function() {
        $scope.toggleCartBox = !$scope.toggleCartBox;
        $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee);
    };
    
    $scope.init();
});

app.controller('CheckoutCtr', function($scope, $controller, Storage,$http) {
    angular.extend(this, $controller('PagerCtr', { $scope: $scope }));

    $scope.cartItems = [];
    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.deliveryFee = 0;
  
    $scope.init = function() {
        $scope.cartItems  = Storage.getProduct();
        $scope.subTotal = Storage.totalPrice();
        $scope.grandTotal = ($scope.subTotal + $scope.deliveryFee); 

        $scope.itemOrder($scope.cartItems);
    };

    $scope.itemOrder = function(items) {
        $scope.data = [];
        $scope.proItemOrder = {
            proId: 0,
            proQty: 0
        };
        angular.forEach(items, function(item, key) {
            $scope.proItemOrder.proId = key;
            $scope.proItemOrder.proQty = item.qty;
            $scope.data.push($scope.proItemOrder);
        });
        console.log("DATA ",  $scope.data);
    };

    $scope.onSubmitOrder = function(){
        console.log("DATA ",  Storage.getProduct());
        var pros = [];
        var proItems = Storage.getProduct();
        for (var pro in proItems){
            if (proItems.hasOwnProperty(pro)) {
                console.log("Key  :", pro);
                console.log("V  :",  proItems[pro]);
                pros.push({"proId":pro, "qty":proItems[pro].qty});
            }
           
        }
        console.log("API :", pros);

        // Storage.getProduct().forEach(function(v) {
        //     console.log("value  :", v);
        // });

        // var data = {
        //     cartItems : $scope.data,
        //     subTotal : $scope.subTotal,
        //     grandTotal :  $scope.grandTotal,
        //     deliveryFee :  $scope.deliveryFee
        // };



        // $http.post("/checkout/submitOrder",{json:data}).then(function(res){
        //     console.log("res :  ",  res);  

        // });
    };
    
    $scope.init();
})
