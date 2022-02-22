app.controller('loginCtrl', ($scope, $rootScope) => {
    $scope.login = () => {
        for (var i = 0; i < $rootScope.students.length; i++) {
            if ($scope.students[i].username == $scope.username_login && $scope.students[i].password == $scope.password_login) {
                Swal.fire({
                    title: 'Đăng nhập thành công!',
                    text: 'Quay lại trang chủ!',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                })
                $rootScope.isLogin = true;
                $rootScope.student = $rootScope.students[i];
                window.location.href = '#!home';
                $rootScope.indexStudent = $rootScope.students[i];
                return;
            } else {
                Swal.fire({
                    title: 'Đăng nhập thất bại!',
                    text: 'Nhập lại!',
                    icon: 'error',
                })
                $rootScope.isLogin = false;
            }
        }
    }

})