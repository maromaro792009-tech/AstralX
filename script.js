const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
const testBox = document.querySelector(".box")
const score = document.querySelector(".score")
const square = {
    x: 90,
    y: 530,
    width: 100,
    height: 105
}
let enemies = [
    {
    x: 1400,
    y: 220,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 220,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 410,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 410,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 600,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 600,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 790,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 790,
    width: 150,
    height: 105,
    hp: 10
    }
]

function nextWave() {
    enemies = [
    {
    x: 1400,
    y: 220,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 220,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 410,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 410,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 600,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 600,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1400,
    y: 790,
    width: 150,
    height: 105,
    hp: 10
    },
    {
    x: 1650,
    y: 790,
    width: 150,
    height: 105,
    hp: 10
    }
]

enemies.forEach(enemy => {
    ctx.drawImage(spaceInvader, enemy.x, enemy.y, enemy.width, enemy.height)
})
}
let started = false
const GAME_WIDTH = 1920
const GAME_HEIGHT = 1080
canvas.width = GAME_WIDTH
canvas.height = GAME_HEIGHT
function resize() {
    const scale = Math.min(
        window.innerWidth / GAME_WIDTH,
        window.innerHeight / GAME_HEIGHT
    )

    canvas.style.width = `${GAME_WIDTH * scale}px`
    canvas.style.height = `${GAME_HEIGHT * scale}px`
    if (window.innerWidth <= 580) {
        document.querySelector(".no-portrait").classList.add("applied")
    } else {
        document.querySelector(".no-portrait").classList.remove("applied")
    }
}

resize()
window.addEventListener('resize', resize)



const spaceship = new Image()
spaceship.src = "sprites/spaceships/spaceship2.png"
const laser = new Image()
laser.src = "sprites/bullets/bullet.png"
const spaceInvader = new Image()
spaceInvader.src = "sprites/enemies/spaceinvader.png"
const enemyBulletTexture = new Image()
enemyBulletTexture.src = "sprites/bullets/enemybullet.png"
let movingRight = false
let movingLeft = false
let movingUp = false
let movingDown = false
let velocityX = 8
let velocityY = 8
const levelScore = document.querySelector(".lvl-score")
let levelXP = 0
const hpPoints = document.querySelector(".hp-points")
const hpBar = document.querySelector(".hp-xp")

function collision(a, b) {
    return (a.x < b.x + b.width &&
        a.x + b.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y)
}

function youSerious() {
    hpPoints.textContent = Number(hpPoints.textContent) - 1
    hpBar.style.transform = `translateX(calc(-100% + ${Number(hpPoints.textContent) * 5}%))`
}
function playerMovement() {
    let oldX = square.x
    let oldY = square.y
    if ((square.x <= canvas.width - square.width) && (square.x >= 0) && (square.y >= 0) && (square.y <= canvas.height - square.height)) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (movingRight) {
        square.x += velocityX
        enemies.forEach(enemy => {
        if (collision(square, enemy)) {
            youSerious()
            square.x = oldX
        } if (collision(square, enemy)) {
            square.y = oldY
        }
    })
    } 
    if (movingLeft) {
        square.x -= velocityX
        enemies.forEach(enemy => {
        if (collision(square, enemy)) {
            square.x = oldX
            youSerious()
        } if (collision(square, enemy)) {
            square.y = oldY
        }
    })
    }
    if (movingUp) {
        square.y -= velocityY
        enemies.forEach(enemy => {
        if (collision(square, enemy)) {
            square.x = oldX
            youSerious()
        } if (collision(square, enemy)) {
            square.y = oldY
        }
    })
    }
    if (movingDown) {
        square.y += velocityY
        enemies.forEach(enemy => {
        if (collision(square, enemy)) {
            square.x = oldX
            youSerious()
        } if (collision(square, enemy)) {
            square.y = oldY
        }
    })
    }
    } else if ((square.x >= canvas.width - square.width)) {
    if (movingLeft) {
        square.x -= velocityX
    } 
    if (square.y >= 0 && movingUp) {
        square.y -= velocityY
     }
     if ((square.y <= canvas.height - square.height) && movingDown) {
        square.y += velocityY
    }
    } else if ((square.x <= 0)) {
        if (movingRight) {
        square.x += velocityX
    } if (square.y >= 0 && movingUp) {
        square.y -= velocityY
     }
     if ((square.y <= canvas.height - square.height) && movingDown) {
        square.y += velocityY
    }
    } else if (square.y <= 0) {
        if (movingDown) {
            square.y += velocityY
        } if (movingRight) {
        square.x += velocityX
    } 
    if (movingLeft) {
        square.x -= velocityX
    }
    } else if ((square.y >= canvas.height - square.height)) {
        if (movingUp) {
            square.y -= velocityY
        }
     if (movingRight) {
        square.x += velocityX
    } 
    if (movingLeft) {
        square.x -= velocityX
    }
}
}
let enemyBullets = []
let powerUps = []
let particles = []
enemies.forEach(enemy => {
  enemyBullets = []
  powerUps = []
  particles = []
})
let bullets = []

