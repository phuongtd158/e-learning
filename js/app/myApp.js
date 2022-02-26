const app = angular.module('my_app', ['ngRoute'])
app.run(($rootScope, $http) => {

    $rootScope.student = {};
    $rootScope.subject = {};
    $rootScope.indexStudent = -1;
    $rootScope.isLogin = false;

    const urlStudent = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students';
    const urlSubject = 'https://6219009c81d4074e859ebf2f.mockapi.io/subjects';
    $http.get(urlStudent)
        .then((response) => {
            $rootScope.students = response.data;
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })

    $http.get(urlSubject)
        .then((response) => {
            $rootScope.subjects = response.data;
            console.log(response.data);
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
        window.location.href = '#home';
    }

})