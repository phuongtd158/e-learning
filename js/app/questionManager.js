app.controller('question', ($scope, $rootScope, $http) => {
    const url = 'https://6219009c81d4074e859ebf2f.mockapi.io/subjects';

    $scope.indexSubject = 0;
    $scope.indexQuestion = 0;


    //Hiển thị mắc định danh sách câu hỏi của môn học đầu tiên lên table
    $http.get(url + '/' + 1 + '/' + 'questions').then((response) => {
        $scope.questions = response.data;
    })

    //Đổ danh sách câu hỏi của môn học được chọn lên table theo id
    $scope.fillToTable = () => {
        var sb = $('#sb option:selected').val(); //Lấy ra value của option được chọn 
        $rootScope.subjects.forEach((ar, index) => { //Duyệt mảng subjects
            if (ar.Id == sb) { //Nếu value của option được chọn bằng id của môn học
                $scope.indexSubject = index; //Gán indexSubject bằng index của môn học được chọn
                return;
            }
        });
        $http.get(url + '/' + $rootScope.subjects[$scope.indexSubject].id + '/' + 'questions').then((response) => { //Lấy danh sách câu hỏi của môn học được chọn
            $scope.questions = response.data; //Gán danh sách câu hỏi của môn học được chọn vào questions
            console.log(response.data);
        })
    }

    //Gán id đáp án đúng cho option câu hỏi được chọn
    $scope.correctAnswerId = (id) => {

        var correctAnswerId = Math.floor(Math.random() * 10000) + 100001; //Tạo ra id đáp án đúng ngẫu nhiên

        $scope.question.Answers[0].Id = Math.floor(Math.random() * 10000) + 100001;
        $scope.question.Answers[1].Id = Math.floor(Math.random() * 10000) + 100001;
        $scope.question.Answers[2].Id = Math.floor(Math.random() * 10000) + 100001;
        $scope.question.Answers[3].Id = Math.floor(Math.random() * 10000) + 100001;

        var ans = $('#' + id + ' option:selected').val(); //Lấy ra value của option được chọn
        if (ans == 'A') {
            $scope.question.Answers[0].Id = correctAnswerId;
        } else if (ans == 'B') {
            $scope.question.Answers[1].Id = correctAnswerId;
        } else if (ans == 'C') {
            $scope.question.Answers[2].Id = correctAnswerId;
        } else if (ans == 'D') {
            $scope.question.Answers[3].Id = correctAnswerId;
        }
        $scope.question.AnswersId = correctAnswerId;

    }

    $scope.clear = () => {
        $scope.question = {};
        $scope.indexQuestion = 0;
    }

    $scope.save = () => {
        console.log('save');
        $scope.correctAnswerId('an');

        $http.post(url + '/' + $rootScope.subjects[$scope.indexSubject].id + '/' + 'questions', $scope.question).then((response) => {
            $scope.questions.push(response.data);
            console.log(response.data)
            Swal.fire({
                title: 'Thêm mới câu hỏi thành công!',
                icon: 'success',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            })
        })
    }

    $scope.update = (index) => {
        console.log('update');
        $scope.correctAnswerId('anU');

        $http.put(url + '/' + $rootScope.subjects[$scope.indexSubject].id + '/' + 'questions/' + $scope.questions[index].id, $scope.question)
            .then((response) => {
                console.log(response.data);
                $scope.questions[index] = angular.copy($scope.question);
                Swal.fire({
                    title: 'Cập nhật câu hỏi thành công!',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                })
            })
    }

    $scope.delete = (index) => {
        Swal.fire({
                title: 'Bạn có muốn xóa câu hỏi này không ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    $http.delete(url + '/' + $rootScope.subjects[$scope.indexSubject].id + '/' + 'questions/' + $scope.questions[index].id)
                        .then(response => {
                            $scope.questions.splice(index, 1);
                            Swal.fire({
                                title: 'Xóa câu hỏi thành công!',
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
            })
    }

    $scope.edit = (index) => {
        console.log('edit')
        $scope.indexQuestion = index;
        $scope.question = angular.copy($scope.questions[$scope.indexQuestion]);
    }

})