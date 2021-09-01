console.log("Hello Chakana !!");
//Dates for anualized ret
var maturity = new Date("09/24/2021");

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January = 0!
var yyyy = today.getFullYear();

today = new Date(`${mm + '/' + dd + '/' + yyyy}`);

var diff = (maturity.getTime() - today.getTime())/(24*3600*1000);

//Days to maturity
console.log(diff);
let daysxx = document.querySelector(".daysxx");
daysxx.textContent += `${diff}`;

//First Crypto
let symb_btc = "btcusdt";
let symb_f_btc = "btcusd_210924";

let ws_btc = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_btc}@trade`);
let wsf_btc = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_btc}@markPrice`);


//spot in doc
let spot_btc = document.querySelector(".BTC .spot");
//future in doc
let fut_btc = document.querySelector(".BTC .future");
//Tasa in doc
let tasa_d_btc = document.querySelector(".BTC .tasa");
let tasa_a_btc= document.querySelector(".BTC .tasa1");

let futy_btc = [];
let spoty_btc = []; 
let spotter_btc = null;
let futter_btc = null;

async function f1(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_btc.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_btc.push(JSON.parse(spot_p));

        spotter_btc = spoty_btc[spoty_btc.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_btc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_btc.push(JSON.parse(fut_p));

        futter_btc = futy_btc[futy_btc.length-1];

        
        let tasa = futter_btc / spotter_btc -1;

        tasa_d_btc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;

        if(anual > 15){
            spot_btc.style.color = "rgb(197, 197, 197)";
            fut_btc.style.color = "rgb(197, 197, 197)";
            tasa_a_btc.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            tasa_a_btc.style.color = "rgb(255, 0, 34)";
        }

        spot_btc.innerText = parseFloat(spotter_btc).toFixed(2);
        fut_btc.innerText = parseFloat(futter_btc).toFixed(2);

        tasa_a_btc.innerHTML = `${anual.toFixed(3)}%`;
    }


}

f1();




//NEXT CRYPTO
let symb_eth = "ethusdt";
let symb_f_eth = "ethusd_210924";

let ws_eth = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_eth}@trade`);
let wsf_eth = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_eth}@markPrice`);


//spot in doc
let spot_eth = document.querySelector(".ETH .spot");
//future in doc
let fut_eth = document.querySelector(".ETH .future");
//Tasa in doc
let tasa_d_eth = document.querySelector(".ETH .tasa");
let tasa_a_eth = document.querySelector(".ETH .tasa1");

let futy_eth = [];
let spoty_eth = []; 
let spotter_eth = null;
let futter_eth = null;
let enviado = [];
async function f2(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_eth.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_eth.push(JSON.parse(spot_p));

        spotter_eth = spoty_eth[spoty_eth.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_eth.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_eth.push(JSON.parse(fut_p));

        futter_eth = futy_eth[futy_eth.length-1];

        
        let tasa = futter_eth / spotter_eth -1;

        tasa_d_eth.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;
        tasa_a_eth.innerHTML = `${anual.toFixed(3)}%`;

        if(anual > 15){
            fut_eth.style.color = "rgb(197, 197, 197)";
            spot_eth.style.color = "rgb(197, 197, 197)";
            tasa_a_eth.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            tasa_a_eth.style.color = "rgb(255, 0, 34)";
        }

        fut_eth.innerText = parseFloat(futter_eth).toFixed(2);
        spot_eth.innerText = parseFloat(spotter_eth).toFixed(2);

        tasa_a_eth.innerHTML = `${anual.toFixed(3)}%`;
        

        //E-MAIL NOTIFICATION
        if(futter_eth < spotter_eth && enviado.length == 0){
            //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

            //jmtp mail
            Email.send({
                SecureToken : "8c63b637-7fb4-4890-a902-d46695ed167a",
                To : ['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"],
                From : "jeronimoaisuru@gmail.com",
                Subject : "Avisoo ! ",
                Body : "El Futuro de ETH está debajo del SPOT, avisar a Jero / Nacho / el que esté disponible que salga de todas las posiciones de ETH !",
                Attachments : [
                {
                    name : "chakanaimggg.png",
                    path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                }]
            }).then(
            message => alert(message)
            );

            enviado += 1;
        }


    }


}

f2();





//NEXT CRYPTO
let symb_bnb = "bnbusdt";
let symb_f_bnb = "bnbusd_210924";

let ws_bnb = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_bnb}@trade`);
let wsf_bnb = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_bnb}@markPrice`);


