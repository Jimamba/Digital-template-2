window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        
        game.load.spritesheet('player','assets/CatfaceSprite.png',26,38);
        game.load.spritesheet('playertwo','assets/DerpMan.png',26,38);
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('stars', 'assets/star.png');
        game.load.image('DerpMeteor', 'assets/DerpMeteor.png');
        game.load.image('LazerKittenBox','assets/LazerKittenBox.png');
        game.load.audio('music','assets/slam of the northstar.mp3');
        
    }
    
    function collectMana(player,star)
    {
    star.kill();
    
    mOne = mOne + 10;
    manaOne.text = 'Mana: ' + mOne;
    var star = stars.create(30 + Math.random() * 650, 0, 'stars');
    star.body.collideWorldBounds = true;
    star.body.gravity.y = 100;
 	//  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.6 + Math.random() * 0.3;
    star.body.bounce.x = 10 + Math.random() * 0.2;
    }
    
    function collectManatwo(playertwo,star)
    {
    star.kill();
    
    mTwo = mTwo + 10;
    manaTwo.text = 'Mana: ' + mTwo;
    var star = stars.create(30 + Math.random() * 650, 0, 'stars');
    star.body.collideWorldBounds = true;
    star.body.gravity.y = 100;
 	//  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.6 + Math.random() * 0.3;
    star.body.bounce.x = 10 + Math.random() * 0.2;
    
    }
    
    function superOne(playertwo,sOne)
    {
    sOne.kill();
    playertwohealth = playertwohealth - 25;
    healthtexttwo.text = 'Player Two: ' + playertwohealth;
    if(playertwohealth == 0 || playertwohealth < 0)
    {
    music.stop();
    sOne.kill();
    playertwo.kill();
    sOne.kill();
    win = game.add.text(400,30, 'YOU WIN!',{ fontSize: '100px', fill: '#000'});
    game.paused = true;
    }
    bool = 0;
    mOne = 0;
    }
    
     
    function superTwo(player,sTwo)
    {
    sTwo.kill();
    playerhealth = playerhealth - 25;
    healthtextone.text = 'Player One: ' + playerhealth;
    if(playerhealth == 0 || playerhealth < 0)
    {
    music.stop();
    sTwo.kill();
    player.kill();
    sTwo.kill();
    win = game.add.text(400,30, 'YOU WIN!',{ fontSize: '100px', fill: '#000'});
    game.paused = true;
    }
    booltwo = 0;
    mTwo = 0;
    }
    var music;
    var bool = 0;
    var booltwo = 0;
    var win;
    var stars;
    var player;
    var playertwo;
    var platforms;
    var cursors;
    var dance;
	var dancetwo;
    var superone;
    var supertwo;
    var up;
    var left;
    var right;
    var healthtextone;
    var healthtexttwo;
    var manaOne;
    var manaTwo;  
    var playerhealth = 100;
    var playertwohealth = 100;  
    var mOne = 0;
    var mTwo = 0;
    
    function create() 
    {
    	music = game.add.audio('music');
    	music.play();
     	game.physics.startSystem(Phaser.Physics.ARCADE);
     	game.add.sprite(0,0,'sky');
     	platforms = game.add.group();
     	platforms.enableBody = true;
     	var ground = platforms.create(0, game.world.height - 64, 'ground');
     	ground.scale.setTo(2,2);
     	ground.body.immovable = true;
     	var ledge = platforms.create(200,400,'ground');
     	ledge.body.immovable = true;
     	var anledge = platforms.create(400,250,'ground');
     	anledge.body.immovable = true;
        // Create a sprite at the center of the screen using the 'logo' image.
        player = game.add.sprite(32, game.world.height - 150, 'player' );
        playertwo = game.add.sprite(700, game.world.height - 150,'playertwo');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        player.anchor.setTo( 0.5, 0.5 );
        playertwo.anchor.setTo( 0.5, 0.5);
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        game.physics.enable( playertwo, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        playertwo.body.collideWorldBounds = true;
        
        player.body.gravity.y = 400;
        playertwo.body.gravity.y = 400;
        
        
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        
    	
    	healthtextone = game.add.text(16,16, 'Player One: 100',{ fontSize: '30px', fill: '#000'});
    	healthtexttwo = game.add.text(590,16, 'Player Two: 100',{ fontSize: '30px', fill: '#000'});
    	manaOne = game.add.text(16,50, 'Mana: 0',{ fontSize: '30px', fill: '#000'});
    	manaTwo = game.add.text(590,50, 'Mana: 0',{ fontSize: '30px', fill: '#000'});
    	
        
        
        cursors = game.input.keyboard.createCursorKeys();
        up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        stars = game.add.group();
 
    	stars.enableBody = true;
 		
    	
   		for (var i = 0; i < 12; i++)
    	{
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 65, 0, 'stars');
 		star.body.collideWorldBounds = true;
        
        star.body.gravity.y = 100;
 
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.6 + Math.random() * 0.3;
        star.body.bounce.x = 10 + Math.random() * 0.2;
    	}
    	
    	player.animations.add('dance',[1,2,3],10,true);
    	playertwo.animations.add('dance',[1,2,3],10,true);
    	
    	dance = game.input.keyboard.addKey(Phaser.Keyboard.M);
    	dancetwo = game.input.keyboard.addKey(Phaser.Keyboard.R);
    	
    	superone = game.add.group();
    	superone.enableBody = true;
    	supertwo = game.add.group();
    	supertwo.enableBody = true;
    	
       //end of create function
    }
    
    function update() 
    {
      game.physics.arcade.collide(player,platforms);
      game.physics.arcade.collide(playertwo,platforms);
      game.physics.arcade.collide(stars,platforms);
      //Check for mana get
      game.physics.arcade.overlap(player, stars, collectMana, null, this);
      game.physics.arcade.overlap(playertwo, stars, collectManatwo, null, this);
      game.physics.arcade.overlap(playertwo, superone,superOne,null,this);
      game.physics.arcade.overlap(player, supertwo,superTwo,null,this);
       //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    playertwo.body.velocity.x = 0;
 
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
 
        
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
 
        
    }
    else if (dance.isDown)
    {
    player.animations.play('dance');
    if(mOne >= 100 && bool != 1)
    {
    var sOne = superone.create(30+Math.random()*650, game.world.height - 300,'LazerKittenBox');
    sOne.collideWorldBounds = true;
	sOne.anchor.setTo( 0.5, 0.5 );
	bool = 1;
    }
    }
    else
    {
        //  Stand still
        player.animations.stop();
 
        player.frame = 0;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    //Player two stuff.
    if (right.isDown)
    {
    playertwo.body.velocity.x = 150;
    }
    else if (left.isDown)
    {
    playertwo.body.velocity.x = -150;
    }
    else if(dancetwo.isDown)
    {
    	playertwo.animations.play('dance');
    	if(mTwo >= 100 && booltwo != 1)
    	{
    	var sTwo = supertwo.create(30+Math.random()*650, game.world.height - 300,'DerpMeteor');
    	sTwo.collideWorldBounds = true;
		sTwo.anchor.setTo( 0.5, 0.5 );
		booltwo = 1;
    	}
    }
    else
    {
    playertwo.animations.stop();
    
    playertwo.frame = 0;
    }
    if(up.isDown && playertwo.body.touching.down)
    {
    	playertwo.body.velocity.y = -350;
    }
    
    //end of update function
    }
    
   
    
  
 	//End of everything
};
