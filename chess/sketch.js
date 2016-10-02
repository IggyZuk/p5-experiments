"use strict";

var board = null;

var TILE_TYPE = {
	WHITE: 0,
	BLACK: 1
}

var PIECE_TYPE = {
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

var pieces = [
	{ type: PIECE_TYPE.WHITE_KING, id: 'wk', name: "white-king", sprite: null },
	{ type: PIECE_TYPE.WHITE_QUEEN, id: 'wq', name: "white-queen", sprite: null },
	{ type: PIECE_TYPE.WHITE_ROOK, id: 'wr', name: "white-rook", sprite: null },
	{ type: PIECE_TYPE.WHITE_BISHOP, id: 'wb', name: "white-bishop", sprite: null },
	{ type: PIECE_TYPE.WHITE_KNIGHT, id: 'wn', name: "white-knight", sprite: null },
	{ type: PIECE_TYPE.WHITE_PAWN, id: 'wp', name: "white-pawn", sprite: null },
	{ type: PIECE_TYPE.BLACK_KING, id: 'bk', name: "black-king", sprite: null },
	{ type: PIECE_TYPE.BLACK_QUEEN, id: 'bq', name: "black-queen", sprite: null },
	{ type: PIECE_TYPE.BLACK_ROOK, id: 'br', name: "black-rook", sprite: null },
	{ type: PIECE_TYPE.BLACK_BISHOP, id: 'bb', name: "black-bishop", sprite: null },
	{ type: PIECE_TYPE.BLACK_KNIGHT, id: 'bn', name: "black-knight", sprite: null },
	{ type: PIECE_TYPE.BLACK_PAWN, id: 'bp', name: "black-pawn", sprite: null }
];

var initialSetup = [
	['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
	['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
	['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
	['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
]

function GetPieceByType(pieceType) {
	for (var i = 0; i < pieces.length; i++) {
		if (pieces[i].type === pieceType) {
			return pieces[i];
		}
	}
}

function GetPieceById(pieceId) {
	for (var i = 0; i < pieces.length; i++) {
		if (pieces[i].id === pieceId) {
			return pieces[i].type;
		}
	}
}

function preload() {
	var spritePath = "assets/";
	var extension = ".svg";
	for (var i = 0; i < pieces.length; i++) {
		pieces[i].sprite = loadImage(spritePath + pieces[i].name + extension);
	}
}

function setup() {
	createCanvas(400, 400);
	frameRate(60);
	board = new Board(8, 50);
	board.init();
}

function draw() {
	background(0);
	board.show();
}

function Board(gridSize, tileSize) {
	this.grid = [];
	this.gridSize = gridSize;
	this.tileSize = tileSize;

	this.init = function() {
		this.grid = [];
		for (var row = 0; row < this.gridSize; row++) {
			var letter = 'a';
			this.grid[row] = [];
			for (var column = 0; column < this.gridSize; column++) {
				var tileType = (column + row) % 2 ? TILE_TYPE.WHITE : TILE_TYPE.BLACK;
				var tile = new Tile(this, row, column, tileType, letter, gridSize - row);
				this.grid[row][column] = tile;

				letter = letter.substring(0, letter.length - 1) + String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);

				var pieceType = GetPieceById(initialSetup[row][column]);
				tile.addPieceType(pieceType);
			}
		}
	}

	this.getTile = function(row, column) {
		return this.grid[row][column];
	}

	this.show = function() {
		for (var row = 0; row < this.gridSize; row++) {
			for (var column = 0; column < this.gridSize; column++) {
				var tile = this.grid[row][column];
				tile.show();
				//tile.showName();
			}
		}
	}
}

function Tile(board, x, y, tileType, letter, number) {
	this.board = board;
	this.x = x;
	this.y = y;
	this.tileType = tileType;
	this.letter = letter;
	this.number = number;
	this.pieceType = 0;

	this.addPieceType = function(pieceType) {
		this.pieceType = pieceType;
	}

	this.show = function() {
		noStroke();
		var b = (this.tileType === TILE_TYPE.WHITE) ? 128 : 64;
		fill(b);
		rect(this.y * board.tileSize, this.x * board.tileSize, board.tileSize, board.tileSize);

		if (this.pieceType > 0) {
			var piece = GetPieceByType(this.pieceType);
			image(piece.sprite, this.y * board.tileSize, this.x * board.tileSize);
		}
	}

	this.showName = function() {
		fill(128);
		textSize(32);
		textAlign(CENTER);
		text(this.letter + "," + this.number, (this.y + 0.5) * board.tileSize, (this.x + 0.7) * board.tileSize);
	}
}
