app.controller('quizCtrl', ($scope, $rootScope, $routeParams, $http, $interval) => {

    $scope.indexQuestion = 0;
    $scope.elem = [];
    $scope.mark = 0;
    $scope.timer = 900;
    $scope.isSubmitted = undefined;
    $rootScope.subjectH = [];
    $rootScope.subject = {};

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

    $http.get('db/Quizs/' + $routeParams.id + '.js').then((response) => {
        $scope.questions = response.data;
        console.log(response.data);
    })

    $scope.startQuiz = () => {
        course.classList.toggle('hidee');
        quiz.classList.remove('hidee');
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

        $rootScope.subject.name = $scope.subject.Name;
        $rootScope.subject.mark = $scope.mark;
        $rootScope.subject.date = new Date();

    }
    $rootScope.subjectH.push($rootScope.subject);
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