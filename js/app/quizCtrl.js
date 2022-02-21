app.controller('quizCtrl', ($scope, $rootScope, $routeParams, $http) => {
    $scope.isStarted = false;
    $scope.indexQuestion = 0;
    $scope.elem = [];
    $scope.mark = 0;
    $scope.check = false;
    $rootScope.subjects.forEach(ar => {
        if (ar.Id == $routeParams.id) {
            $scope.subject = angular.copy(ar);
            return;
        }
    });

    $http.get('db/Quizs/' + $routeParams.id + '.js').then((response) => {
        $scope.questions = response.data;
        console.log(response.data);
    })

    $scope.startQuiz = () => {
      
        window.location.href = "#quiz/" + $routeParams.id;
        Swal.fire({
            title: 'Bắt đầu thi?',
            text: "Bạn đã sẳn sàng!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có! Bắt đầu thi.',
            cancelButtonText: 'Chưa'
        }).then((r) => {
            if (r.isConfirmed) {
                $scope.isStarted = true;
            } else {
                $scope.isStarted = false;
            }
            console.log($scope.isStarted, r)
        })
    }

    $scope.first = () => {
        $scope.indexQuestion = 0;
    }

    $scope.prev = (index) => {
        if ($scope.indexQuestion > 0) {
            $scope.indexQuestion = index;
        }
    }

    $scope.next = (index) => {
        if ($scope.indexQuestion < $scope.questions.length - 1) {
            $scope.indexQuestion = index;
        }
    }

    $scope.last = () => {
        $scope.indexQuestion = $scope.questions.length - 1;
    }

    $scope.submit = () => {
        $scope.check = true;
        //Nếu không chọn sẽ không cho phép submit
        if (!$('input[name="answer"]:checked').length) {
            return;
        }

        var ans = $('input[name="answer"]:checked').val();
        if (ans == $scope.questions[$scope.indexQuestion].AnswerId) {
            Swal.fire({
                icon: 'success',
                title: 'Chúc mừng bạn đã chọn đúng!',
                text: 'Bạn được cộng ' + $scope.questions[$scope.indexQuestion].Marks + ' điểm',
                showConfirmButton: false,
                timer: 1200
            });

            $scope.mark += $scope.questions[$scope.indexQuestion].Marks;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Rất tiết! bạn đã chọn sai đáp án.',
                showConfirmButton: false,
                timer: 1200
            });

        }
        console.log($scope.check);
    }
})