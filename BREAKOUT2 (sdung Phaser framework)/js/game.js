// JavaScript Document
    var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
      preload: preload, create: create, update: update
    });

	var ball;
	var paddle;

	var bricks;
	var newBrick;
	var brickInfo;

	var scoreText;
	var score = 0;

	var playing = false;
	var startButton;


	/*-----------------LOAD ASSETS---------------*/
    function preload() {
		//Giúp canvas trở nên responsive
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
		//////////////////////////////////
		game.stage.backgroundColor = '#eee';
		
		game.load.image('ball', 'images/ball.png');
		game.load.image('paddle', 'images/paddle.png');
		game.load.image('brick', 'images/brick.png');
		game.load.spritesheet('button', 'images/button.png', 120, 40);

	} 


    function create() {
		//Khởi động engine Arcade Physics
		///Có 3 engines tất cả: Arcade, P2, Ninja
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Add sprites
		///////ball
		ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
		ball.anchor.set(0.5);
		///////paddle
		paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
		paddle.anchor.set(0.5,1);
		///////start button
		startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);// 1 - 0 - 2 là cho event over, out & down
		startButton.anchor.set(0.5);

		
		//Enable physic
		game.physics.enable(ball, Phaser.Physics.ARCADE);
			//ball.body.velocity.set(150, -150);
		game.physics.enable(paddle, Phaser.Physics.ARCADE);

		//Enable collision
		ball.body.collideWorldBounds = true;
		ball.body.bounce.set(1); //Set độ nảy
		paddle.body.immovable = true;
		
		//Check collision với đường dưới
		game.physics.arcade.checkCollision.down = false;
		//--->khiến đường dưới  biến mât
		
		//detect đường dưới
		ball.checkWorldBounds = true; //event lisnener cho bóng ra khỏi canvans
		ball.events.onOutOfBounds.add(function(){
			alert('Game over!');
			location.reload();
		}, this);

		//Vẽ brick
		initBricks();

		//Tạo text
		scoreText = game.add.text(5, 5, 'Points: 0', {font:'18px Arial', fill: '#0095DD'});

	} 

	/*-----------------UPDATE EVERY FRAME---------------*/
    function update() {
		//Collision giữa bóng vs paddle
		game.physics.arcade.collide(ball, paddle, ballHitPaddle);
		game.physics.arcade.collide(ball, bricks, ballHitBrick); //--> khi ball chạm bricks thì chạy function ballHitBrick
		//Input
		if(playing){
			paddle.x = game.input.x || game.world.width*0.5
		}
	}
	/*---------------------------------------------------*/

	function initBricks() {
		brickInfo = {
			width: 50,
			height: 20,
			count: {
				row: 3,
				col: 7
			},
			offset: {
				top: 50,
				left: 60
			},
			padding: 10
		};
		
		//TẠO CÁC OBJECT BRICK, CHO VÀO ARRAY 'bricks'
		bricks = game.add.group();
		console.log(bricks);
		for (var c=0; c<brickInfo.count.col; c++){
			for (var r=0; r<brickInfo.count.row; r++){
				var brickX = (c*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
				var brickY = (r*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
				newBrick = game.add.sprite(brickX, brickY, 'brick');
				game.physics.enable(newBrick, Phaser.Physics.ARCADE); 
				newBrick.body.immovable = true;
				newBrick.anchor.set(0.5);
				bricks.add(newBrick);
			}
		}
	}
function ballHitBrick(ball, brick){
	brick.kill(); //làm gạch biến mất (loại bỏ object trong array brick)
	score += 10;
	scoreText.setText('Points: ' + score);
	
	var count_alive =0;
    for (var i = 0; i < bricks.children.length; i++) {
      if (bricks.children[i].alive == true) {
        count_alive++;
      }
    }
    if (count_alive === 0) {
      alert('You won the game, congratulations!');
      location.reload();
    }
}

function ballHitPaddle(ball, paddle) {
    ball.body.velocity.x = -1*5*(paddle.x-ball.x);
}

function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
}
