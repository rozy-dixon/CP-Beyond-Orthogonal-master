class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        // create animation
        // I did what made sense to me to finish the idle and walk animations but it always goes to the down idle when it stops
        // so I think I did it wrong :/
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 4,
                end: 4
            })
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5
            })
        })
        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 7,
                end: 7
            })
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8
            })
        })
        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10
            })
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11
            })
        })
        // [ ] fill animations
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)

        this.player.body.setSize(32, 32).setOffset(8, 16)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'
        // handle left/right movement
        if (cursors.left.isDown) {
            playerVector.x = -1     //this.player.x -= this.PLAYER_VELOCITY
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1      //this.player.x += this.PLAYER_VELOCITY
            playerDirection = 'right'
        }
        // handle up/down movement
        if (cursors.up.isDown) {
            playerVector.y = -1     //this.player.y -= this.PLAYER_VELOCITY
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1      //this.player.y += this.PLAYER_VELOCITY
            playerDirection = 'down'
        }
        // handle normalize and vector
        playerVector.normalize()
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        //this.player.x += playerVector.x * this.PLAYER_VELOCITY
        //this.player.y += playerVector.y * this.PLAYER_VELOCITY

        // call animations
        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    }
}