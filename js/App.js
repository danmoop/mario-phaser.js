var mainState = {
    
    preload: function()
    {
        game.load.image('mario', 'images/mario.png');
        game.load.image('WallH', 'images/wallH.png');
        game.load.image('WallW', 'images/wallW.png');
        game.load.image('enemy', 'images/enemy.png');
        var spaceBar;
    },
    
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "3984db";
        game.physics.arcade.gravity.y = 1200;
        this.cursor = game.input.keyboard.createCursorKeys();

        this.mario = game.add.sprite((game.width / 2) + 77, game.height / 2, 'mario');
        this.mario.anchor.setTo(0.5,0.5);
        this.mario.scale.setTo(0.15,0.15);
        
        this.walls = game.add.group();
        this.walls.enableBody = true;
    
        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.downWallH = game.add.sprite(0, 540, 'WallH', 0, this.walls);
        this.UpWallH = game.add.sprite(0, 0, 'WallH', 0, this.walls);
        this.leftWallW = game.add.sprite(0,0, 'WallW', 0, this.walls);
        this.rightWallW = game.add.sprite(870,0, 'WallW', 0, this.walls);
        
        this.enemy = game.add.sprite(300,300, 'enemy'); // UNFORTUNATELY THIS ENEMY CAN GO THROUGH WALLS IDK HOW TO FIX IT
        this.enemy.scale.setTo(0.2,0.2);
        
        game.physics.arcade.enable([this.mario, this.enemy]);
        this.walls.setAll('body.allowGravity', false);
        this.walls.setAll('body.immovable', true);

        
        
    },
    
    update: function()
    {
        game.physics.arcade.collide(this.mario, this.walls);
        game.physics.arcade.collide(this.enemy, this.walls);
        
        if(this.cursor.left.isDown)
        {
            this.mario.x -=10;
            this.mario.scale.x = -0.15;
        }
        
        if(this.cursor.right.isDown)
        {
          
            this.mario.x +=10;
            this.mario.scale.x = 0.15;
        }
        
        if(this.cursor.up.isDown)
        {
            this.mario.body.velocity.y = -555;
        }
        
        if(this.spaceBar.isDown)
        {
            this.enemy = game.add.sprite(300,300, 'enemy');
            this.enemy.scale.setTo(0.2,0.2);
            game.physics.arcade.enable([this.enemy]);
        }
        
        
        game.physics.arcade.overlap(this.mario, this.enemy, this.KillEnemy, null, this);
        
        console.log("MARIO X: "+this.mario.x+" | "+this.mario.scale);
        console.log("ENEMY X: "+this.enemy.x+" | "+this.enemy.scale);
        console.log("MARIO Y: "+this.mario.y+" | "+this.mario.scale);
        console.log("ENEMY Y: "+this.enemy.y+" | "+this.enemy.scale);
        
        if(this.mario.x <=67) // THAT'S ALL HOW I CAN FIX NON-SOLID WALLS (RIGHT AND LEFT)  
        {
            this.mario.x = 67;
        }
        
        if(this.mario.x >=835)
        {
            this.mario.x = 835;
        }
    },
    
    KillEnemy: function()
    {
        if((this.mario.y) - 9 < this.enemy.y)
        {
            this.enemy.kill();
        }
        
        else
        {
            this.mario.kill();
            game.state.start('main');
        }
    }
}

var game = new Phaser.Game(900,600, Phaser.AUTO, 'canvasDiv');
game.state.add('main', mainState);
game.state.start('main');