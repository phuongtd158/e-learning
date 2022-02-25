app.controller('user', ($scope, $rootScope, $http) => {
    const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students';
    $scope.student = {};
    $scope.flag = 0;
    $scope.index = -1;
    $scope.save = () => {
        let check = false;
        for (var i = 0; i < $rootScope.students.length; i++) {
            if ($rootScope.students[i].username == $scope.student.username) {
                check = true;
                break;
            } else {
                check = false;
            }
        }
        if (check == true) {
            Swal.fire({
                title: 'Tên tài khoản đã tồn tại!',
                icon: 'error',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            })
        } else {
            $http.post(url, $scope.student)
                .then((response) => {
                    $rootScope.students.push(response.data);
                    Swal.fire({
                        title: 'Thêm mới người dùng thành công!',
                        icon: 'success',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    })
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        title: 'Thêm mới người dùng thất bại!',
                        icon: 'error',
                    })
                })
        }

    }
    $scope.edit = (index) => {
        console.log('edit');
        $scope.index = index;
        $scope.student = angular.copy($rootScope.students[index]);
        $scope.flag = 1;
    }
    $scope.delete = (index) => {
        console.log('delete');
        const apiDelete = url + '/' + $rootScope.students[index].id;
        Swal.fire({
                title: 'Bạn có muốn xóa khóa học này không ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    $http.delete(apiDelete)
                        .then(response => {
                            $rootScope.students.splice(index, 1);
                            $scope.reset();
                            Swal.fire({
                                title: 'Xóa thành công!',
                                icon: 'success',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                            Swal.fire({
                                title: 'Xóa thất bại!',
                                icon: 'error',
                            })
                        })
                }
            })


    }
    $scope.update = () => {
        console.log('update');
        $http.put(url + '/' + $rootScope.students[$scope.index].id, $scope.student)
            .then(response => {
                $rootScope.students[$scope.index] = angular.copy($scope.student);
                Swal.fire({
                    title: 'Chỉnh sửa thành công!',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                })
            })
    }
    $scope.reset = () => {
        $scope.student = {};
        $scope.index = -1;
        $scope.flag = 0;
    }
})