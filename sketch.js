const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var ground;
var corda;
var bala;

var ligacao;

var botao;

var balaimg, omnom, omnomc, omnomnormal, omnomt;

function preload()
{
  balaimg = loadImage("bala.png");

  omnomnormal = loadAnimation("omnom.png");

  omnomc = loadAnimation("omnom2.png");

  omnomt = loadAnimation("triste2.png");
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;


  botao = createImg("botao.png");
  botao.position(223,20);
  botao.size(65,65);
  botao.mouseClicked(cortarcorda);

  

  ground = new Ground(200,680,600,20);
  corda = new Rope(10,{x:250, y:20});
  
  var bala_options = 
  {
    density: 0.001
  }
  
  bala = Bodies.circle(250,255,20, bala_options);

  Matter.Composite.add(corda.body, bala);

  ligacao = new Link(corda, bala);

  //criar o sprite  omnom
  omnom = createSprite(250, 620);
  omnom.addAnimation("normal", omnomnormal);
  omnom.addAnimation("comendo", omnomc);
  omnom.addAnimation("triste", omnomt);

  omnom.changeAnimation("normal");

  omnom.scale = 0.3;


  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  ground.show();
  corda.show();
  image(balaimg, bala.position.x, bala.position.y, 55, 55);

  Engine.update(engine);
  

  //bixinho comer
  if (colisao(bala, omnom) == true)
  {
    //trocar a animação
    omnom.changeAnimation("comendo");
  }

  //bala pode cair no chao, ele ficar triste
  if (colisao(bala, ground.body) == true)
  {
    omnom.changeAnimation("triste");
  }

 
  //aparecer todos os sprites
  drawSprites();
   
}


function cortarcorda()
{
  corda.break();
  ligacao.detach();
  ligacao = null;


}

//colisao entre corpo e sprite

function colisao(body, sprite)
{
  if (body !=null)
  {

    //distancia entre os dois objetos
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80)
    {
      World.remove(engine.world, bala);
      bala = null;
      return true;
    }
    else
    {
      return false
    }

  }

  
}