//spot in doc
let spot_bnb = document.querySelector(".BNB .spot");
//future in doc
let fut_bnb = document.querySelector(".BNB .future");
//Tasa in doc
let tasa_d_bnb = document.querySelector(".BNB .tasa");
let tasa_a_bnb = document.querySelector(".BNB .tasa1");

let futy_bnb = [];
let spoty_bnb = []; 
let spotter_bnb = null;
let futter_bnb = null;

async function f3(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_bnb.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_bnb.push(JSON.parse(spot_p));

        spotter_bnb = spoty_bnb[spoty_bnb.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_bnb.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_bnb.push(JSON.parse(fut_p));

        futter_bnb = futy_bnb[futy_bnb.length-1];

        
        let tasa = futter_bnb / spotter_bnb -1;

        tasa_d_bnb.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;

        if(anual > 15){
            fut_bnb.style.color = "rgb(197, 197, 197)";
            spot_bnb.style.color = "rgb(197, 197, 197)";
            tasa_a_bnb.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            tasa_a_bnb.style.color = "rgb(255, 0, 34)";
        }

        fut_bnb.innerText = parseFloat(futter_bnb).toFixed(2);
        spot_bnb.innerText = parseFloat(spotter_bnb).toFixed(2);

        tasa_a_bnb.innerHTML = `${anual.toFixed(3)}%`;
    }


}

f3();





//NEXT CRYPTO
let symb_dot = "dotusdt";
let symb_f_dot = "dotusd_210924";

let ws_dot = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_dot}@trade`);
let wsf_dot = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_dot}@markPrice`);


//spot in doc
let spot_dot = document.querySelector(".DOT .spot");
//future in doc
let fut_dot = document.querySelector(".DOT .future");
//Tasa in doc
let tasa_d_dot = document.querySelector(".DOT .tasa");
let tasa_a_dot = document.querySelector(".DOT .tasa1");

let futy_dot = [];
let spoty_dot = []; 
let spotter_dot = null;
let futter_dot = null;

async function f4(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_dot.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_dot.push(JSON.parse(spot_p));

        spotter_dot = spoty_dot[spoty_dot.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_dot.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_dot.push(JSON.parse(fut_p));

        futter_dot = futy_dot[futy_dot.length-1];

        
        let tasa = futter_dot / spotter_dot -1;

        tasa_d_dot.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;

        if(anual > 15){
            fut_dot.style.color = "rgb(197, 197, 197)";
            spot_dot.style.color = "rgb(197, 197, 197)";
            tasa_a_dot.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){tasa_a_dot.style.color = "rgb(255, 0, 34)";}

        spot_dot.innerText = parseFloat(spotter_dot).toFixed(2);
        fut_dot.innerText = parseFloat(futter_dot).toFixed(2);

        tasa_a_dot.innerHTML = `${anual.toFixed(3)}%`;

    }


}

f4();







//NEXT CRYPTO
let symb_bch = "bchusdt";
let symb_f_bch = "bchusd_210924";

let ws_bch = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_bch}@trade`);
let wsf_bch = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_bch}@markPrice`); //@markPrice


//spot in doc
let spot_bch = document.querySelector(".BCH .spot");
//future in doc
let fut_bch = document.querySelector(".BCH .future");
//Tasa in doc
let tasa_d_bch = document.querySelector(".BCH .tasa");
let tasa_a_bch = document.querySelector(".BCH .tasa1");

let futy_bch = [];
let spoty_bch = []; 
let spotter_bch = null;
let futter_bch = null;

