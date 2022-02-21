const app = angular.module('my_app', ['ngRoute']);

app.run(($rootScope, $http) => {


    $rootScope.student = {};
    $rootScope.subject = {};
    $rootScope.indexStudent = -1;
    $rootScope.isLogin = false;

    const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students';
    $http.get(url)
        .then((response) => {
            $rootScope.students = response.data;
        })
        .catch((error) => {
            console.log(error);
        })

    $http.get('db/Subjects.js')
        .then((response) => {
            $rootScope.subjects = response.data;
        })
        .catch((error) => {
            console.log(error);
        })

    $rootScope.logoff = () => {
        $rootScope.isLogin = false;
        $rootScope.student = {};
        Swal.fire({
            title: 'Đăng xuất thành công!',
            text: 'Quay lại trang chủ!',
            icon: 'success',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        })
    }



})