const superBullet = new Image()
superBullet.src = "sprites/bullets/superbullet.png"
function shootingMechanic() {
    bullets.forEach(bullet => {
        bullet.x += 11
        if (levelScore.textContent >= 15) {
        ctx.drawImage(superBullet, bullet.x, bullet.y, bullet.width, bullet.height)
        } else if (levelScore.textContent >= 1) {
        ctx.drawImage(laser, bullet.x, bullet.y, bullet.width, bullet.height)
        }
    })
    bullets = bullets.filter(one => one.x < canvas.width)
}
const enemyShoot = new Audio("sfx/enemyshoot.mp3")
function enemiesShooting(enemy) {
    if (Math.random() < 0.01) {
        enemyShoot.play()
            enemyBullets.push({
                x: enemy.x + enemy.width - 55,
                y: enemy.y + enemy.height / 2 - 15,
                width: 55,
                height: 30
            })
        }
}
let wave = 2
let cooldown = 120
const xp = document.querySelector(".xp")
const enemyDamage = new Audio("sfx/enemydamage.mp3")
const enemyDeathSfx = new Audio("sfx/enemydeathsfx.mp3")
const shipDamage = new Audio("sfx/shipdamage.mp3")

const healPotion = new Image()
healPotion.src = "sprites/loots/healpotion.png"
const xpPotion = new Image()
xpPotion.src = "sprites/loots/xppotion.png"
const smallCoin = new Image()
smallCoin.src = "sprites/loots/smallcoin.png"
const mediumCoin = new Image()
mediumCoin.src = "sprites/loots/mediumcoin.png"
function enemyLoots(enemy) {
    if (Math.floor(Math.random() * 5) == 1) {
        powerUps.push({
            x: enemy.x + enemy.width - 35,
            y: enemy.y + enemy.height / 2 - 7.5,
            width: 50,
            height: 55,
            healPotion: true
        })
    }
    if (Math.floor(Math.random() * 5) == 1) {
        powerUps.push({
            x: enemy.x + enemy.width - 35,
            y: enemy.y + enemy.height / 2 - 7.5,
            width: 40,
            height: 55,
            xpPotion: true
        })
    }
    if (Math.floor(Math.random() * 3) <= 1) {
        powerUps.push({
            x: enemy.x + enemy.width - 35,
            y: enemy.y + enemy.height / 2 - 7.5,
            width: 35,
            height: 35,
            smallCoin: true
        })
    }
    if (Math.floor(Math.random() * 5) <= 1) {
        powerUps.push({
            x: enemy.x + enemy.width - 35,
            y: enemy.y + enemy.height / 2 - 7.5,
            width: 40,
            height: 40,
            mediumCoin: true
        })
    }
}

