angular.module("computersController", ['ngAnimate', 'rzModule', 'ui.bootstrap'])
    .controller("computersCtrl", function($scope, $http) {
        $scope.search = {};
        $scope.pageTitle = "Компютри";
        $http.get("/computers").then(function(response) {
            response.data.sort((c1, c2) => c1.price - c2.price);
            $scope.computers = response.data;
            $scope.slider = {
                minValue: $scope.computers[0].price,
                maxValue: $scope.computers[$scope.computers.length-1].price,
                options: {
                    floor: $scope.computers[0].price,
                    ceil: $scope.computers[$scope.computers.length-1].price,
                    step: 50
                }
            };
            print(response.data);
        })

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        function sort(arr) {
            arr.sort(function(arr1, arr2) {
                if (arr1 > arr2)
                    return 1;
                if (arr1 < arr2)
                    return -1;
                return 0;
            })
        }

        function print(data) {
            var brands = data.map((comp) => comp.brand);
            brands = brands.filter(onlyUnique);
            sort(brands);
            $scope.brands = brands;
            var displaySizes = data.map((comp) => comp.displaysize);
            displaySizes = displaySizes.filter(onlyUnique);
            sort(displaySizes);
            $scope.displaySizes = displaySizes;
            var rams = data.map((comp) => comp.ram);
            rams = rams.filter(onlyUnique);
            sort(rams);
            $scope.rams = rams;
            var hdds = data.map((comp) => comp.hdd);
            hdds = hdds.filter(onlyUnique);
            hdds = hdds.map(x => parseFloat(x)).sort((x1, x2) => x1 - x2).map(x => x + " GB")
            $scope.hdds = hdds;
            var oss = data.map((comp) => comp.os);
            oss = oss.filter(onlyUnique);
            sort(oss);
            $scope.oss = oss;
            var processors = data.map((comp) => comp.processor);
            processors = processors.filter(onlyUnique);
            sort(processors);
            $scope.processors = processors;
        }
    })