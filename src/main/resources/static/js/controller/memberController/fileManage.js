var app = angular.module('myWeb');

app.controller('fileManage', function($scope, $http, $window){
    //this.files = storage;
	$scope.count = 0;
    getFiles('0', '2');
    countAllFile();
    $scope.getNumber = function(num) {
        return new Array(num);
    }
    function countAllFile() { 
		$http({
			method: 'get',
			url: "http://localhost:8080/file/countFileOfUser/"+$scope.userId
		}).success(function(data, status, headers, config){
			$scope.count = Math.ceil(data/2);
		})
		.error(function(data, status, headers, config){
			alert("fail");
		});
	}
    
	$scope.downloadFile = function(idFile){
		$http({
			method: 'get',
			url: "http://localhost:8080/download/check/" + idFile
		}).success(function(data, status, headers, config){
			if(data<=0){
				$window.location.href = 'http://localhost:8080/download/files/' + idFile;
			} else {
				alert("You have meet your download limit!");
			}
		})
		.error(function(data, status, headers, config){
			alert("fail");
		});		
}
    
    function getFiles(page, pageSize) { 
		$http({
			method: 'get',
			url: "http://localhost:8080/file/getByUser/"+$scope.userId+"/"+ parseInt(page)+"/"+ parseInt(pageSize)
		}).success(function(data, status, headers, config){
			$scope.files = data;
		})
		.error(function(data, status, headers, config){
			alert("fail");
		});
	}
    
    $scope.getFileByPage = function(page, pageSize){
    	getFiles(parseInt(page), parseInt(pageSize));
    }
    
    $scope.deleteFile = function(id){
    	$http({
			method: 'get',
			url: "http://localhost:8080/file/delete/"+id
		}).success(function(data, status, headers, config){
			getFiles('0', '2');
		})
		.error(function(data, status, headers, config){
			alert("fail");
		});
    }
    $scope.changeShare = function(idFile){
    	$http({
			method: 'get',
			url: "http://localhost:8080/file/updateSharing/"+idFile
		}).success(function(data, status, headers, config){
		})
		.error(function(data, status, headers, config){
		});
    }
});