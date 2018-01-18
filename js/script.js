
$(function() {
	
	// generujemy unikalne ID aby nie bylo duplikatow

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	// tworzymy funkcje konstruujaca klase Column

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		// tworzymy kolumne

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		

			// kasowanie kolumny po kliknieciu w przycisk

			$columnDelete.click(function() {
					self.removeColumn();
			});

			// dodaj notatke po kliknieciu w przycisk

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});	

			// konstruowanie kolumny

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);

			return $column;
		}
	}

	// dodanie prototypu

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	// tworzymy funkcje konstruujaca klase Card

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		// tworzymy karte

		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			// kasowanie karty po kliknieciu w przycisk(wewnatrz metody createCard())

			$cardDelete.click(function() {
				self.removeCard();
			});

		// konstruujemy karte(wewnatrz metody createCard())
		
			$card.append($cardDelete)
					.append($cardDescription);

			return $card;

		}
	}

	// dodanie prototypu

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	// tworzymy obiekt tablicy i przypinamy nasluchiwanie zdarzen

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	// implementacja funkcji initSortable(drag and drop)

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	// podpiecie do przycisku tablicy wrzucanie nowej kolumny do tablicy

	$('.create-column').click(function() {
		var name = prompt('Enter a column name');
		var column = new Column(name);
			board.addColumn(column);
	});

	// tworzenie elementow w kanbanie

	// kolumny

	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// dodanie kolumn do tablicy

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// tworzenie kart

	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// dodanie kart do kolumn

	todoColumn.addCard(card1);
	doingcolumn.addCard(card2);

});