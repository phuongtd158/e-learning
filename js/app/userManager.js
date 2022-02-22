app.controller('user', ($scope, $rootScope, $http) => {
    const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students';
    $scope.student = {};
    $scope.index = 0;
    $scope.save = () => {
        console.log('save');
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
    $scope.edit = (index) => {
        console.log('edit');
        $scope.index = index;
        $scope.student = angular.copy($rootScope.students[index]);
    }
    $scope.delete = (index) => {
        console.log('delete');
        const apiDelete = url + '/' + $rootScope.students[index].id;
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
    }
})