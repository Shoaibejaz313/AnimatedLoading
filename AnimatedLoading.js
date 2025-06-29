let canvs = document.querySelector("canvas");
let c = canvs.getContext("2d");


//set the size
canvs.width = window.innerWidth;
canvs.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvs.width = window.innerWidth;
    canvs.height = window.innerHeight;
})

let mouse = {
    x: 10,
    y: 10,
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})



let colorArray = [
    "#2596be",
    "#2e177d",
    "#5C177D",
    "#7D174B",
    "#2DCABD",
]




function randomfunc(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}



function Cirlce(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI*2;
    this.velocity = 0.05;
    this.distance = randomfunc(50,250);
    this.lastmouse = {x:x,y:y};

    this.updated = () => {
        const laspPostion = {
            x:this.x,
            y:this.y
        }
        
        this.radians += this.velocity;
        //drag 
        this.lastmouse.x += (mouse.x - this.lastmouse.x) * 0.05;
        this.lastmouse.y += (mouse.y - this.lastmouse.y) * 0.05;
        this.x = this.lastmouse.x + Math.cos(this.radians) * this.distance;
        this.y = this.lastmouse.y + Math.sin(this.radians) * this.distance;
        this.draw(laspPostion)
    }

    this.draw = laspPostion => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(laspPostion.x,laspPostion.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    }
}



let particles = [];
let x = 0;
let y = 0;
let color;
function init() {

    for (let i = 0; i < 50; i++) {
        x = randomfunc(canvs.width, 0);
        y = randomfunc(canvs.height, 0);
        color = colorArray[randomfunc(colorArray.length,0)];
        particles.push(new Cirlce(canvs.width/2, canvs.height/2, 8, color));
    }
}


init()








function animate() {
    requestAnimationFrame(animate);
    // c.clearRect(0, 0, canvs.width, canvs.height)
    c.fillStyle="rgba(255,255,255,0.05)";
    c.fillRect(0,0,canvs.width,canvs.height)

    for (let i = 0; i < particles.length; i++) {
        particles[i].updated();
    }

}
animate()



