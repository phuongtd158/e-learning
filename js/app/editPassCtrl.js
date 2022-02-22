app.controller('editPassCtrl', ($scope, $rootScope, $http) => {
    $scope.changePass = () => {
        if ($scope.passwordOld == $rootScope.student.password) {
            if ($scope.passwordNewCf == $scope.studentR.password) {

                const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.students[$rootScope.indexStudent].id;

                $http.put(url, $scope.studentR)
                    .then((response) => {
                        $rootScope.student.password = $scope.studentR.password; //gán mật khẩu từ đồi tượng studentR vào mật khẩu của đối tượng student
                        $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
                    })
                    .catch((error) => {
                        console.error(error);
                    })

                Swal.fire({
                    icon: 'success',
                    title: 'Đổi mật khẩu thành công!',
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu không khớp!',
                    text: 'Nhập lại!'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không khớp!',
                text: 'Nhập lại!'
            });
        }
    };
})