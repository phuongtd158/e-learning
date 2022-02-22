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
            Swal.fire({
                title: 'Bắt đầu thi?',
                text: "Bạn đã sẳn sàng!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có! Bắt đầu thi.',
                cancelButtonText: 'Chưa'
            }).then((result) => {
                if (result.isConfirmed) {
                    $routeParams.id = id;
                    window.location.href = "#quiz/" + $routeParams.id;
                } else {
                    window.location.href = "#course";
                }
            })

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