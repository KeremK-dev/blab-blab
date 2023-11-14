const canvas = document.getElementById("canvas")
const btnreset = document.getElementById("loklok")
const skorspan = document.getElementById("skor")
const ctx = canvas.getContext("2d")
const o_alani =  550
const a_plan = ctx.createLinearGradient(0,0,500,0)
a_plan.addColorStop(0,"#1705e3")
a_plan.addColorStop(0.3,"#0291be")
a_plan.addColorStop(1,"#00ff77") //"linear-gradient(90deg, rgba(23,5,227,1) 0%, rgba(2,145,190,1) 35%, rgba(0,255,119,1) 100%)" 
const y_renk = "lightgreen"
const y_kelle = "#99ff00"
const y_cerceve = "black"
const elma = "red"
const elma2 = "yellow"
const elma3 = "green"
const kare_boy = 25
let hiz=100
let calisiyormi = false
let x_baslangic = kare_boy
let y_baslangic = 0
let elmaX,elmaY,elmaX2,elmaY2,bombaX,bombaY,elmaX3,elmaY3
let skor = 0
let bomba_renk = "black"
let yilan = [
    {
        x:kare_boy*4,y:0
    },
    {
        x:kare_boy*3,y:0

    },
    {
        x:kare_boy*2,y:0
    },
    {
        x:kare_boy*1,y:0
    },
    {
        x:0,y:0
    },

]
window.addEventListener("keydown",yonDegis)
btnreset.addEventListener("click",sifirla)

basla()

function basla()
{
    calisiyormi = true
    skorspan.textContent = skor
    elma_yap()
    bomba()
    Selma_yap()
    elma_ciz()
    interwal()

    renk()

}
function renk()
{
    setTimeout(() => {
        if (bomba_renk=="black")bomba_renk = "orange"
        else bomba_renk = "black"
        renk()  
    }, 1000);
}
function interwal()
{
    if (calisiyormi)
    {
        setTimeout(()=>{
            clear()
            elma_ciz()
            Selma_ciz()
            bomba_ciz()

            hareket()
            y_ciz()
            kontrol()
            elma3_ciz()
            interwal()

        },hiz)

    }
    else(game_over())

}
function yesil()
{
    setTimeout(() => {
        elma3_yap()
        yesil()

    }, 1000);
}


