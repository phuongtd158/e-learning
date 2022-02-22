app.controller('signupCtrl', ($scope, $rootScope, $http) => {
    $scope.signup = () => {
        const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students';
        $http.post(url, $rootScope.student)
            .then((response) => {
                $rootScope.students.push(response.data);
                $rootScope.isLogin = true;
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    text: 'Quay lại trang chủ!',
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
                    title: 'Đăng ký thất bại!',
                    text: 'Đăng ký lại !',
                    icon: 'error',
                })
            })
    }
})
app.directive('checkRepass', () => {
    return {
        require: 'ngModel',
        link: (scope, elem, attr, ctrl) => {
            const fnCheckRepass = (value) => {
                var pass = scope.student.password;
                if (value == pass) {
                    ctrl.$setValidity('charE', true);
                } else {
                    ctrl.$setValidity('charE', false);
                }
                return value;
            };
            ctrl.$parsers.push(fnCheckRepass);
        }
    }
})
// app.directive('checkUser', () => {
//     return {
//         require: 'ngModel',
//         link: (rootScope, scope, elem, attr, ctrl) => {
//             const fnCheckUser = (value) => {
//                 var username = rootScope.student.username;
//                 var check = false;
//                 for (var i = 0; i < rootScope.students.length; i++) {
//                     if (rootScope.students[i].username == username) {
//                         check = true;
//                         break;
//                     }
//                 }
//                 if (check) {
//                     ctrl.$setValidity('charE', false);
//                 } else {
//                     ctrl.$setValidity('charE', true);
//                 }
//                 return value
//             };
//             ctrl.$parsers.push(fnCheckUser);
//         }
//     }
// })