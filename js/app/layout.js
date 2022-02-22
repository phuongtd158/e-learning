app.config(($routeProvider, $locationProvider) => {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
            })
            .when('/introduce', {
                templateUrl: 'views/introduce.html',
            })
            .when('/course', {
                templateUrl: 'views/course.html',
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
            })
            .when('/faq', {
                templateUrl: 'views/faq.html',
            })
            .when('/feedback', {
                templateUrl: 'views/feedback.html',
            })
            .when('/quiz/:id', {
                templateUrl: 'views/quiz.html',
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
            })
            .when('/edit-password', {
                templateUrl: 'views/edit-password.html',
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
            })
            .otherwise({
                redirectTo: '/home',
            })
    })

    // Hiển thị loading khi đang load template
    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.isLoading = true;
        })
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.isLoading = true;
        })
        $rootScope.$on('$routeChangeError', function () {
            $rootScope.isLoading = true;
        })
    })