async function f5(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_bch.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_bch.push(JSON.parse(spot_p));

        spotter_bch = spoty_bch[spoty_bch.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_bch.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_bch.push(JSON.parse(fut_p));

        futter_bch = futy_bch[futy_bch.length-1];

        
        let tasa = futter_bch / spotter_bch -1;

        tasa_d_bch.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;

        if(anual > 15){
            fut_bch.style.color = "rgb(197, 197, 197)";
            spot_bch.style.color = "rgb(197, 197, 197)";
            tasa_a_bch.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            tasa_a_bch.style.color = "rgb(255, 0, 34)";
        }
        spot_bch.innerText = parseFloat(spotter_bch).toFixed(2);
        fut_bch.innerText = parseFloat(futter_bch).toFixed(2);

        tasa_a_bch.innerHTML = `${anual.toFixed(3)}%`;

    }


}

f5();



//NEXT CRYPTO
let symb_ada = "adausdt";
let symb_f_ada = "adausd_210924";

let ws_ada = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_ada}@trade`);
let wsf_ada = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_ada}@trade`);


//spot in doc
let spot_ada = document.querySelector(".ADA .spot");
//future in doc
let fut_ada = document.querySelector(".ADA .future");
//Tasa in doc
let tasa_d_ada = document.querySelector(".ADA .tasa");
let tasa_a_ada = document.querySelector(".ADA .tasa1");

let futy_ada = [];
let spoty_ada = []; 
let spotter_ada = null;
let futter_ada = null;

async function f6(){

    ////////////////SPOT call////////////////////////
    let promisespot = ws_ada.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_ada.push(JSON.parse(spot_p));

        spotter_ada = spoty_ada[spoty_ada.length-1];
    }


    ////////////////FUTURE call////////////////////////
    let promisefut = wsf_ada.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_ada.push(JSON.parse(fut_p));

        futter_ada = futy_ada[futy_ada.length-1];
        //console.log(fut_p);
        
        let tasa = futter_ada / spotter_ada -1;

        tasa_d_ada.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff)+1)**365)-1)*100;

        if(anual > 15){
            fut_ada.style.color = "rgb(197, 197, 197)";
            spot_ada.style.color = "rgb(197, 197, 197)";
            tasa_a_ada.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            tasa_a_ada.style.color = "rgb(255, 0, 34)";
    }
        spot_ada.innerText = parseFloat(spotter_ada).toFixed(2);
        fut_ada.innerText = parseFloat(futter_ada).toFixed(2);

        tasa_a_ada.innerHTML = `${anual.toFixed(3)}%`;

    }


}

f6();



/*
//ALERT & ALARMA

//alarm already preloaded in the html

var audio = new Audio("style/notif1.mp3");
console.log(spoty_btc[spoty_btc.length-1]);

setTimeout(function(){
    document.getElementById('audioxx').play();
    alert("Thank you!");
  }, 3000);


if((futter_btc/spotter_btc-1) > 0.001){
    audio.play();
    console.log("heyyyyy");
}
*/






// ALERT NOTIFICATIONS


//Cheking if the system supports notifications
/*
if (!("Notification" in window)) {
    console.log("Notifications are NOT allowed in this system !")
} else { console.log("Notifications are allowed in this system !")};



//Creating a desktop notification

function showNotification(){
    let notification = new Notification("Alerta de tasa!", {
        body: `${"crypto"} SUPERÓ EL 15%.`
    });
    console.log(notification);
}



// Allowing notifications
console.log(Notification.permission);
//Default = User not yet said yes / no.

if (Notification.permission ==="granted"){
    console.log("Permission to notify granted!");

    //SHOW MY NOTIFICATION
    showNotification();

} else if (Notification.permission !== "denied"){
    //if they are in default, we ask to allow notifications.
    Notification.requestPermission().then(permission =>{
        console.log(permission);

        if (permission ==="granted"){
            console.log("tuvieja");

            //SHOW MY NOTIFICATION
            showNotification();
        
        }

    });

}

//https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification





function notifyMe() {

    function notify() {
        var notification = new Notification('TITLE OF NOTIFICATION', {
          icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
          body: "Hey! You are on notice!",
        });
    
        notification.onclick = function () {
          window.open("http://carnes.cc");      
        };
        setTimeout(notification.close.bind(notification), 0); 
      }

      
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
      notify();
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            console.log("jerogay")
            notify();
        }
      });
    }
  
  }
  notifyMe();

  



*/