function fireParticlesShow(enemy) {
    for (let i = 0; i < 10; i++) {
    particles.push({
            x: enemy.x - 3,
            y: enemy.y + enemy.height / 2 + 4,
            size: 15,
            pathX: Math.random() * 8 - 3,
            pathY: Math.random() * 8 - 3,
            duration: 30
        })
    }
}
function enemyDeathParticlesShow(enemy) {
    for (let i = 0; i < 10; i++) {
    particles.push({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            size: 8,
            pathX: Math.random() * 8 - 3,
            pathY: Math.random() * 8 - 3,
            duration: 60,
            death: true
        })
    }
}
function gameOverParticlesShow() {
    for (let i = 0; i < 20; i++) {
    particles.push({
            x: square.x + square.width / 2,
            y: square.y + square.height / 2,
            size: 8,
            pathX: Math.random() * 8 - 3,
            pathY: Math.random() * 8 - 3,
            duration: 140,
            time: 30,
            playerDeath: true
        })
    }
}

const itemPickup = new Audio("sfx/itempickup.mp3")
const itemPickup2 = new Audio("sfx/coinpickup.mp3")
const redSparkles = new Image()
redSparkles.src = "sprites/effects/redsparkles.png"
const blueSparkles = new Image()
blueSparkles.src = "sprites/effects/bluesparkles.png"
function enemyFunctions() {
    bullets.forEach(bullet => {
       enemies.forEach(enemy => {
        if (collision(bullet, enemy)) {
            enemyDamage.play()
            fireParticlesShow(enemy)
            score.textContent = Number(score.textContent) + 1
            if (levelScore.textContent >= 15) {
                enemy.hp -= 4
            } else if (levelScore.textContent >= 8) {
                enemy.hp -= 3
            } else if (levelScore.textContent >= 4) {
                enemy.hp -= 2
            } else if (levelScore.textContent >= 1) {
                enemy.hp -= 1
            }
            bullets = bullets.filter(one => !collision(one, enemy))
            if (enemy.hp <= 0) {
                enemyDeathSfx.currentTime = 0
                enemyLoots(enemy)
                enemyDeathParticlesShow(enemy)
                score.textContent = Number(score.textContent) + 10
                levelXP += 20
                xp.style.transform = `translateX(calc(-100% + ${levelXP}%))`
                enemyDeathSfx.play()
            }
        }
       })
    })

    // powerups domain
    powerUps.forEach(powerUp => {
        if (powerUp.healPotion) {
        powerUp.x -= 7
        ctx.drawImage(healPotion, powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        }
        if (collision(powerUp, square) && powerUp.healPotion) {
            itemPickup.currentTime = 0
            if (hpPoints.textContent <= 19) {
                hpPoints.textContent = Number(hpPoints.textContent) + 1
                hpBar.style.transform = `translateX(calc(-100% + ${Number(hpPoints.textContent) * 5}%))`
                //itemPickup.play()
            }
            itemPickup.play()
        }
        if (powerUp.xpPotion) {
            powerUp.x -= 8
            ctx.drawImage(xpPotion, powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        }
        if (collision(powerUp, square) && powerUp.xpPotion) {
            itemPickup.currentTime = 0
            levelXP += 50
            xp.style.transform = `translateX(calc(-100% + ${levelXP}%))`
            itemPickup.play()
        }
        if (powerUp.smallCoin) {
            powerUp.x -= 5
            ctx.drawImage(smallCoin, powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        } if (collision(powerUp, square) && powerUp.smallCoin) {
            itemPickup2.currentTime = 0
            score.textContent = Number(score.textContent) + 50
            itemPickup2.play()
        }
        if (powerUp.mediumCoin) {
            powerUp.x -= 5.3
            ctx.drawImage(mediumCoin, powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        } if (collision(powerUp, square) && powerUp.mediumCoin) {
            itemPickup2.currentTime = 0
            score.textContent = Number(score.textContent) + 250
            itemPickup2.play()
        }
        powerUps = powerUps.filter(one => !collision(one, square))
    })
    powerUps = powerUps.filter(one => one.x > 0)
    // powerups domain

    enemies.forEach(enemy => {
       enemiesShooting(enemy)
    })
    enemyBullets.forEach(enemyBullet => {
                enemyBullet.x -= 14
                ctx.drawImage(enemyBulletTexture, enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height)
                enemyBullets = enemyBullets.filter(one => one.x > 0)
                if (collision(enemyBullet, square)) {
                    shipDamage.currentTime = 0
                    hpPoints.textContent = Number(hpPoints.textContent) - 3
                    hpBar.style.transform = `translateX(calc(-100% + ${Number(hpPoints.textContent) * 5}%))`
                    enemyBullets = enemyBullets.filter(one => !collision(one, square))
                    shipDamage.play()
                }
            })
            if (enemies.every(one => one.hp <= 0)) {
                cooldown -= 1
                testBox.textContent = `You won! Wave ${wave} is coming`
                if (cooldown <= 0) {
                testBox.textContent = ""
                nextWave()
                cooldown = 120
                wave += 1
                }
            }
            particles.forEach(particle => {
                particle.x -= particle.pathX
                particle.y -= particle.pathY
                if (particle.death) {
                    ctx.fillStyle = "black"
                    ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
                } else if (particle.playerDeath) {
                    ctx.fillStyle = "black"
                    ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
                } else if (levelScore.textContent >= 15) {
                ctx.drawImage(blueSparkles, particle.x, particle.y, particle.size, particle.size)
                } else {
                ctx.drawImage(redSparkles, particle.x, particle.y, particle.size, particle.size)
                }
                particle.duration -= 1
            })
particles = particles.filter(particle => particle.duration > 0)
enemies = enemies.filter(one => one.hp > 0)
}
const gameOverSfx = new Audio ("sfx/gameOver.wav")
const backgroundMusic = new Audio("music/backgroundmusic.mp3")
const backgroundMusic2 = new Audio("music/backgroundmusic2.mp3")
let deathNotifier = true
let pause = false
function gameMechanics() {
    if (levelXP >= 100) {
        levelUp.currentTime = 0
        xp.style.transform = `translateX(-100%)`
        levelUp.play()
        levelScore.textContent = Number(levelScore.textContent) + 1
        levelXP = 0
    }
    if (levelScore.textContent >= 15 && deathNotifier) {
        backgroundMusic2.play()
        backgroundMusic.pause()
        backgroundMusic.currentTime = 0
    } else if (levelScore.textContent >= 1 && deathNotifier) {
        backgroundMusic.play()
    }
    if (hpPoints.textContent <= 0) {
        if (deathNotifier) {
        gameOverParticlesShow()
        gameOverSfx.play()
        }
        backgroundMusic2.pause()
        backgroundMusic.pause()
        ctx.clearRect(square.x, square.y, square.width, square.height)
        square.width = 0
        square.height = 0
        testBox.textContent = "Game Over"
        deathNotifier = false
    }
}
const spaceship2 = new Image()
spaceship2.src = "sprites/spaceships/spaceship3.png"
const xPos = document.querySelector(".x-pos")
const yPos = document.querySelector(".y-pos")
const levelUp = new Audio("sfx/levelup.mp3")
let gameOver = false

function animate() {
    if (gameOver) return
    playerMovement()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    enemies.forEach(enemy => {
    ctx.drawImage(spaceInvader, enemy.x, enemy.y, enemy.width, enemy.height)
    })
    if (levelScore.textContent >= 15) {
    ctx.drawImage(spaceship2, square.x, square.y, square.width, square.height)
    velocityX = 9
    velocityY = 9
    } else if (levelScore.textContent >= 1) {
    ctx.drawImage(spaceship, square.x, square.y, square.width, square.height)
    }
    enemyFunctions()
    shootingMechanic()
    gameMechanics()
    xPos.textContent = square.x
    yPos.textContent = square.y
    requestAnimationFrame(animate)
}
const shootSfx = new Audio("sfx/shoot.mp3")
const pauseArea = document.querySelector(".dark-area")
let clicked = false
document.addEventListener("keydown", (e) => {
    if (started) {
    if (e.key == "d") {
        movingRight = true
        movingLeft = false
    } if (e.key == "a") {
        movingLeft = true
        movingRight = false
    }  if (e.key == "w") {
        movingUp = true
        movingDown = false
    } if (e.key == "s") {
        movingDown = true
        movingUp = false
    } if (e.key == " ") {
        if (!clicked) {
        clicked = true
        shootSfx.currentTime = 0
        bullets.push({
        width: 100,
        height: 40,
        x: square.x + square.width - 100,
        y: square.y + square.height / 2 - 20
        })
        shootSfx.play()
        setTimeout(() => {
            clicked = false
        }, 90)
    }
    } if (e.key == "Escape") {
        pauseArea.classList.toggle("pause")
        if (!pause) {
            gameOver = true
            backgroundMusic.pause()
            backgroundMusic2.pause()
        } else {
            gameOver = false
            animate()
        }
        pause = !pause
    }
}
})
document.addEventListener("keyup", (e) => {
    if (e.key == "d") {
        movingRight = false
    } if (e.key == "a") {
        movingLeft = false
    } if (e.key == "w") {
        movingUp = false
    } if (e.key == "s") {
        movingDown = false
    }
})
let countdown = 3
let timer
const logo = document.querySelector(".logo")
logo.addEventListener("animationend", () => {
    logo.style.transform = "translateY(0)"
}, {once: true})
const gameBody = document.querySelector(".orientation")
const clickBtn = document.querySelector(".click")
let startup = true
gameBody.addEventListener("click", () => {
    logo.style.transform = "translateY(-100%)"
    clickBtn.style.display = "none"
    document.querySelector(".game-start").classList.add("appear")
    document.querySelector(".player-input").classList.add("appear")
    document.querySelector(".name-input").classList.add("appear")
    if (startup) {
        new Audio("sfx/startupsound.mp3").play()
        startup = false
    }
})
const nameDisplayer = document.querySelector(".player-name")
const enterBtn = document.querySelector(".game-start")
const nameInput = document.querySelector(".name-input")
enterBtn.addEventListener("click", () => {
    if (nameInput.value.trim() === "") return
    if (window.innerWidth <= 580) return
    nameDisplayer.textContent = nameInput.value
    document.querySelector(".upper-header").classList.add("start")
    document.querySelector(".lower-header").classList.add("start")
    gameBody.style.display = "none"
    testBox.textContent = countdown
    timer = setInterval(() => {
        countdown -= 1
        testBox.textContent = countdown
        if (countdown == 0) {
            testBox.textContent = ""
            clearInterval(timer)
            timer = null
            gameOver = false
            square.width = 100
            square.height = 105
            square.x = 90
            square.y = 530
            animate()
            nextWave()
            started = true
        }
    }, 1000)
})
const continuebtn = document.querySelector(".continue")
continuebtn.addEventListener("click", () => {
    pauseArea.classList.remove("pause")
    gameOver = false
    animate()
    pause = !pause
})
let trueReset = 7
let reset

function reseting() {
    document.querySelector(".upper-transition").classList.remove("head")
    document.querySelector(".lower-transition").classList.remove("head")
    levelScore.textContent = 1
    score.textContent = 0
    hpPoints.textContent = 20
    hpBar.style.transform = "translateX(0)"
    xp.style.transform = "translateX(-100%)"
    gameOver = true
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.querySelector(".upper-header").classList.remove("start")
    document.querySelector(".lower-header").classList.remove("start")
    testBox.textContent = ""
    gameBody.style.display = "flex"
    backgroundMusic.currentTime = 0
    backgroundMusic2.currentTime = 0
    levelXP = 0
    countdown = 3
    deathNotifier = true
    nameInput.value = ""
    xPos.textContent = ""
    yPos.textContent = ""
    wave = 2
    enemyBullets.splice(0, enemyBullets.length)
    powerUps.splice(0, powerUps.length)
    bullets.splice(0, bullets.length)
    particles.splice(0, particles.length)
}
const observer = new MutationObserver(() => {
    if (hpPoints.textContent <= 0) {
        square.x = 0
        square.y = 0
        started = false
        reset = setInterval(() => {
            trueReset -= 1
            if (trueReset == 1) {
                document.querySelector(".upper-transition").classList.add("head")
                document.querySelector(".lower-transition").classList.add("head")
            }
            else if (trueReset == 0) {
                clearInterval(reset)
                reset = null
                trueReset = 6
                reseting()
            }
        }, 1000)
    }
})
observer.observe(hpPoints, {
    subtree: true,
    childList: true,
    characterData: true
})
let trueReset2 = 1
let reset2
document.querySelector(".logo").style.transform = "translateY(0)"
document.querySelector(".main-screen").addEventListener("click", () => {
    document.querySelector(".upper-transition").classList.add("head")
    document.querySelector(".lower-transition").classList.add("head")
    reset2 = setInterval(() => {
        trueReset2 -= 1
        if (trueReset2 == 0) {
            clearInterval(reset2)
            reset2 = null
            started = false
            pauseArea.classList.remove("pause")
            reseting()
            trueReset2 = 2
            pause = !pause
        }
    }, 1000)
})
document.querySelector(".game-controller").addEventListener("touchstart", (e) => {
    if (e.target.closest(".top-right")) {
        movingUp = true
        movingRight = true
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".top-left")) {
        movingUp = true
        movingRight = false
        movingLeft = true
        movingDown = false
    }
    if (e.target.closest(".top")) {
        movingUp = true
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".left")) {
        movingUp = false
        movingRight = false
        movingLeft = true
        movingDown = false
    }
    if (e.target.closest(".right")) {
        movingUp = false
        movingRight = true
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".bottom")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = true
    }
    if (e.target.closest(".bottom-right")) {
        movingUp = false
        movingRight = true
        movingLeft = false
        movingDown = true
    }
    if (e.target.closest(".bottom-left")) {
        movingUp = false
        movingRight = false
        movingLeft = true
        movingDown = true
    }
})
document.querySelector(".game-controller").addEventListener("touchend", (e) => {
    if (e.target.closest(".top-right")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".top-left")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".top")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".left")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".right")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".bottom")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".bottom-right")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
    if (e.target.closest(".bottom-left")) {
        movingUp = false
        movingRight = false
        movingLeft = false
        movingDown = false
    }
})
document.querySelector(".shooting-area").addEventListener("touchstart", () => {
    if (!clicked) {
        clicked = true
        shootSfx.currentTime = 0
        bullets.push({
        width: 100,
        height: 40,
        x: square.x + square.width - 100,
        y: square.y + square.height / 2 - 20
        })
        shootSfx.play()
        setTimeout(() => {
            clicked = false
        }, 90)
    }
})
const gameControllerObserver = new MutationObserver(() => {
    if (window.innerWidth <= 1000 && started) {
        document.querySelector(".game-controller").classList.add("go")
        document.querySelector(".shooting-area").classList.add("go")
        document.querySelector(".pause-for-phones").classList.add("go")
    } else {
        document.querySelector(".game-controller").classList.remove("go")
        document.querySelector(".shooting-area").classList.remove("go")
        document.querySelector(".pause-for-phones").classList.remove("go")
    }
})
gameControllerObserver.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true
})
document.querySelector(".pause-for-phones").addEventListener("click", () => {
     pauseArea.classList.toggle("pause")
        if (!pause) {
            gameOver = true
            backgroundMusic.pause()
            backgroundMusic2.pause()
        } else {
            gameOver = false
            animate()
        }
        pause = !pause
})