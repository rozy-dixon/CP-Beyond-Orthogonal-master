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