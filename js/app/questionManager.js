app.controller('question', ($scope, $rootScope, $http) => {
    const url = 'https://62132f45f43692c9c6fc2265.mockapi.io/api/v1/subjects';

    $scope.indexSuject = 0;
    $scope.indexQuestion = 0;

    $http.get(url).then((response) => {
        response.data = $rootScope.subjects[$scope.indexSuject].question;
        $scope.questions = response.data;
    })
    $http.get(url).then((response) => {
        var sb = $('#sb option:selected').val();
        $rootScope.subjects.forEach((ar, index) => {
            if (ar.Id == sb) {
                $scope.indexSuject = index;
                return;
            }
        });
        response.data = $scope.subjects[$scope.indexSuject].question;
        $scope.questions = response.data;
        console.log(sb);
    })

    $scope.change = () => {
        $http.get(url).then((response) => {
            var sb = $('#sb option:selected').val();
            $rootScope.subjects.forEach((ar, index) => {
                if (ar.Id == sb) {
                    $scope.indexSuject = index;
                    return;
                }
            });
            response.data = $scope.subjects[$scope.indexSuject].question;
            $scope.questions = response.data;
            console.log(sb);
        })
    }
    var idTrue = Math.floor(Math.random() * 10000) + 10000;
    $scope.question = {
        "Id": Math.floor(Math.random() * 10000) + 10000,
        "Text": '',
        "Marks": '',
        "AnswerId": idTrue,
        "Answers": [{
            "Id": Math.floor(Math.random() * 10000) + 10000,
            "Text": ''
        }]
    };
    $scope.save = () => {
        console.log('save');

        $http.post(url, $scope.question).then((response) => {
            $scope.questions.push(response.data);
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

    $scope.update = () => {
        console.log('update');

        $http.put(url + '/' + $rootScope.subjects[$scope.indexSuject].id, $scope.question).then((response) => {
            $scope.questions.push(response.data);
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

    $scope.delete = (index) => {
        console.log('delete');
        $http.delete(url + '/' + $scope.subjects[index].id)
    }
})