app.controller('courseCtrl', ($scope, $rootScope, $routeParams) => {

    $scope.currentPage = 0;
    $scope.pageSize = Math.ceil(($rootScope.subjects.length) / 6);
    $scope.subject = {};

    $scope.startCourse = (id) => {
        if ($rootScope.isLogin == false) {
            Swal.fire({
                title: 'Bạn chưa đăng nhập!',
                text: 'Đăng nhập để tiếp tục!',
                icon: 'error',
            })
        } else {
            $routeParams.id = id;
            window.location.href = "#quiz/" + $routeParams.id;
        }
    }

    $scope.first = () => {
        $scope.currentPage = 0;
    }
    $scope.prev = () => {
        if ($scope.currentPage > 0) {
            $scope.currentPage -= 6;
        }
    }
    $scope.next = () => {
        if ($scope.currentPage < ($scope.pageSize - 1) * 6) {
            $scope.currentPage += 6;
        }
    }
    $scope.last = () => {
        $scope.currentPage = ($scope.pageSize - 1) * 6;
    }
})