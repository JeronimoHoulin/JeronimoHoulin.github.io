//Dates for anualized ret
var mat3m = "06/24/2022";
var mat6m = "09/30/2022";

let vency3m = document.querySelector(".contenedor3 .vencimiento");
let vency6m = document.querySelector(".contenedor5 .vencimiento");
vency3m.textContent += mat3m;
vency6m.textContent += mat6m;

let date1 = "220624";
let date2 = "220930"

var maturity3m = new Date(mat3m);
var maturity6m = new Date(mat6m);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January = 0!
var yyyy = today.getFullYear();

today = new Date(`${mm + '/' + dd + '/' + yyyy}`);

var diff3m = (maturity3m.getTime() - today.getTime())/(24*3600*1000);
var diff6m = (maturity6m.getTime() - today.getTime())/(24*3600*1000);

//Days to maturity
console.log(diff3m);
console.log(diff6m);

let days3m = document.querySelector(".days3m");  //los de dic 2021
days3m.textContent += `${diff3m}`;
let days6m = document.querySelector(".days6m"); // los de marxo 2022
days6m.textContent += `${diff6m}`;


//Notify me when direct rate is larger than: 
let notify1 = 18;//NOF
//when to re send (%) Si cayó 70% la tasa, volver a habilitar el envío.
let resend = 0.5;


