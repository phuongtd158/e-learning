app.controller('editProfileCtrl', ($scope, $rootScope, $http, $routeParams) => {


    //Lấy dữ liệu từ api history
    $http.get('https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.students[$rootScope.indexStudent].id + '/' + 'history')
        .then(response => {
            $scope.history = response.data;
        })
        .catch(error => {
            console.log(error);
        })


    $scope.editProfile = () => {
        const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.students[$rootScope.indexStudent].id;
        $http.put(url, $scope.student)
            .then((response) => {
                $rootScope.student = $scope.student;
                $rootScope.students[$rootScope.indexStudent] = angular.copy($scope.student);
                Swal.fire({
                    title: 'Chỉnh sửa thành công !',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
});