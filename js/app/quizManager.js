app.controller('quiz', ($scope, $rootScope, $http) => {

    $scope.subject = {};
    $scope.index = 0;
    $scope.save = () => {
        console.log('save');
        $rootScope.subjects.push(angular.copy($scope.subject));
        Swal.fire({
            title: 'Thêm mới khóa học thành công!',
            icon: 'success',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        })
    }

    $scope.edit = (index) => {
        console.log('edit');
        $scope.index = index;
        $scope.subject = angular.copy($rootScope.subjects[index]);
    }
    $scope.delete = (index) => {
        console.log('delete');
        $rootScope.subjects.splice(index, 1);
        $scope.reset();
        Swal.fire({
            title: 'Xóa thành công!',
            icon: 'success',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        })
    }
    $scope.update = () => {
        console.log('update');
        $rootScope.subjects[$scope.index] = angular.copy($scope.subject);
        Swal.fire({
            title: 'Chỉnh sửa thành công!',
            icon: 'success',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        })
    }
    $scope.reset = () => {
        $scope.subject = {};
        $scope.index = -1;
    }
})