//
async function f1(){

    //First Crypto
    let symb_btc = "btcusdt";
    let symb_f_btc = `btcusd_${date1}`;
    let symb_ff_btc = `btcusd_${date2}`;


    let ws_btc = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_btc}@trade`);
    let wsf_btc = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_btc}@trade`);//@markPrice
    let wsff_btc = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_btc}@trade`);



    //spot 3m
    let spot_btc = document.querySelector(".contenedor4 .BTC .spot");  //6meses
    //future 3m
    let fut_btc = document.querySelector(".contenedor4 .BTC .future");
    //Tasa 3m 
    let tasa_d_btc = document.querySelector(".contenedor4 .BTC .tasa");
    let tasa_a_btc= document.querySelector(".contenedor4 .BTC .tasa1");

    //spot 6m 
    let spots_btc = document.querySelector(".contenedor6 .BTC .spot");   //3meses
    //future 6m 
    let futf_btc = document.querySelector(".contenedor6 .BTC .future");
    //Tasa 6m 
    let tasaf_d_btc = document.querySelector(".contenedor6 .BTC .tasa");
    let tasaf_a_btc= document.querySelector(".contenedor6 .BTC .tasa1");

    let futy_btc = [];
    let futyf_btc = [];
    let spoty_btc = [];  

    let spotter_btc = null;
    let futter_btc = null;
    let futterf_btc = null;


    ////////////////SPOT call////////////////////////
    ws_btc.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_btc.push(JSON.parse(spot_p));

        spotter_btc = spoty_btc[spoty_btc.length-1];

        spot_btc.innerText = parseFloat(spotter_btc).toFixed(2);
        spots_btc.innerText = parseFloat(spotter_btc).toFixed(2);
    }


    ////////////////FUTURE call////////////////////////
    wsf_btc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_btc.push(JSON.parse(fut_p));

        futter_btc = futy_btc[futy_btc.length-1];

        let tasa = futter_btc / spotter_btc -1;

        tasa_d_btc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_btc.innerText = parseFloat(futter_btc).toFixed(2);
        tasa_a_btc.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_btc.style.color = "rgb(197, 197, 197)";
            fut_btc.style.color = "rgb(197, 197, 197)";
            tasa_a_btc.style.color = "rgb(0, 255, 34)";
            tasa_d_btc.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_btc.style.color = "black";
            fut_btc.style.color = "black";
            tasa_d_btc.style.color = "black";
            tasa_a_btc.style.color = "rgb(255, 0, 34)";
        }else{
            spot_btc.style.color = "rgb(197, 197, 197)";
            fut_btc.style.color = "rgb(197, 197, 197)";
            tasa_a_btc.style.color = "rgb(197, 197, 197)";
            tasa_d_btc.style.color = "yellow";
        }




    }


    ///////////////FUTURE call////////////////////////
    wsff_btc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_btc.push(JSON.parse(fut_p));

        futterf_btc = futyf_btc[futyf_btc.length-1];

        let tasa = futterf_btc / spotter_btc -1;

        tasaf_d_btc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;
        
        futf_btc.innerText = parseFloat(futterf_btc).toFixed(2);
        tasaf_a_btc.innerHTML = `${anual.toFixed(3)}%`;
        
        if(anual >= 15){
            spots_btc.style.color = "rgb(197, 197, 197)";
            futf_btc.style.color = "rgb(197, 197, 197)";
            tasaf_a_btc.style.color = "rgb(0, 255, 34)";
            tasaf_d_btc.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_btc.style.color = "black";
            futf_btc.style.color = "black";
            tasa_d_ada.style.color= "black";
            tasaf_a_btc.style.color = "rgb(255, 0, 34)";
        }else{
            spots_btc.style.color = "rgb(197, 197, 197)";
            futf_btc.style.color  = "rgb(197, 197, 197)";
            tasa_a_btc.style.color = "rgb(197, 197, 197)";
            tasa_d_btc.style.color = "yellow";
        }




   
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //NEXT CRYPTO
    let symb_eth = "ethusdt";
    let symb_f_eth = `ethusd_${date1}`;
    let symb_ff_eth = `ethusd_${date2}`;


    let ws_eth = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_eth}@trade`);
    let wsf_eth = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_eth}@trade`);//@markPrice
    let wsff_eth = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_eth}@trade`);



    //spot 3m
    let spot_eth = document.querySelector(".contenedor4 .ETH .spot");  //6meses
    //future 3m
    let fut_eth = document.querySelector(".contenedor4 .ETH .future");
    //Tasa 3m 
    let tasa_d_eth = document.querySelector(".contenedor4 .ETH .tasa");
    let tasa_a_eth= document.querySelector(".contenedor4 .ETH .tasa1");

    //spot 6m 
    let spots_eth = document.querySelector(".contenedor6 .ETH .spot");   //3meses
    //future 6m 
    let futf_eth = document.querySelector(".contenedor6 .ETH .future");
    //Tasa 6m 
    let tasaf_d_eth = document.querySelector(".contenedor6 .ETH .tasa");
    let tasaf_a_eth= document.querySelector(".contenedor6 .ETH .tasa1");

    let futy_eth = [];
    let futyf_eth = [];
    let spoty_eth = [];  

    let spotter_eth = null;
    let futter_eth = null;
    let futterf_eth = null;


    ////////////////SPOT call////////////////////////
    ws_eth.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_eth.push(JSON.parse(spot_p));

        spotter_eth = spoty_eth[spoty_eth.length-1];

        spot_eth.innerText = parseFloat(spotter_eth).toFixed(2);
        spots_eth.innerText = parseFloat(spotter_eth).toFixed(2);
    }


    ////////////////FUTURE call////////////////////////
    wsf_eth.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_eth.push(JSON.parse(fut_p));

        futter_eth = futy_eth[futy_eth.length-1];

        let tasa = futter_eth / spotter_eth -1;

        tasa_d_eth.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_eth.innerText = parseFloat(futter_eth).toFixed(2);
        tasa_a_eth.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_eth.style.color = "rgb(197, 197, 197)";
            fut_eth.style.color = "rgb(197, 197, 197)";
            tasa_a_eth.style.color = "rgb(0, 255, 34)";
            tasa_d_eth.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_eth.style.color = "black";
            fut_eth.style.color = "black";
            tasa_d_eth.style.color = "black";
            tasa_a_eth.style.color = "rgb(255, 0, 34)";
        }else{
            spot_eth.style.color = "rgb(197, 197, 197)";
            fut_eth.style.color = "rgb(197, 197, 197)";
            tasa_a_eth.style.color = "rgb(197, 197, 197)";
            tasa_d_eth.style.color = "yellow";
        }



    }


    ///////////////FUTURE call////////////////////////
    wsff_eth.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_eth.push(JSON.parse(fut_p));

        futterf_eth = futyf_eth[futyf_eth.length-1];

        let tasa = futterf_eth / spotter_eth -1;

        tasaf_d_eth.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;
        
        futf_eth.innerText = parseFloat(futterf_eth).toFixed(2);
        tasaf_a_eth.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spots_eth.style.color = "rgb(197, 197, 197)";
            futf_eth.style.color = "rgb(197, 197, 197)";
            tasaf_a_eth.style.color = "rgb(0, 255, 34)";
            tasaf_d_eth.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_eth.style.color = "black";
            futf_eth.style.color = "black";
            tasaf_d_eth.style.color = "black";
            tasaf_a_eth.style.color = "rgb(255, 0, 34)";
        }else{
            spots_eth.style.color = "rgb(197, 197, 197)";
            futf_eth.style.color = "rgb(197, 197, 197)";
            tasaf_a_eth.style.color = "rgb(197, 197, 197)";
            tasaf_d_eth.style.color = "yellow";
        }



   
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //NEXT CRYPTO
    let symb_ltc = "ltcusdt";
    let symb_f_ltc = `ltcusd_${date1}`;
    let symb_ff_ltc = `ltcusd_${date2}`;


    let ws_ltc = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_ltc}@trade`);
    let wsf_ltc = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_ltc}@trade`);
    let wsff_ltc = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_ltc}@markPrice`);



    //spot 3m
    let spot_ltc = document.querySelector(".contenedor4 .LTC .spot");
    //future 3m
    let fut_ltc = document.querySelector(".contenedor4 .LTC .future");
    //Tasa 3m
    let tasa_d_ltc = document.querySelector(".contenedor4 .LTC .tasa");
    let tasa_a_ltc = document.querySelector(".contenedor4 .LTC .tasa1");

    //spot 6m 
    let spots_ltc = document.querySelector(".contenedor6 .LTC .spot");
    //future 6m 
    let futf_ltc = document.querySelector(".contenedor6 .LTC .future");
    //Tasa 6m 
    let tasaf_d_ltc = document.querySelector(".contenedor6 .LTC .tasa");
    let tasaf_a_ltc= document.querySelector(".contenedor6 .LTC .tasa1");

    let futy_ltc = [];
    let futyf_ltc = [];
    let spoty_ltc = [];  

    let spotter_ltc = null;
    let futter_ltc = null;
    let futterf_ltc = null;


    //let enviado = [];



    ////////////////SPOT call////////////////////////
    ws_ltc.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_ltc.push(JSON.parse(spot_p));

        spotter_ltc = spoty_ltc[spoty_ltc.length-1];

        spot_ltc.innerText = parseFloat(spotter_ltc).toFixed(2);
        spots_ltc.innerText = parseFloat(spotter_ltc).toFixed(2);
    }


    ////////////////FUTURE call////////////////////////
    wsf_ltc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_ltc.push(JSON.parse(fut_p));

        futter_ltc = futy_ltc[futy_ltc.length-1];

        let tasa = futter_ltc / spotter_ltc -1;

        tasa_d_ltc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_ltc.innerText = parseFloat(futter_ltc).toFixed(2);
        tasa_a_ltc.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_ltc.style.color = "rgb(197, 197, 197)";
            fut_ltc.style.color = "rgb(197, 197, 197)";
            tasa_a_ltc.style.color = "rgb(0, 255, 34)";
            tasa_d_ltc.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_ltc.style.color = "black";
            fut_ltc.style.color = "black";
            tasa_d_ltc.style.color = "black";
            tasa_a_ltc.style.color = "rgb(255, 0, 34)";
        }else{
            spot_ltc.style.color = "rgb(197, 197, 197)";
            fut_ltc.style.color = "rgb(197, 197, 197)";
            tasa_a_ltc.style.color = "rgb(197, 197, 197)";
            tasa_d_ltc.style.color = "yellow";
        }
    }



    ///////////////FUTURE call////////////////////////
    wsff_ltc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_ltc.push(JSON.parse(fut_p));

        futterf_ltc = futyf_ltc[futyf_ltc.length-1];

        
        let tasa = futterf_ltc / spotter_ltc -1;

        tasaf_d_ltc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        futf_ltc.innerText = parseFloat(futterf_ltc).toFixed(2);
        tasaf_a_ltc.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spots_ltc.style.color = "rgb(197, 197, 197)";
            futf_ltc.style.color = "rgb(197, 197, 197)";
            tasaf_a_ltc.style.color = "rgb(0, 255, 34)";
            tasaf_d_ltc.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_ltc.style.color = "black";
            futf_ltc.style.color = "black";
            tasaf_d_ltc.style.color = "black";
            tasaf_a_ltc.style.color = "rgb(255, 0, 34)";
        }else{
            spots_ltc.style.color = "rgb(197, 197, 197)";
            futf_ltc.style.color = "rgb(197, 197, 197)";
            tasaf_a_ltc.style.color = "rgb(197, 197, 197)";
            tasaf_d_ltc.style.color = "yellow";
        }

        
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //NEXT CRYPTO
    let symb_dot = "dotusdt";
    let symb_f_dot = `dotusd_${date1}`;
    let symb_ff_dot = `dotusd_${date2}`;

    let ws_dot = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_dot}@trade`);
    let wsf_dot = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_dot}@trade`);
    let wsff_dot = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_dot}@trade`);



    //spot 3m
    let spot_dot = document.querySelector(".contenedor4 .DOT .spot");
    //future 3m
    let fut_dot = document.querySelector(".contenedor4 .DOT .future");
    //Tasa 3m
    let tasa_d_dot = document.querySelector(".contenedor4 .DOT .tasa");
    let tasa_a_dot = document.querySelector(".contenedor4 .DOT .tasa1");

    //spot 6m 
    let spots_dot = document.querySelector(".contenedor6 .DOT .spot");
    //future 6m 
    let futf_dot = document.querySelector(".contenedor6 .DOT .future");
    //Tasa 6m 
    let tasaf_d_dot = document.querySelector(".contenedor6 .DOT .tasa");
    let tasaf_a_dot= document.querySelector(".contenedor6 .DOT .tasa1");

    let futy_dot = [];
    let futyf_dot = [];
    let spoty_dot = [];  

    let spotter_dot = null;
    let futter_dot = null;
    let futterf_dot = null;


    //let enviado = [];



    ////////////////SPOT call////////////////////////
    ws_dot.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_dot.push(JSON.parse(spot_p));

        spotter_dot = spoty_dot[spoty_dot.length-1];

        spot_dot.innerText = parseFloat(spotter_dot).toFixed(2);
        spots_dot.innerText = parseFloat(spotter_dot).toFixed(2);

    }


    ////////////////FUTURE call////////////////////////
    wsf_dot.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_dot.push(JSON.parse(fut_p));

        futter_dot = futy_dot[futy_dot.length-1];

        let tasa = futter_dot / spotter_dot -1;

        tasa_d_dot.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_dot.innerText = parseFloat(futter_dot).toFixed(2);
        tasa_a_dot.innerHTML = `${anual.toFixed(3)}%`;
    
        if(anual >= 15){
            spot_dot.style.color = "rgb(197, 197, 197)";
            fut_dot.style.color = "rgb(197, 197, 197)";
            tasa_a_dot.style.color = "rgb(0, 255, 34)";
            tasa_d_dot.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_dot.style.color = "black";
            fut_dot.style.color = "black";
            tasa_d_dot.style.color = "black";
            tasa_a_dot.style.color = "rgb(255, 0, 34)";
        }else{
            spot_dot.style.color = "rgb(197, 197, 197)";
            fut_dot.style.color = "rgb(197, 197, 197)";
            tasa_a_dot.style.color = "rgb(197, 197, 197)";
            tasa_d_dot.style.color = "yellow";
        }

        
    }


    ///////////////FUTURE call////////////////////////
    wsff_dot.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_dot.push(JSON.parse(fut_p));

        futterf_dot = futyf_dot[futyf_dot.length-1];

        let tasa = futterf_dot / spotter_dot -1;

        tasaf_d_dot.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        futf_dot.innerText = parseFloat(futterf_dot).toFixed(2);
        tasaf_a_dot.innerHTML = `${anual.toFixed(3)}%`;

        
        if(anual >= 15){
            spots_dot.style.color = "rgb(197, 197, 197)";
            futf_dot.style.color = "rgb(197, 197, 197)";
            tasaf_a_dot.style.color = "rgb(0, 255, 34)";
            tasaf_d_dot.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_dot.style.color = "black";
            futf_dot.style.color = "black";
            tasaf_d_dot.style.color = "black";
            tasaf_a_dot.style.color = "rgb(255, 0, 34)";
        }else{
            spots_dot.style.color = "rgb(197, 197, 197)";
            futf_dot.style.color = "rgb(197, 197, 197)";
            tasaf_a_dot.style.color = "rgb(197, 197, 197)";
            tasaf_d_dot.style.color = "yellow";
        }
        
    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //NEXT CRYPTO
    let symb_bch = "bchusdt";
    let symb_f_bch = `bchusd_${date1}`;
    let symb_ff_bch = `bchusd_${date2}`;

    let ws_bch = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_bch}@trade`);
    let wsf_bch = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_bch}@trade`); //@markPrice
    let wsff_bch = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_bch}@markPrice`);




    //spot 3m
    let spot_bch = document.querySelector(".contenedor4 .BCH .spot");
    //future 3m
    let fut_bch = document.querySelector(".contenedor4 .BCH .future");
    //Tasa 3m
    let tasa_d_bch = document.querySelector(".contenedor4 .BCH .tasa");
    let tasa_a_bch = document.querySelector(".contenedor4 .BCH .tasa1");

    //spot 6m 
    let spots_bch = document.querySelector(".contenedor6 .BCH .spot");
    //future 6m 
    let futf_bch = document.querySelector(".contenedor6 .BCH .future");
    //Tasa 6m 
    let tasaf_d_bch = document.querySelector(".contenedor6 .BCH .tasa");
    let tasaf_a_bch= document.querySelector(".contenedor6 .BCH .tasa1");

    let futy_bch = [];
    let futyf_bch = [];
    let spoty_bch = [];  

    let spotter_bch = null;
    let futter_bch = null;
    let futterf_bch = null;


    //let enviado = [];

    ////////////////SPOT call////////////////////////
    ws_bch.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_bch.push(JSON.parse(spot_p));

        spotter_bch = spoty_bch[spoty_bch.length-1];
        spot_bch.innerText = parseFloat(spotter_bch).toFixed(2);
        spots_bch.innerText = parseFloat(futter_bch).toFixed(2);
    }


    ////////////////FUTURE call////////////////////////
    wsf_bch.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_bch.push(JSON.parse(fut_p));

        futter_bch = futy_bch[futy_bch.length-1];

        
        let tasa = futter_bch / spotter_bch -1;

        tasa_d_bch.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_bch.innerText = parseFloat(futter_bch).toFixed(2);
        tasa_a_bch.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_bch.style.color = "rgb(197, 197, 197)";
            fut_bch.style.color = "rgb(197, 197, 197)";
            tasa_a_bch.style.color = "rgb(0, 255, 34)";
            tasa_d_bch.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_bch.style.color = "black";
            fut_bch.style.color = "black";
            tasa_d_bch.style.color = "black";
            tasa_a_bch.style.color = "rgb(255, 0, 34)";
        }else{
            spot_bch.style.color = "rgb(197, 197, 197)";
            fut_bch.style.color = "rgb(197, 197, 197)";
            tasa_a_bch.style.color = "rgb(197, 197, 197)";
            tasa_d_bch.style.color = "yellow";
        }


    }

    ///////////////FUTURE call////////////////////////
    wsff_bch.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_bch.push(JSON.parse(fut_p));

        futterf_bch = futyf_bch[futyf_bch.length-1];

        
        let tasa = futterf_bch / spotter_bch -1;

        tasaf_d_bch.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        futf_bch.innerText = parseFloat(futterf_bch).toFixed(2);
        tasaf_a_bch.innerHTML = `${anual.toFixed(3)}%`;


        if(anual >= 15){
            spots_bch.style.color = "rgb(197, 197, 197)";
            futf_bch.style.color = "rgb(197, 197, 197)";
            tasaf_a_bch.style.color = "rgb(0, 255, 34)";
            tasaf_d_bch.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_bch.style.color = "black";
            futf_bch.style.color = "black";
            tasaf_d_bch.style.color = "black";
            tasaf_a_bch.style.color = "rgb(255, 0, 34)";
        }else{
            spots_bch.style.color = "rgb(197, 197, 197)";
            futf_bch.style.color = "rgb(197, 197, 197)";
            tasaf_a_bch.style.color = "rgb(197, 197, 197)";
            tasaf_d_bch.style.color = "yellow";
        }
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //NEXT CRYPTO
    let symb_ada = "adausdt";
    let symb_f_ada = `adausd_${date1}`;
    let symb_ff_ada = `adausd_${date2}`;


    let ws_ada = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_ada}@trade`);
    let wsf_ada = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_ada}@trade`);
    let wsff_ada = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_ada}@markPrice`);


    //spot 3m
    let spot_ada = document.querySelector(".contenedor4 .ADA .spot");
    //future 3m
    let fut_ada = document.querySelector(".contenedor4 .ADA .future");
    //Tasa 3m
    let tasa_d_ada = document.querySelector(".contenedor4 .ADA .tasa");
    let tasa_a_ada = document.querySelector(".contenedor4 .ADA .tasa1");

    //spot 6m 
    let spots_ada = document.querySelector(".contenedor6 .ADA .spot");
    //future 6m 
    let futf_ada = document.querySelector(".contenedor6 .ADA .future");
    //Tasa 6m 
    let tasaf_d_ada = document.querySelector(".contenedor6 .ADA .tasa");
    let tasaf_a_ada= document.querySelector(".contenedor6 .ADA .tasa1");

    let futy_ada = [];
    let futyf_ada = [];
    let spoty_ada = [];  

    let spotter_ada = null;
    let futter_ada = null;
    let futterf_ada = null;



    ////////////////SPOT call////////////////////////
    ws_ada.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_ada.push(JSON.parse(spot_p));

        spotter_ada = spoty_ada[spoty_ada.length-1];

        spot_ada.innerText = parseFloat(spotter_ada).toFixed(2);
        spots_ada.innerText = parseFloat(spotter_ada).toFixed(2);
    }


    ////////////////FUTURE call////////////////////////
    wsf_ada.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_ada.push(JSON.parse(fut_p));

        futter_ada = futy_ada[futy_ada.length-1];
        
        let tasa = futter_ada / spotter_ada -1;

        tasa_d_ada.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;
        tasa_a_ada.innerHTML = `${anual.toFixed(3)}%`;


        fut_ada.innerText = parseFloat(futter_ada).toFixed(2);
        tasa_a_ada.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_ada.style.color = "rgb(197, 197, 197)";
            fut_ada.style.color = "rgb(197, 197, 197)";
            tasa_a_ada.style.color = "rgb(0, 255, 34)";
            tasa_d_ada.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_ada.style.color = "black";
            fut_ada.style.color = "black";
            tasa_d_ada.style.color = "black";
            tasa_a_ada.style.color = "rgb(255, 0, 34)";
        }else{
            spot_ada.style.color = "rgb(197, 197, 197)";
            fut_ada.style.color = "rgb(197, 197, 197)";
            tasa_a_ada.style.color = "rgb(197, 197, 197)";
            tasa_d_ada.style.color = "yellow";
        }


    }


    
    ///////////////FUTURE call////////////////////////
    wsff_ada.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_ada.push(JSON.parse(fut_p));

        futterf_ada = futyf_ada[futyf_ada.length-1];

        
        let tasa = futterf_ada / spotter_ada -1;

        tasaf_d_ada.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        futf_ada.innerText = parseFloat(futterf_ada).toFixed(2);
        tasaf_a_ada.innerHTML = `${anual.toFixed(3)}%`;


        if(anual >= 15){
            spots_ada.style.color = "rgb(197, 197, 197)";
            futf_ada.style.color = "rgb(197, 197, 197)";
            tasaf_a_ada.style.color = "rgb(0, 255, 34)";
            tasaf_d_ada.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_ada.style.color = "black";
            futf_ada.style.color = "black";
            tasaf_d_ada.style.color = "black";
            tasaf_a_ada.style.color = "rgb(255, 0, 34)";
        }else{
            spots_ada.style.color = "rgb(197, 197, 197)";
            futf_ada.style.color = "rgb(197, 197, 197)";
            tasaf_a_ada.style.color = "rgb(197, 197, 197)";
            tasaf_d_ada.style.color = "yellow";
        }
    }






    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //NEXT CRYPTO
    let symb_xrp = "xrpusdt";
    let symb_f_xrp = `xrpusd_${date1}`;
    let symb_ff_xrp  = `xrpusd_${date2}`;

    let ws_xrp  = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_xrp}@trade`);
    let wsf_xrp  = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_xrp}@trade`);
    let wsff_xrp  = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_xrp}@markPrice`);



    //spot 3m
    let spot_xrp = document.querySelector(".contenedor4 .XRP .spot");
    //future 3m
    let fut_xrp = document.querySelector(".contenedor4 .XRP .future");
    //Tasa 3m
    let tasa_d_xrp = document.querySelector(".contenedor4 .XRP .tasa");
    let tasa_a_xrp = document.querySelector(".contenedor4 .XRP .tasa1");

    //spot 6m 
    let spots_xrp = document.querySelector(".contenedor6 .XRP .spot");
    //future 6m 
    let futf_xrp = document.querySelector(".contenedor6 .XRP .future");
    //Tasa 6m 
    let tasaf_d_xrp = document.querySelector(".contenedor6 .XRP .tasa");
    let tasaf_a_xrp= document.querySelector(".contenedor6 .XRP .tasa1");

    let futy_xrp = [];
    let futyf_xrp = [];
    let spoty_xrp = [];  

    let spotter_xrp = null;
    let futter_xrp = null;
    let futterf_xrp = null;


    //let enviado = [];


    ////////////////SPOT call////////////////////////
    ws_xrp.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_xrp.push(JSON.parse(spot_p));

        spotter_xrp = spoty_xrp[spoty_xrp.length-1];

        spot_xrp.innerText = parseFloat(spotter_xrp).toFixed(4);
        spots_xrp.innerText = parseFloat(spotter_xrp).toFixed(4);

    }


    ////////////////FUTURE call////////////////////////
    wsf_xrp.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_xrp.push(JSON.parse(fut_p));

        futter_xrp = futy_xrp[futy_xrp.length-1];
        //console.log(fut_p);
        
        let tasa = futter_xrp/ spotter_xrp -1;

        tasa_d_xrp.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        fut_xrp.innerText = parseFloat(futter_xrp).toFixed(4);
        tasa_a_xrp.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spot_xrp.style.color = "rgb(197, 197, 197)";
            fut_xrp.style.color = "rgb(197, 197, 197)";
            tasa_a_xrp.style.color = "rgb(0, 255, 34)";
            tasa_d_xrp.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spot_xrp.style.color = "black";
            fut_xrp.style.color = "black";
            tasa_d_xrp.style.color = "black";
            tasa_a_xrp.style.color = "rgb(255, 0, 34)";
        }else{
            spot_xrp.style.color = "rgb(197, 197, 197)";
            fut_xrp.style.color = "rgb(197, 197, 197)";
            tasa_a_xrp.style.color = "rgb(197, 197, 197)";
            tasa_d_xrp.style.color = "yellow";
        }

    }


    ///////////////FUTURE call////////////////////////
    wsff_xrp.onmessage = (event) => {
        //sconsole.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_xrp.push(JSON.parse(fut_p));

        futterf_xrp = futyf_xrp[futyf_xrp.length-1];

        
        let tasa = futterf_xrp / spotter_xrp -1;

        tasaf_d_xrp.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        futf_xrp.innerText = parseFloat(futterf_xrp).toFixed(2);

        tasaf_a_xrp.innerHTML = `${anual.toFixed(3)}%`;

        if(anual >= 15){
            spots_xrp.style.color = "rgb(197, 197, 197)";
            futf_xrp.style.color = "rgb(197, 197, 197)";
            tasaf_a_xrp.style.color = "rgb(0, 255, 34)";
            tasaf_d_xrp.style.color = "rgb(0, 255, 34)";

        }else if(anual < 10){
            spots_xrp.style.color = "black";
            futf_xrp.style.color = "black";
            tasaf_d_xrp.style.color = "black";
            tasaf_a_xrp.style.color = "rgb(255, 0, 34)";
        }else{
            spots_xrp.style.color = "rgb(197, 197, 197)";
            futf_xrp.style.color = "rgb(197, 197, 197)";
            tasaf_a_xrp.style.color = "rgb(197, 197, 197)";
            tasaf_d_xrp.style.color = "yellow";
        }



    

    }

}

f1();



//MAX ( todas las tasas )
//mostrarla
//si toca, ejecute api binance
//