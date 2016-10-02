"use strict";

var config = null;
var controller = null;

function preload() {
	config = new Config();
	config.loadSprites();
}

function setup() {
	createCanvas(400, 400);
	frameRate(60);
	controller = new Controller(new Board());
	controller.init();
}

function draw() {
	background(0);
	controller.show();
}

function mousePressed() {
	if (controller) controller.onMousePressed();
}

function Config() {

	this.TILE_TYPE = {
		WHITE: 0,
		BLACK: 1
	}

	this.PIECE_TYPE = {
		WHITE_KING: 1,
		WHITE_QUEEN: 2,
		WHITE_ROOK: 3,
		WHITE_BISHOP: 4,
		WHITE_KNIGHT: 5,
		WHITE_PAWN: 6,
		BLACK_KING: 7,
		BLACK_QUEEN: 8,
		BLACK_ROOK: 9,
		BLACK_BISHOP: 10,
		BLACK_KNIGHT: 11,
		BLACK_PAWN: 12
	}

	this.gridSize = 8;
	this.tileSize = 50;

	this.initialSetup = [
		['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
		['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
		['--', '--', '--', '--', '--', '--', '--', '--'],
		['--', '--', '--', '--', '--', '--', '--', '--'],
		['--', '--', '--', '--', '--', '--', '--', '--'],
		['--', '--', '--', '--', '--', '--', '--', '--'],
		['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
		['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
	];

	this.pieces = [
		{ type: this.PIECE_TYPE.WHITE_KING, id: 'wk', name: "white-king", sprite: null },
		{ type: this.PIECE_TYPE.WHITE_QUEEN, id: 'wq', name: "white-queen", sprite: null },
		{ type: this.PIECE_TYPE.WHITE_ROOK, id: 'wr', name: "white-rook", sprite: null },
		{ type: this.PIECE_TYPE.WHITE_BISHOP, id: 'wb', name: "white-bishop", sprite: null },
		{ type: this.PIECE_TYPE.WHITE_KNIGHT, id: 'wn', name: "white-knight", sprite: null },
		{ type: this.PIECE_TYPE.WHITE_PAWN, id: 'wp', name: "white-pawn", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_KING, id: 'bk', name: "black-king", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_QUEEN, id: 'bq', name: "black-queen", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_ROOK, id: 'br', name: "black-rook", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_BISHOP, id: 'bb', name: "black-bishop", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_KNIGHT, id: 'bn', name: "black-knight", sprite: null },
		{ type: this.PIECE_TYPE.BLACK_PAWN, id: 'bp', name: "black-pawn", sprite: null }
	];

	this.loadSprites = function() {
		var spritePath = "assets/";
		var extension = ".svg";
		for (var i = 0; i < config.pieces.length; i++) {
			config.pieces[i].sprite = loadImage(spritePath + config.pieces[i].name + extension);
		}
	}

	this.getPieceByType = function(pieceType) {
		for (var i = 0; i < this.pieces.length; i++) {
			if (this.pieces[i].type === pieceType) {
				return this.pieces[i];
			}
		}
	}

	this.getPieceTypeById = function(pieceId) {
		for (var i = 0; i < config.pieces.length; i++) {
			if (this.pieces[i].id === pieceId) {
				return this.pieces[i].type;
			}
		}
	}
}

function Board() {
	this.grid = [];

	this.init = function() {
		this.grid = [];
		for (var row = 0; row < config.gridSize; row++) {
			var letter = 'a';
			this.grid[row] = [];
			for (var column = 0; column < config.gridSize; column++) {
				var tileType = (column + row) % 2 ? config.TILE_TYPE.WHITE : config.TILE_TYPE.BLACK;
				var tile = new Tile(row, column, tileType, letter, config.gridSize - row);
				this.grid[row][column] = tile;

				letter = letter.substring(0, letter.length - 1) + String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);

				var pieceType = config.getPieceTypeById(config.initialSetup[row][column]);
				tile.addPieceType(pieceType);
			}
		}
	}

	this.getTile = function(row, column) {
		if (row < 0 || row > config.gridSize - 1 || column < 0 || column > config.gridSize - 1) return null;
		return this.grid[row][column];
	}

	this.show = function() {
		for (var row = 0; row < config.gridSize; row++) {
			for (var column = 0; column < config.gridSize; column++) {
				var tile = this.grid[row][column];
				tile.show();
				tile.showName();
			}
		}
	}
}

function Tile(row, column, tileType, letter, number) {
	this.row = row;
	this.column = column;
	this.tileType = tileType;
	this.letter = letter;
	this.number = number;
	this.pieceType = undefined;

	this.addPieceType = function(pieceType) {
		this.pieceType = pieceType;
	}

	this.removePieceType = function() {
		this.pieceType = undefined;
	}

	this.show = function(isHighlight) {
		fill((this.tileType === config.TILE_TYPE.WHITE) ? isHighlight ? 200 : 128 : isHighlight ? 200 : 64);
		rect(this.column * config.tileSize, this.row * config.tileSize, config.tileSize, config.tileSize);

		if (this.pieceType > 0) {
			var piece = config.getPieceByType(this.pieceType);
			image(piece.sprite, this.column * config.tileSize, this.row * config.tileSize);
		}
	}

	this.highlight = function() {
		this.show(true);
	}

	this.showName = function() {
		fill(255);
		textSize(32);
		textAlign(CENTER);
		text(this.letter + "," + this.number, (this.column + 0.5) * config.tileSize, (this.row + 0.7) * config.tileSize);
	}
}

function Controller(board) {
	this.board = board;
	this.selectedTile = null;

	this.init = function() {
		board.init();
	}

	this.onMousePressed = function() {
		var row = floor(mouseY / config.tileSize);
		var column = floor(mouseX / config.tileSize);
		var tile = board.getTile(row, column);

		if (this.selectedTile === null) {
			if (tile.pieceType) {
				this.selectedTile = tile;
			}
		} else {
			var moves = getMovesForPieceType(this.selectedTile.pieceType, this.board, this.selectedTile.row, this.selectedTile.column);

			for (var i = 0; i < moves.length; i++) {
				if (moves[i] != null) {
					if (tile.pieceType === undefined) {
						if (tile.row === moves[i].row && tile.column === moves[i].column) {
							var movingPiece = this.selectedTile.pieceType;
							this.selectedTile.removePieceType();
							tile.addPieceType(movingPiece);
							break;
						}
					}
				}
			}
			this.selectedTile = null;
		}
	}
	this.show = function() {
		var moves = [];
		if (this.selectedTile) {
			moves = getMovesForPieceType(this.selectedTile.pieceType, this.board, this.selectedTile.row, this.selectedTile.column);
		}

		for (var row = 0; row < config.gridSize; row++) {
			for (var column = 0; column < config.gridSize; column++) {
				var tile = board.grid[row][column];

				tile.show();

				for (var i = 0; i < moves.length; i++) {
					if (moves[i] != null) {
						if (tile.pieceType === undefined) {

							if (tile.row === moves[i].row && tile.column === moves[i].column) {
								tile.highlight();
								break;
							}
						}
					}
				}
			}
		}
	}
}

function getMovesForPieceType(type, board, row, column) {
	var result = [];

	switch (type) {
		case config.PIECE_TYPE.WHITE_PAWN:
			result.push(board.getTile(row - 1, column));
			break;
		case config.PIECE_TYPE.BLACK_PAWN:
			result.push(board.getTile(row + 1, column));
			break;
		case config.PIECE_TYPE.WHITE_BISHOP:
		case config.PIECE_TYPE.BLACK_BISHOP:
			for (var i = -config.gridSize; i <= config.gridSize; i++) {
				result.push(board.getTile(row + i, column + i));
				result.push(board.getTile(row + i, column - i));
			}
			break;
		case config.PIECE_TYPE.WHITE_KNIGHT:
		case config.PIECE_TYPE.BLACK_KNIGHT:
			for (var i = -2; i <= 2; i += 4) {
				for (var j = -1; j <= 1; j++) {
					if (j != 0) {
						result.push(board.getTile(row - j, column + i));
						result.push(board.getTile(row + i, column - j));
					}
				}
			}
			break;
		case config.PIECE_TYPE.WHITE_ROOK:
		case config.PIECE_TYPE.BLACK_ROOK:
			for (var i = -config.gridSize; i <= config.gridSize; i++) {
				result.push(board.getTile(row, column + i));
				result.push(board.getTile(row + i, column));
			}
			break;
		case config.PIECE_TYPE.WHITE_QUEEN:
		case config.PIECE_TYPE.BLACK_QUEEN:
			for (var i = -config.gridSize; i <= config.gridSize; i++) {
				result.push(board.getTile(row, column + i));
				result.push(board.getTile(row + i, column));
				result.push(board.getTile(row + i, column + i));
				result.push(board.getTile(row + i, column - i));
			}
			break;
		case config.PIECE_TYPE.WHITE_KING:
		case config.PIECE_TYPE.BLACK_KING:
			for (var i = -1; i <= 1; i++) {
				result.push(board.getTile(row, column + i));
				result.push(board.getTile(row + i, column));
				result.push(board.getTile(row + i, column + i));
				result.push(board.getTile(row + i, column - i));
			}
			break;
	}

	return result;
}