function bomba()
{
    setTimeout(()=>{
        bomba_yap()
        clearTimeout()
        bomba()
    },6000)

}
function clear()
{
    ctx.fillStyle = a_plan
    ctx.fillRect(0,0,o_alani,o_alani)

}
function elma_yap()
{
    function random_elma(max,min)
    {
        const rastnum=Math.round((Math.random()*(max-min)+min)/kare_boy)*kare_boy
        return rastnum
    }
    elmaX=random_elma(0,o_alani-kare_boy)
    elmaY=random_elma(0,o_alani-kare_boy)
}
function elma_ciz()
{
    ctx.fillStyle = elma
    ctx.fillRect(elmaX,elmaY,kare_boy,kare_boy)
}
function hareket()
{
    const kelle = {x:yilan[0].x+x_baslangic, y:yilan[0].y+y_baslangic}
    yilan.unshift(kelle)
    if(yilan[0].x==elmaX&&yilan[0].y==elmaY)
    {
        skor+=1
        skorspan.textContent=skor
        elma_yap()
    }else if(yilan[0].x==elmaX2&&yilan[0].y==elmaY2)
    {
        skor+=3
        hiz-=5
        skorspan.textContent=skor
        Selma_yap()
    }else if(yilan[0].x==bombaX&&yilan[0].y==bombaY){
        game_over()
    }else if(yilan[0].x==elmaX3&&yilan[0].y==elmaY3)
    {
        skor-=5
        hiz+=10
        skorspan.textContent=skor
        elmaX3 = -100
        elmaY3 = -100

    }
    else{yilan.pop()}
}
function y_ciz()
{
    ctx.fillStyle = y_renk
    ctx.strokeStyle = y_cerceve
    yilan.forEach(yParca => {
        ctx.fillRect(yParca.x,yParca.y,kare_boy,kare_boy)
        ctx.strokeRect(yParca.x,yParca.y,kare_boy,kare_boy)

    })
    ctx.fillRect(yilan[0].x,yilan[0].y,kare_boy,kare_boy)
    ctx.strokeRect(yilan[0].x,yilan[0].y,kare_boy,kare_boy)
    
}
function yonDegis(event)
{
    const tiklanan = event.keyCode
    const sol = 37
    const app = 38
    const left = 39
    const asa = 40

    const yukaiya = (y_baslangic == -kare_boy)
    const asaga = (y_baslangic == kare_boy)
    const saga = (x_baslangic == kare_boy)
    const sola = (x_baslangic== -kare_boy)
    switch(true)
    {
        case (tiklanan == sol && !saga):
            x_baslangic = -kare_boy
            y_baslangic = 0
            break
        case(tiklanan==app && !asaga):
            x_baslangic= 0
            y_baslangic = -kare_boy
            break
        case(tiklanan == left && !sola):
            x_baslangic = kare_boy
            y_baslangic = 0
            break
        case(tiklanan == asa && !yukaiya):
            x_baslangic = 0
            y_baslangic = kare_boy
            break
    }
}
function kontrol()
{
    switch(true)
    {
        case(yilan[0].x<0):
            calisiyormi = false
            break
        case(yilan[0].x>=o_alani):
            calisiyormi = false
            break
        case(yilan[0].y<0):
            calisiyormi = false
            break
        case(yilan[0].y>=o_alani):
            calisiyormi = false
            break
    }
    for (let i = 1; i < yilan.length; i++) {
        if(yilan[i].x==yilan[0].x && yilan[i].y==yilan[0].y)
        {
            calisiyormi = false
        }
    }
}
function game_over()
{
    ctx.font = "50px MV Boli"
    ctx.fillStyle = "red"
    ctx.textAling = "center"
    ctx.fillText("Oyun Bitti", o_alani/4,o_alani/2)
    calisiyormi=false
}
function sifirla()
{
    skor=0
    x_baslangic=kare_boy
    y_baslangic=0
    hiz=100
    yilan = [
    {
        x:kare_boy*4,y:0
    },
    {
        x:kare_boy*3,y:0

    },
    {
        x:kare_boy*2,y:0
    },
    {
        x:kare_boy*1,y:0
    },
    {
        x:0,y:0
    }]
    basla()
}


function Selma_yap()
{
    function Srandom_elma(max,min)
    {
        const rastnum=Math.round((Math.random()*(max-min)+min)/kare_boy)*kare_boy
        return rastnum
    }
    elmaX2=Srandom_elma(0,o_alani-kare_boy)
    elmaY2=Srandom_elma(0,o_alani-kare_boy)
}
function Selma_ciz()
{
    ctx.fillStyle = elma2
    ctx.fillRect(elmaX2,elmaY2,kare_boy,kare_boy)
}

function bomba_yap()
{
    function Srandom_elma(max,min)
    {
        const rastnum=Math.round((Math.random()*(max-min)+min)/kare_boy)*kare_boy
        return rastnum
    }
    bombaX=Srandom_elma(0,o_alani-kare_boy)
    bombaY=Srandom_elma(0,o_alani-kare_boy)
    yilan.forEach(yParca => {
        if
        (
            bombaX == yParca.x && bombaY == yParca.y
        )
{
    bombaX=Srandom_elma(0,o_alani-kare_boy)
    bombaY=Srandom_elma(0,o_alani-kare_boy)
}
})
}
function bomba_ciz()
{
    ctx.fillStyle = "black"
    ctx.fillRect(bombaX,bombaY,kare_boy,kare_boy)
}


function elma3_yap()
{
    function Srandom_elma(max,min)
    {
        const rastnum=Math.round((Math.random()*(max-min)+min)/kare_boy)*kare_boy
        return rastnum
    }
    elmaX3=Srandom_elma(0,o_alani-kare_boy)
    elmaY3=Srandom_elma(0,o_alani-kare_boy)
    yilan.forEach(yParca => {
        if
        (
            elmaX3 == yParca.x && elmaY3 == yParca.y
        )
{
    elmaX3=Srandom_elma(0,o_alani-kare_boy)
    elmaY3=Srandom_elma(0,o_alani-kare_boy)
}
})
}
function elma3_ciz()
{
    ctx.fillStyle = elma3
    ctx.fillRect(elmaX3,elmaY3,kare_boy,kare_boy)
}