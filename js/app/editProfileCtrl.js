app.controller('editProfileCtrl', ($scope, $rootScope, $http) => {
    $scope.editProfile = () => {
        const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.students[$rootScope.indexStudent].id;
        console.log($rootScope.students[$rootScope.indexStudent].id);
        $http.put(url, $scope.student)
            .then((response) => {
                $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
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