const app = angular.module('my_app', ['ngRoute', ])
    .config(($routeProvider) => {
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
            .when('/quiz', {
                templateUrl: 'views/quiz.html',
            })
            .otherwise({
                redirectTo: 'home',
            })
    })
    .controller('my_controller', function ($scope) {

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