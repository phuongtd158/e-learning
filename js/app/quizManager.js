app.controller('quiz', ($scope, $rootScope, $http) => {

    const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/subjects';
    $scope.subject = {};
    $scope.index = 0;
    $scope.flag = 0;

    $scope.save = () => {
        let check = false;
        for (var i = 0; i < $rootScope.subjects.length; i++) {
            if ($rootScope.subjects[i].Id == $scope.subject.Id) {
                check = true;
                break;
            } else {
                check = false;
            }
        }
        if (check == true) {
            Swal.fire({
                title: 'Khóa học đã tồn tại!',
                icon: 'error',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            })
        } else {
            $http.post(url, $scope.subject)
                .then((response) => {
                    $rootScope.subjects.push(response.data);
                    Swal.fire({
                        title: 'Thêm mới khóa học thành công!',
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
                        title: 'Thêm mới khóa học thất bại!',
                        icon: 'error',
                    })
                })
        }
    }

    $scope.edit = (index) => {
        console.log('edit');
        $scope.index = index;
        $scope.subject = angular.copy($rootScope.subjects[index]);
        $scope.flag = 1;
    }

    $scope.delete = (index) => {
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
                    $http.delete(url + '/' + $rootScope.subjects[index].id)
                        .then((response) => {
                            $rootScope.subjects.splice(index, 1);
                            Swal.fire({
                                title: 'Xóa thành công!',
                                icon: 'success',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            })
                            $scope.reset();
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
        $http.put(url + '/' + $rootScope.subjects[$scope.index].id, $scope.subject)
            .then((response) => {
                $rootScope.subjects[$scope.index] = angular.copy($scope.subject);
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
        $scope.subject = {};
        $scope.index = -1;
        $scope.flag = 0;
    }
})