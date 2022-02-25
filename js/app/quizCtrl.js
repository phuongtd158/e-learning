app.controller('quizCtrl', ($scope, $rootScope, $routeParams, $http, $interval) => {

    $scope.indexQuestion = 0;
    $scope.elem = [];
    $scope.mark = 0;
    $scope.timer = 900;
    $scope.isSubmitted = undefined;


    var course = document.querySelector('#course');
    var mark = document.querySelector('#mark');
    var quiz = document.querySelector('.quiz-wrapper');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');

    $rootScope.subjects.forEach(ar => {
        if (ar.Id == $routeParams.id) {
            $scope.subject = angular.copy(ar);
            return;
        }
    });

    $http.get('https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/subjects').then((response) => {
        var indexSubject = 0;
        $rootScope.subjects.forEach((ar, index) => {
            if (ar.Id == $routeParams.id) {
                $scope.subject = angular.copy(ar);
                indexSubject = index;
                return;
            }
        });
        response.data = $scope.subjects[indexSubject].question;
        $scope.questions = response.data;
        console.log(response.data);
    })

    $scope.startQuiz = () => {
        course.classList.toggle('hidee');
        quiz.classList.remove('hidee');
    }

    $scope.submit = () => {

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
    }


    $scope.endQuiz = () => {

        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                $scope.timer = 3;
                Swal.fire({
                    title: 'Kết thúc bài thi',
                    text: "Bài thi sẽ kết thúc sau 3 giây",
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 4000
                });

            }
        })

    }

    $scope.saveHistory = () => {

        // $http.get('https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.indexStudent + '/' + 'history').then((response) => {
        //     console.log(response.data);
        // })

        $scope.newHistory = {};
        $scope.newHistory.name = $scope.subject.Name;
        $scope.newHistory.mark = $scope.mark;
        $scope.newHistory.date = new Date();
        $rootScope.students[$rootScope.indexStudent].history.push($scope.newHistory);

        $http.post('https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/students' + '/' + $rootScope.students[$rootScope.indexStudent].id + '/' + 'history', $scope.newHistory).then((response) => {
                Swal.fire({
                    title: 'Lưu kết quả thành công!',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                })
                window.location.href = '#course';
            })
            .catch((error) => {
                console.error(error);
            })
    }


    const formatTime = (val) => {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    const setTime = () => {
        sec.innerHTML = formatTime($scope.timer % 60);
        min.innerHTML = formatTime(parseInt($scope.timer / 60));
    }

    var stop = $interval(() => {
        setTime();
        if ($scope.timer > 0) {
            $scope.timer--;
        } else {
            $rootScope.student.marks = (parseInt($rootScope.student.marks) + $scope.mark);
            $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
            course.classList.toggle('hidee');
            quiz.classList.toggle('hidee');
            mark.classList.remove('hidee');
            $interval.cancel(stop);
            course.classList.toggle('hidee');
        }

    }, 1000);


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
})