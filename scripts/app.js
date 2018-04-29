let app = angular.module('myApp', []);

app.controller('tarefaCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.lista = [];
	$scope.tarefa = {};
	$scope.$location = $location;

	// Busca todas tarefas disponíveis na API
	$scope.listarTarefas = () => {
		$http
		.get('http://dev.4all.com:3003/tarefa')
		.success((data)=> {
			// Valor retornado da API
			$scope.lista = data.lista;
		})
		.error((error) => {
			alert('Falha ao buscar os dados! Tente novamente mais tarde!');
		});
	}

	// Busca uma tarefa em específico com base no ID
	$scope.buscarTarefa = () => {
		// Usa location do AngularJS para pegar o ID passado por paramêtro
		let id = $location.search().id;
		
		// Caso tenha um ID ele faz a busca pelo mesmo
		if (id) {
			$http
				.get('http://dev.4all.com:3003/tarefa/' + id)
				.success((data) => {
					//  dados retornados
					$scope.tarefa = data;
					//inicializa o mapa passando as cordenadas
					$scope.criarMapa($scope.tarefa.latitude, $scope.tarefa.longitude);
				})
				.error(() => {
					console.log('Falha ao buscar os dados!');
				});
		} else {
			window.location = 'index.html';
		}

	}

	/*** 
	** função que renderiza o mapa
	** @lat - latitude retornada pela API
	** @longitude - retornada com base na API
	**/
	$scope.criarMapa = (lat, longitude) => {
        let posistion = {lat: lat, lng: longitude};

        // Inicializa opções do mapa
        let map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 15,
          center: posistion
        });

        // configura marcador no mapa
        let marker = new google.maps.Marker({
          position: posistion,
          map: map
        });
     }
	
	$scope.listarTarefas();

}]).config(function ($locationProvider) {
	// Configura o AngularJS location provider para buscar os parametros passados na URL
	$locationProvider.html5Mode({
			enabled : true,
			requireBase : false
		});
});
