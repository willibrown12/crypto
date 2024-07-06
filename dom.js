
/*  ==================thay are global for the toggle to live price ================== */
var sumcheck=0
const livePricing=[]
var myChart={}
var myInterval

async function init() {

/*  ==================pages conatainers to use ================== */
const coinList = document.querySelector("#coinList")
const liveReportdiv = document.querySelector("#liveReportdiv")
const aboutdiv = document.querySelector("#aboutdiv")
liveReportdiv.classList.add("d-none")



   /* ================== the search function that in the navbar ===============================*/
    const buttonSrch= document.querySelector("#buttonSrch")
    buttonSrch.addEventListener("click",() => {
        homebutton.classList.add("active")
        liveReport.classList.remove("active")
        about.classList.remove("active")
        aboutdiv.classList.add("d-none")
        
        liveReportdiv.classList.add("d-none")

         homepage()
        searchcoin(coins)})

   /*  ==================load main page ================== */
    homepage()



/*  ==================homepage ================== */

    const homebutton = document.querySelector("#home")
    homebutton.addEventListener("click", async () => {
        
        homebutton.classList.add("active")
        liveReport.classList.remove("active")
        about.classList.remove("active")
        aboutdiv.classList.add("d-none")
        
        liveReportdiv.classList.add("d-none")

         homepage()
    
    })


    /*  ==================liveReport ================== */
    const liveReport = document.querySelector("#liveReport")
    liveReport.addEventListener("click", async () => {
       
        liveReport.classList.add("active")
        homebutton.classList.remove("active")
        about.classList.remove("active")
        coinList.classList.add("d-none")

        
        aboutdiv.classList.add("d-none")
      
       
        await showLiveReport()
        
    
    })


    /*  ==================about ================== */
    const about = document.querySelector("#about")
    about.addEventListener("click", () => {
        about.classList.add("active")
        liveReport.classList.remove("active")
        coinList.classList.add("d-none")
        liveReportdiv.classList.add("d-none")

        aboutpage()
    
    })
   
    

 
    
}

async function homepage() {

    
    clearInterval(myInterval)
        const coinList = document.querySelector("#coinList")
        coinList.classList.remove("d-none")
        

        draw(coins)
}

async function showLiveReport() {
  
    const liveReportdiv = document.querySelector("#liveReportdiv")
    const ctx = document.getElementById('myChart');
    liveReportdiv.classList.remove("d-none")
  
   const data=await getCoinliveprice()

   
   const event = new Date
 
   if(myChart.id===0){
     myChart.destroy()
}
      
   myChart=new Chart(ctx, {
        type: 'line',
        data: {
          labels: [event],
          datasets: [{
            label: Object.keys(data)[0]|| "no data",
            data: [Object.values(data)[0]?.USD,],
            borderWidth: 1
          },{
            label:Object.keys(data)[1]|| "no data",
            data: [Object.values(data)[1]?.USD,],
            borderWidth: 1
          },
          {
            label:Object.keys(data)[2] || "no data",
            data: [Object.values(data)[2]?.USD,],
            borderWidth: 1
          },
          {
            label:Object.keys(data)[3]|| "no data",
            data: [Object.values(data)[3]?.USD, ],
            borderWidth: 1
          },
          {
            label:Object.keys(data)[4]|| "no data",
            data: [Object.values(data)[4]?.USD,],
            borderWidth: 1
          }],
        },
        options: {
            plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => (`${ctx.dataset.label}: ${ctx.raw}`)
                  }
                }
              },
            
          
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      myChart.id=0
     
      
     const myInterval =setInterval(() => {
        Promise.all([getCoinliveprice()]).then((results) => {
           let timeevent= new Date
            addData(myChart, timeevent, Object.values(results[0]))
        results.splice(0,1)
        }).catch(() => {
            console.log("one of the requests failed.")
        })
        }, 10000)
      
    
  
    
}


function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset,index) => {
        dataset.data.push(newData[index]?.USD);
      
    });
    chart.update();
}




function aboutpage() {
    clearInterval(myInterval)

    const aboutdiv = document.querySelector("#aboutdiv")
    aboutdiv.innerHTML=""
    aboutdiv.classList.remove("d-none")
    const para = document.createElement("p")
      para.innerText="i love going to the toilet"
    
      aboutdiv.append(para)
}

 async function searchcoin(data){
    const searchvalue = document.querySelector("#Search").value
    const searchCheckBox= document.querySelector("#checkbox").checked
    
    if (searchCheckBox=== true) {
        const dataToObj = data.reduce((obj, current) => {
            obj[current?.id] = current
            return obj
        }, {})
        
       
       const arrayKey=[]
       arrayKey.push(dataToObj[searchvalue])
         draw(arrayKey) 
    

    } else {
        const coinsFoundSearch = data.filter(current => current?.name.toLowerCase().includes(searchvalue.toLowerCase()))
        
        draw(coinsFoundSearch)
       
    }
   
    
}

async function getCoins() { try {

   /*  const data= await fetch(`https://api.coingecko.com/api/v3/coins/list`) */
 const result= await data.json()
 console.log(result);
return result
    
} catch (error) {alert("something went wrong")
    
}
    
}
function draw(data) {
    if (!Array.isArray(data)) return
    const coinList = document.querySelector("#coinList")
    coinList.innerHTML=""
;

    const DrawCoinUI =data.map(current =>getSingleCoinUI(current))
    coinList.append(...DrawCoinUI)    
}


function  getSingleCoinUI(coin){

    if (typeof coin !== 'object') return;



const colCard = document.createElement("div")
colCard.className = "col-sm-4"

const cardDiv = document.createElement("div")
cardDiv.className = "card m-2 bg-dark text-white box box2"
cardDiv.style.height="200px"

const cardBody = document.createElement("div")
cardBody.className = "card-body content row"

const topCardDiv = document.createElement("div")
topCardDiv.className=" d-flex justify-content-between"

const cardTitle = document.createElement("h5")
cardTitle.innerText =coin?.name
cardTitle.className="card-title col-10"


const toggleDiv =document.createElement("div")
toggleDiv.className = "form-check form-switch col-1 d-flex justify-content-center"

const toggle =document.createElement("input")
toggle.className ="form-check-input  bg-success "
toggle.setAttribute("type", "checkbox")
toggle.setAttribute("role", "switch")
toggleDiv.append(toggle)

if (coin.ischecked===true)
{toggle.checked=true}
toggle.addEventListener("click", ()=>checkedtoggle(coin))

 

const placeHolderImg= document.createElement("div")
placeHolderImg.className="col-4 d-flex justify-content-center"
placeHolderImg.innerHTML=""
const para = document.createElement("p")
para.className="card-text col-8 mb-0"
para.innerText=coin?.id

const placeHolderbutton= document.createElement("div")
placeHolderbutton.className="d-flex align-items-center "
const button = document.createElement("button")
button.innerText="more info"
button.className="btn btn-success"
button.addEventListener("click", async () => {
    
    if (placeHolderImg.innerHTML==="") {
        /* const result = await getCoinInfoId(coin?.id) */
        const imageCoin=document.createElement("img")
   imageCoin.src=objtesttodelete?.image?.large
   imageCoin.style.height="75px"
   para.innerText="dollar-$= "+objtesttodelete.market_data.current_price.usd+"\neuro-€= "+objtesttodelete.market_data.current_price.eur+"\nshekel-₪= "+objtesttodelete.market_data.current_price.ils
   cardDiv.className = "card m-2 bg-success  text-white box"
   button.className="btn btn-dark"
   toggleDiv.className ="invisible"
   placeHolderImg.append(imageCoin)
    button.innerText="less info"
    } else {
        placeHolderImg.innerHTML=""
    para.innerText=coin?.name
    cardDiv.className = "card m-2 bg-dark  text-white box box2"
    button.className="btn btn-success"
    button.innerText="more info"
      toggleDiv.className ="visible form-check form-switch col-1 d-flex justify-content-center"

    }
   
   

})

placeHolderbutton.append(button)
topCardDiv.append(cardTitle,toggleDiv)
cardBody.append(topCardDiv,para,placeHolderImg,placeHolderbutton)
cardDiv.append(cardBody)
colCard.append(cardDiv)


return  colCard

}
async function getCoinInfoId(id) {
    try {
        const result = await fetch("https://api.coingecko.com/api/v3/coins/" + id, {
            method: "GET",
        })
        const data = await result.json()
        return data;
       
        
    } catch (error) {
        alert("failed in fetch")
    }
 
}


function checkedtoggle(coin){
   

    if (  event.target.checked) {
        if (sumcheck===5) {
            
         alert("you got to maximum capacity")
         event.target.checked=false
        }
        else{
            sumcheck++
            coin.ischecked=true
            livePricing.push(coin)
            
        }
        
    } else {
        sumcheck--
        coin.ischecked=false
            
           const foundIndex=livePricing.findIndex((current)=>current.id===coin.id)
           if (foundIndex > -1) {
            livePricing.splice(foundIndex, 1)
        }
    }
  
}


async function getCoinliveprice() {
    if (livePricing.length===0) {
        return data=[]
    }
    const stringforapi=livePricing.reduce((string, current) => {
        string=string+current.symbol+","
          return string
      }, "") 
    try {
        const result = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${stringforapi}&tsyms=USD`, {
            method: "GET",
        })
        const data = await result.json()
     
        return data;

    
       
        
    } catch (error) {
        alert("failed to fetch live price")
    }
 
}




var objtesttodelete={
    "id": "01coin",
    "symbol": "zoc",
    "name": "01coin",
    "web_slug": "01coin",
    "asset_platform_id": null,
    "platforms": {
        "": ""
    },
    "detail_platforms": {
        "": {
            "decimal_place": null,
            "contract_address": ""
        }
    },
    "block_time_in_minutes": 0,
    "hashing_algorithm": "NeoScrypt",
    "categories": [
        "Masternodes"
    ],
    "preview_listing": false,
    "public_notice": null,
    "additional_notices": [],
    "localization": {
        "en": "01coin",
        "de": "",
        "es": "",
        "fr": "",
        "it": "",
        "pl": "",
        "ro": "",
        "hu": "",
        "nl": "",
        "pt": "",
        "sv": "",
        "vi": "",
        "tr": "",
        "ru": "",
        "ja": "",
        "zh": "",
        "zh-tw": "",
        "ko": "",
        "ar": "",
        "th": "",
        "id": "",
        "cs": "",
        "da": "",
        "el": "",
        "hi": "",
        "no": "",
        "sk": "",
        "uk": "",
        "he": "",
        "fi": "",
        "bg": "",
        "hr": "",
        "lt": "",
        "sl": ""
    },
    "description": {
        "en": "",
        "de": "",
        "es": "",
        "fr": "",
        "it": "",
        "pl": "",
        "ro": "",
        "hu": "",
        "nl": "",
        "pt": "",
        "sv": "",
        "vi": "",
        "tr": "",
        "ru": "",
        "ja": "",
        "zh": "",
        "zh-tw": "",
        "ko": "",
        "ar": "",
        "th": "",
        "id": "",
        "cs": "",
        "da": "",
        "el": "",
        "hi": "",
        "no": "",
        "sk": "",
        "uk": "",
        "he": "",
        "fi": "",
        "bg": "",
        "hr": "",
        "lt": "",
        "sl": ""
    },
    "links": {
        "homepage": [
            "https://01coin.io/",
            "",
            ""
        ],
        "whitepaper": null,
        "blockchain_site": [
            "https://explorer.01coin.io/",
            "https://zoc.ccore.online/",
            "https://openchains.info/coin/01coin",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "official_forum_url": [
            "",
            "",
            ""
        ],
        "chat_url": [
            "https://discordapp.com/invite/wq5xD6M",
            "https://www.facebook.com/01CoinTeam/",
            ""
        ],
        "announcement_url": [
            "",
            ""
        ],
        "twitter_screen_name": "01CoinTeam",
        "facebook_username": "01CoinTeam",
        "bitcointalk_thread_identifier": 3457534,
        "telegram_channel_identifier": "ZOCCoinOfficial",
        "subreddit_url": "https://www.reddit.com/r/01coin/",
        "repos_url": {
            "github": [
                "https://github.com/zocteam/zeroonecoin"
            ],
            "bitbucket": []
        }
    },
    "image": {
        "thumb": "https://coin-images.coingecko.com/coins/images/5720/thumb/F1nTlw9I_400x400.jpg?1696506175",
        "small": "https://coin-images.coingecko.com/coins/images/5720/small/F1nTlw9I_400x400.jpg?1696506175",
        "large": "https://coin-images.coingecko.com/coins/images/5720/large/F1nTlw9I_400x400.jpg?1696506175"
    },
    "country_origin": "",
    "genesis_date": null,
    "sentiment_votes_up_percentage": null,
    "sentiment_votes_down_percentage": null,
    "watchlist_portfolio_users": 328,
    "market_cap_rank": null,
    "market_data": {
        "current_price": {
            "aed": 0.00118267,
            "ars": 0.293171,
            "aud": 0.00048188,
            "bch": 8.38066e-7,
            "bdt": 0.03785566,
            "bhd": 0.00012123,
            "bmd": 0.00032199,
            "bnb": 5.64648e-7,
            "brl": 0.00180109,
            "btc": 5.288e-9,
            "cad": 0.00044095,
            "chf": 0.00028943,
            "clp": 0.304942,
            "cny": 0.00234001,
            "czk": 0.00752413,
            "dkk": 0.00224167,
            "dot": 0.00005211,
            "eos": 0.00055486,
            "eth": 9.5038e-8,
            "eur": 0.00030036,
            "gbp": 0.00025456,
            "gel": 0.00090158,
            "hkd": 0.00251448,
            "huf": 0.118744,
            "idr": 5.26,
            "ils": 0.0012126,
            "inr": 0.02684366,
            "jpy": 0.05181,
            "krw": 0.44476,
            "kwd": 0.00009877,
            "lkr": 0.098557,
            "ltc": 0.00000433,
            "mmk": 0.799154,
            "mxn": 0.00590484,
            "myr": 0.00151899,
            "ngn": 0.45272,
            "nok": 0.00343923,
            "nzd": 0.00052872,
            "php": 0.01880751,
            "pkr": 0.089684,
            "pln": 0.00129598,
            "rub": 0.02758078,
            "sar": 0.00120805,
            "sek": 0.00341343,
            "sgd": 0.00043675,
            "thb": 0.01181721,
            "try": 0.01054145,
            "twd": 0.010471,
            "uah": 0.01304701,
            "usd": 0.00032199,
            "vef": 0.00003224,
            "vnd": 8.2,
            "xag": 0.00001105,
            "xau": 1.38389e-7,
            "xdr": 0.00024454,
            "xlm": 0.00353247,
            "xrp": 0.00067659,
            "yfi": 4.9462e-8,
            "zar": 0.00586056,
            "bits": 0.00528769,
            "link": 0.00002321,
            "sats": 0.528769
        },
        "total_value_locked": null,
        "mcap_to_tvl_ratio": null,
        "fdv_to_tvl_ratio": null,
        "roi": null,
        "ath": {
            "aed": 0.12555,
            "ars": 1.6,
            "aud": 0.04813117,
            "bch": 0.00009617,
            "bdt": 2.87,
            "bhd": 0.0128866,
            "bmd": 0.03418169,
            "bnb": 0.00331039,
            "brl": 0.128144,
            "btc": 0.0000052,
            "cad": 0.04441606,
            "chf": 0.03390037,
            "clp": 23.42,
            "cny": 0.236684,
            "czk": 0.766309,
            "dkk": 0.221001,
            "dot": 0.00188353,
            "eos": 0.0063736,
            "eth": 0.00013901,
            "eur": 0.02962705,
            "gbp": 0.02588484,
            "gel": 0.00408583,
            "hkd": 0.267909,
            "huf": 9.64,
            "idr": 519.94,
            "ils": 0.123958,
            "inr": 2.54,
            "jpy": 3.86,
            "krw": 38.97,
            "kwd": 0.0103764,
            "lkr": 5.85,
            "ltc": 0.00059003,
            "mmk": 54.33,
            "mxn": 0.650611,
            "myr": 0.141959,
            "ngn": 7.44,
            "nok": 0.280494,
            "nzd": 0.052811,
            "php": 1.85,
            "pkr": 4.2,
            "pln": 0.127783,
            "rub": 2.28,
            "sar": 0.128204,
            "sek": 0.311271,
            "sgd": 0.04720177,
            "thb": 1.13,
            "try": 0.206637,
            "twd": 1.06,
            "uah": 0.572549,
            "usd": 0.03418169,
            "vef": 8493.18,
            "vnd": 475.63,
            "xag": 0.00238841,
            "xau": 0.00002873,
            "xdr": 0.0244732,
            "xlm": 0.14248566,
            "xrp": 0.0738429,
            "yfi": 0.00000216,
            "zar": 0.501357,
            "bits": 3.1,
            "link": 0.05883054,
            "sats": 310
        },
        "ath_change_percentage": {
            "aed": -99.05788,
            "ars": -81.62628,
            "aud": -98.99869,
            "bch": -99.12865,
            "bdt": -98.67856,
            "bhd": -99.05911,
            "bmd": -99.05787,
            "bnb": -99.98294,
            "brl": -98.59429,
            "btc": -99.89822,
            "cad": -99.00709,
            "chf": -99.14613,
            "clp": -98.69803,
            "cny": -99.01121,
            "czk": -99.018,
            "dkk": -98.98554,
            "dot": -97.23204,
            "eos": -91.29575,
            "eth": -99.93161,
            "eur": -98.98606,
            "gbp": -99.01644,
            "gel": -77.93114,
            "hkd": -99.06132,
            "huf": -98.76838,
            "idr": -98.98731,
            "ils": -99.02163,
            "inr": -98.94161,
            "jpy": -98.65639,
            "krw": -98.85859,
            "kwd": -99.04796,
            "lkr": -98.31617,
            "ltc": -99.26597,
            "mmk": -98.52892,
            "mxn": -99.0923,
            "myr": -98.92984,
            "ngn": -93.91265,
            "nok": -98.7737,
            "nzd": -98.99871,
            "php": -98.98385,
            "pkr": -97.86572,
            "pln": -98.98566,
            "rub": -98.78845,
            "sar": -99.05758,
            "sek": -98.90324,
            "sgd": -99.0746,
            "thb": -98.95064,
            "try": -94.89788,
            "twd": -99.01203,
            "uah": -97.72094,
            "usd": -99.05787,
            "vef": -100,
            "vnd": -98.27653,
            "xag": -99.53728,
            "xau": -99.51826,
            "xdr": -99.00063,
            "xlm": -97.52063,
            "xrp": -99.08342,
            "yfi": -97.70598,
            "zar": -98.8309,
            "bits": -99.82935,
            "link": -99.96053,
            "sats": -99.82935
        },
        "ath_date": {
            "aed": "2018-10-10T17:27:38.034Z",
            "ars": "2023-12-02T11:50:33.179Z",
            "aud": "2018-10-10T17:27:38.034Z",
            "bch": "2018-12-06T12:04:40.890Z",
            "bdt": "2018-10-10T17:27:38.034Z",
            "bhd": "2018-10-10T17:27:38.034Z",
            "bmd": "2018-10-10T17:27:38.034Z",
            "bnb": "2018-10-10T17:27:38.034Z",
            "brl": "2018-10-10T17:27:38.034Z",
            "btc": "2018-10-10T17:27:38.034Z",
            "cad": "2018-10-10T17:27:38.034Z",
            "chf": "2018-10-10T17:27:38.034Z",
            "clp": "2018-10-10T17:27:38.034Z",
            "cny": "2018-10-10T17:27:38.034Z",
            "czk": "2018-10-10T17:27:38.034Z",
            "dkk": "2018-10-10T17:27:38.034Z",
            "dot": "2020-11-11T21:06:16.608Z",
            "eos": "2023-12-02T12:00:04.584Z",
            "eth": "2018-11-22T11:36:24.509Z",
            "eur": "2018-10-10T17:27:38.034Z",
            "gbp": "2018-10-10T17:27:38.034Z",
            "gel": "2023-12-17T22:12:54.174Z",
            "hkd": "2018-10-10T17:27:38.034Z",
            "huf": "2018-10-10T17:27:38.034Z",
            "idr": "2018-10-10T17:27:38.034Z",
            "ils": "2018-10-10T17:27:38.034Z",
            "inr": "2018-10-10T17:27:38.034Z",
            "jpy": "2018-10-10T17:27:38.034Z",
            "krw": "2018-10-10T17:27:38.034Z",
            "kwd": "2018-10-10T17:27:38.034Z",
            "lkr": "2018-10-10T17:27:38.034Z",
            "ltc": "2018-10-10T17:27:38.034Z",
            "mmk": "2018-10-10T17:27:38.034Z",
            "mxn": "2018-10-10T17:27:38.034Z",
            "myr": "2018-10-10T17:27:38.034Z",
            "ngn": "2018-10-11T00:00:00.000Z",
            "nok": "2018-10-10T17:27:38.034Z",
            "nzd": "2018-10-10T17:27:38.034Z",
            "php": "2018-10-10T17:27:38.034Z",
            "pkr": "2018-10-10T17:27:38.034Z",
            "pln": "2018-10-10T17:27:38.034Z",
            "rub": "2018-10-10T17:27:38.034Z",
            "sar": "2018-10-10T17:27:38.034Z",
            "sek": "2018-10-10T17:27:38.034Z",
            "sgd": "2018-10-10T17:27:38.034Z",
            "thb": "2018-10-10T17:27:38.034Z",
            "try": "2018-10-10T17:27:38.034Z",
            "twd": "2018-10-10T17:27:38.034Z",
            "uah": "2018-10-11T00:00:00.000Z",
            "usd": "2018-10-10T17:27:38.034Z",
            "vef": "2018-10-10T17:27:38.034Z",
            "vnd": "2018-10-11T00:00:00.000Z",
            "xag": "2018-10-10T17:27:38.034Z",
            "xau": "2018-10-10T17:27:38.034Z",
            "xdr": "2018-10-10T17:27:38.034Z",
            "xlm": "2018-10-10T17:27:38.034Z",
            "xrp": "2018-10-10T17:27:38.034Z",
            "yfi": "2020-07-22T00:00:00.000Z",
            "zar": "2018-10-10T17:27:38.034Z",
            "bits": "2018-10-11T00:00:00.000Z",
            "link": "2018-10-11T00:00:00.000Z",
            "sats": "2018-10-11T00:00:00.000Z"
        },
        "atl": {
            "aed": 0.00007024,
            "ars": 0.00239974,
            "aud": 0.00002788,
            "bch": 1.85336e-7,
            "bdt": 0.00179047,
            "bhd": 0.00000721,
            "bmd": 0.00001912,
            "bnb": 8.8143e-8,
            "brl": 0.00010195,
            "btc": 1e-9,
            "cad": 0.00002461,
            "chf": 0.00001834,
            "clp": 0.01783501,
            "cny": 0.00012806,
            "czk": 0.00045353,
            "dkk": 0.00013637,
            "dot": 0.00000284,
            "eos": 0.00002057,
            "eth": 1.8173e-8,
            "eur": 0.00001833,
            "gbp": 0.00001578,
            "gel": 0.00031301,
            "hkd": 0.00015006,
            "huf": 0.00735957,
            "idr": 0.286285,
            "ils": 0.00006704,
            "inr": 0.00151073,
            "jpy": 0.00258957,
            "krw": 0.02482918,
            "kwd": 0.00000587,
            "lkr": 0.00689533,
            "ltc": 3.83121e-7,
            "mmk": 0.03546318,
            "mxn": 0.00038773,
            "myr": 0.0000844,
            "ngn": 0.00794913,
            "nok": 0.00018927,
            "nzd": 0.00003067,
            "php": 0.00105292,
            "pkr": 0.00391935,
            "pln": 0.00008609,
            "rub": 0.00105149,
            "sar": 0.00007177,
            "sek": 0.00019723,
            "sgd": 0.00002671,
            "thb": 0.00068248,
            "try": 0.00032147,
            "twd": 0.00056913,
            "uah": 0.00056595,
            "usd": 0.00001912,
            "vef": 0.00000191,
            "vnd": 0.446206,
            "xag": 9.6264e-7,
            "xau": 1.0573e-8,
            "xdr": 0.00001401,
            "xlm": 0.00017824,
            "xrp": 0.00006008,
            "yfi": 3.379e-9,
            "zar": 0.00031218,
            "bits": 0.001,
            "link": 0.00000313,
            "sats": 0.1
        },
        "atl_change_percentage": {
            "aed": 1583.89917,
            "ars": 12118.42632,
            "aud": 1628.85851,
            "bch": 352.1206,
            "bdt": 2014.5698,
            "bhd": 1581.46958,
            "bmd": 1583.89459,
            "bnb": 540.8038,
            "brl": 1666.90792,
            "btc": 429.0008,
            "cad": 1692.24767,
            "chf": 1478.53454,
            "clp": 1610.02205,
            "cny": 1727.45462,
            "czk": 1559.22152,
            "dkk": 1544.056,
            "dot": 1736.46325,
            "eos": 2596.71433,
            "eth": 423.15246,
            "eur": 1538.62952,
            "gbp": 1513.7725,
            "gel": 188.076,
            "hkd": 1575.90474,
            "huf": 1513.67912,
            "idr": 1739.21696,
            "ils": 1709.06494,
            "inr": 1677.10702,
            "jpy": 1900.98179,
            "krw": 1691.51961,
            "kwd": 1583.40069,
            "lkr": 1329.52647,
            "ltc": 1030.45034,
            "mmk": 2153.77485,
            "mxn": 1423.12505,
            "myr": 1700.08446,
            "ngn": 5595.97046,
            "nok": 1717.35973,
            "nzd": 1624.18072,
            "php": 1686.46065,
            "pkr": 2188.54503,
            "pln": 1405.59219,
            "rub": 2523.36851,
            "sar": 1583.47773,
            "sek": 1630.89254,
            "sgd": 1535.59486,
            "thb": 1631.73099,
            "try": 3179.56587,
            "twd": 1740.06485,
            "uah": 2205.62793,
            "usd": 1583.89459,
            "vef": 1583.89459,
            "vnd": 1737.13165,
            "xag": 1048.0577,
            "xau": 1209.07308,
            "xdr": 1646.28932,
            "xlm": 1881.97361,
            "xrp": 1026.59707,
            "yfi": 1365.14591,
            "zar": 1777.53865,
            "bits": 429.0008,
            "link": 641.465,
            "sats": 429.0008
        },
        "atl_date": {
            "aed": "2022-07-04T07:54:02.569Z",
            "ars": "2022-07-04T07:54:02.569Z",
            "aud": "2022-07-04T08:03:24.254Z",
            "bch": "2022-07-04T08:35:39.593Z",
            "bdt": "2022-07-04T07:54:02.569Z",
            "bhd": "2022-07-04T07:54:02.569Z",
            "bmd": "2022-07-04T07:54:02.569Z",
            "bnb": "2022-07-04T08:29:41.435Z",
            "brl": "2022-07-04T07:54:02.569Z",
            "btc": "2022-07-04T07:59:53.291Z",
            "cad": "2022-07-04T07:59:53.291Z",
            "chf": "2022-07-04T07:59:53.291Z",
            "clp": "2022-07-04T07:54:02.569Z",
            "cny": "2022-07-04T07:54:02.569Z",
            "czk": "2022-07-04T07:54:02.569Z",
            "dkk": "2022-07-04T07:54:02.569Z",
            "dot": "2022-07-04T08:20:59.436Z",
            "eos": "2022-07-04T08:23:47.631Z",
            "eth": "2022-07-04T08:23:47.631Z",
            "eur": "2022-07-04T07:54:02.569Z",
            "gbp": "2022-07-04T08:03:24.254Z",
            "gel": "2024-03-07T01:34:51.048Z",
            "hkd": "2022-07-04T07:54:02.569Z",
            "huf": "2022-07-04T07:59:53.291Z",
            "idr": "2022-07-04T07:54:02.569Z",
            "ils": "2022-07-04T08:03:24.254Z",
            "inr": "2022-07-04T07:54:02.569Z",
            "jpy": "2022-07-04T07:54:02.569Z",
            "krw": "2022-07-04T07:54:02.569Z",
            "kwd": "2022-07-04T07:54:02.569Z",
            "lkr": "2022-07-04T07:54:02.569Z",
            "ltc": "2022-07-04T08:03:24.254Z",
            "mmk": "2022-07-04T07:54:02.569Z",
            "mxn": "2022-07-04T07:54:02.569Z",
            "myr": "2022-07-04T07:54:02.569Z",
            "ngn": "2022-07-04T07:54:02.569Z",
            "nok": "2022-07-04T08:03:24.254Z",
            "nzd": "2022-07-04T07:59:53.291Z",
            "php": "2022-07-04T07:54:02.569Z",
            "pkr": "2022-07-04T07:54:02.569Z",
            "pln": "2022-07-04T07:54:02.569Z",
            "rub": "2022-07-04T07:59:53.291Z",
            "sar": "2022-07-04T07:54:02.569Z",
            "sek": "2022-07-04T07:54:02.569Z",
            "sgd": "2022-07-04T07:54:02.569Z",
            "thb": "2022-07-04T08:03:24.254Z",
            "try": "2022-07-04T07:54:02.569Z",
            "twd": "2022-07-04T07:54:02.569Z",
            "uah": "2022-07-04T07:54:02.569Z",
            "usd": "2022-07-04T07:54:02.569Z",
            "vef": "2022-07-04T07:54:02.569Z",
            "vnd": "2022-07-04T07:54:02.569Z",
            "xag": "2022-07-04T08:03:24.254Z",
            "xau": "2022-07-04T07:54:02.569Z",
            "xdr": "2022-07-04T07:54:02.569Z",
            "xlm": "2022-07-04T08:14:58.744Z",
            "xrp": "2022-07-04T08:23:47.631Z",
            "yfi": "2022-07-04T08:29:41.435Z",
            "zar": "2022-07-04T07:54:02.569Z",
            "bits": "2022-07-04T07:59:53.291Z",
            "link": "2022-07-04T08:23:47.631Z",
            "sats": "2022-07-04T07:59:53.291Z"
        },
        "market_cap": {
            "aed": 0,
            "ars": 0,
            "aud": 0,
            "bch": 0,
            "bdt": 0,
            "bhd": 0,
            "bmd": 0,
            "bnb": 0,
            "brl": 0,
            "btc": 0,
            "cad": 0,
            "chf": 0,
            "clp": 0,
            "cny": 0,
            "czk": 0,
            "dkk": 0,
            "dot": 0,
            "eos": 0,
            "eth": 0,
            "eur": 0,
            "gbp": 0,
            "gel": 0,
            "hkd": 0,
            "huf": 0,
            "idr": 0,
            "ils": 0,
            "inr": 0,
            "jpy": 0,
            "krw": 0,
            "kwd": 0,
            "lkr": 0,
            "ltc": 0,
            "mmk": 0,
            "mxn": 0,
            "myr": 0,
            "ngn": 0,
            "nok": 0,
            "nzd": 0,
            "php": 0,
            "pkr": 0,
            "pln": 0,
            "rub": 0,
            "sar": 0,
            "sek": 0,
            "sgd": 0,
            "thb": 0,
            "try": 0,
            "twd": 0,
            "uah": 0,
            "usd": 0,
            "vef": 0,
            "vnd": 0,
            "xag": 0,
            "xau": 0,
            "xdr": 0,
            "xlm": 0,
            "xrp": 0,
            "yfi": 0,
            "zar": 0,
            "bits": 0,
            "link": 0,
            "sats": 0
        },
        "market_cap_rank": null,
        "fully_diluted_valuation": {
            "aed": 77663,
            "ars": 19251841,
            "aud": 31644,
            "bch": 55.018,
            "bdt": 2485890,
            "bhd": 7961.08,
            "bmd": 21144,
            "bnb": 37.085514,
            "brl": 118273,
            "btc": 0.3473357,
            "cad": 28956,
            "chf": 19005.94,
            "clp": 20024802,
            "cny": 153663,
            "czk": 494092,
            "dkk": 147205,
            "dot": 3423,
            "eos": 36426,
            "eth": 6.24238,
            "eur": 19723.94,
            "gbp": 16716.25,
            "gel": 59204,
            "hkd": 165120,
            "huf": 7797631,
            "idr": 345720414,
            "ils": 79629,
            "inr": 1762759,
            "jpy": 3402238,
            "krw": 29206333,
            "kwd": 6486.26,
            "lkr": 6472032,
            "ltc": 284.368,
            "mmk": 52478492,
            "mxn": 387757,
            "myr": 99749,
            "ngn": 29729023,
            "nok": 225846,
            "nzd": 34720,
            "php": 1235044,
            "pkr": 5889333,
            "pln": 85104,
            "rub": 1811163,
            "sar": 79330,
            "sek": 224152,
            "sgd": 28680,
            "thb": 776008,
            "try": 692232,
            "twd": 687605,
            "uah": 856765,
            "usd": 21144,
            "vef": 2117.19,
            "vnd": 538230892,
            "xag": 725.64,
            "xau": 9.09,
            "xdr": 16058.66,
            "xlm": 231956,
            "xrp": 44440,
            "yfi": 3.250395,
            "zar": 384849,
            "bits": 347336,
            "link": 1525,
            "sats": 34733570
        },
        "market_cap_fdv_ratio": null,
        "total_volume": {
            "aed": 4.91,
            "ars": 1218.33,
            "aud": 2,
            "bch": 0.00348276,
            "bdt": 157.32,
            "bhd": 0.503809,
            "bmd": 1.34,
            "bnb": 0.00234651,
            "brl": 7.48,
            "btc": 0.00002197,
            "cad": 1.83,
            "chf": 1.2,
            "clp": 1267.25,
            "cny": 9.72,
            "czk": 31.27,
            "dkk": 9.32,
            "dot": 0.21655634,
            "eos": 2.305835,
            "eth": 0.00039495,
            "eur": 1.25,
            "gbp": 1.058,
            "gel": 3.75,
            "hkd": 10.45,
            "huf": 493.47,
            "idr": 21879,
            "ils": 5.04,
            "inr": 111.55,
            "jpy": 215.31,
            "krw": 1848.29,
            "kwd": 0.410476,
            "lkr": 409.58,
            "ltc": 0.01800144,
            "mmk": 3321.05,
            "mxn": 24.54,
            "myr": 6.31,
            "ngn": 1881.37,
            "nok": 14.29,
            "nzd": 2.2,
            "php": 78.16,
            "pkr": 372.7,
            "pln": 5.39,
            "rub": 114.62,
            "sar": 5.02,
            "sek": 14.19,
            "sgd": 1.82,
            "thb": 49.11,
            "try": 43.81,
            "twd": 43.51,
            "uah": 54.22,
            "usd": 1.34,
            "vef": 0.133984,
            "vnd": 34061,
            "xag": 0.04592134,
            "xau": 0.0005751,
            "xdr": 1.016,
            "xlm": 14.679896,
            "xrp": 2.811719,
            "yfi": 0.00020555,
            "zar": 24.35,
            "bits": 21.97,
            "link": 0.09647266,
            "sats": 2197.41
        },
        "high_24h": {
            "aed": 0.00121697,
            "ars": 0.301833,
            "aud": 0.00049859,
            "bch": 8.4838e-7,
            "bdt": 0.03895281,
            "bhd": 0.00012489,
            "bmd": 0.00033132,
            "bnb": 5.76068e-7,
            "brl": 0.00182274,
            "btc": 5.395e-9,
            "cad": 0.00045417,
            "chf": 0.00029808,
            "clp": 0.316291,
            "cny": 0.0024067,
            "czk": 0.00774654,
            "dkk": 0.00231022,
            "dot": 0.00005273,
            "eos": 0.0005672,
            "eth": 9.6533e-8,
            "eur": 0.00030976,
            "gbp": 0.00026215,
            "gel": 0.00092771,
            "hkd": 0.0025873,
            "huf": 0.122342,
            "idr": 5.41,
            "ils": 0.00124528,
            "inr": 0.02762536,
            "jpy": 0.053279,
            "krw": 0.456471,
            "kwd": 0.00010163,
            "lkr": 0.101414,
            "ltc": 0.00000451,
            "mmk": 0.822315,
            "mxn": 0.00608441,
            "myr": 0.00156368,
            "ngn": 0.502253,
            "nok": 0.00353118,
            "nzd": 0.00054565,
            "php": 0.01936967,
            "pkr": 0.092283,
            "pln": 0.00133537,
            "rub": 0.02841508,
            "sar": 0.00124299,
            "sek": 0.00352404,
            "sgd": 0.00044934,
            "thb": 0.01217687,
            "try": 0.01091214,
            "twd": 0.01075118,
            "uah": 0.01342514,
            "usd": 0.00033132,
            "vef": 0.00003318,
            "vnd": 8.43,
            "xag": 0.00001132,
            "xau": 1.4228e-7,
            "xdr": 0.00025174,
            "xlm": 0.00360079,
            "xrp": 0.00069496,
            "yfi": 5.4775e-8,
            "zar": 0.00602923,
            "bits": 0.00539549,
            "link": 0.00002345,
            "sats": 0.539549
        },
        "low_24h": {
            "aed": 0.00117297,
            "ars": 0.291175,
            "aud": 0.0004786,
            "bch": 7.93462e-7,
            "bdt": 0.03754494,
            "bhd": 0.00012037,
            "bmd": 0.00031935,
            "bnb": 5.53632e-7,
            "brl": 0.00176051,
            "btc": 5.194e-9,
            "cad": 0.00043699,
            "chf": 0.0002872,
            "clp": 0.302799,
            "cny": 0.00232016,
            "czk": 0.00747122,
            "dkk": 0.00222509,
            "dot": 0.00004991,
            "eos": 0.00053663,
            "eth": 9.2468e-8,
            "eur": 0.00029832,
            "gbp": 0.00025275,
            "gel": 0.00089418,
            "hkd": 0.00249388,
            "huf": 0.117818,
            "idr": 5.22,
            "ils": 0.00120195,
            "inr": 0.0266191,
            "jpy": 0.051242,
            "krw": 0.440327,
            "kwd": 0.00009796,
            "lkr": 0.097749,
            "ltc": 0.00000429,
            "mmk": 0.792594,
            "mxn": 0.00583842,
            "myr": 0.00150653,
            "ngn": 0.45278,
            "nok": 0.00340468,
            "nzd": 0.00052407,
            "php": 0.01866256,
            "pkr": 0.088948,
            "pln": 0.00128562,
            "rub": 0.02728637,
            "sar": 0.00119814,
            "sek": 0.00338609,
            "sgd": 0.00043292,
            "thb": 0.01172448,
            "try": 0.01045785,
            "twd": 0.01036142,
            "uah": 0.01293992,
            "usd": 0.00031935,
            "vef": 0.00003198,
            "vnd": 8.13,
            "xag": 0.0000108,
            "xau": 1.36821e-7,
            "xdr": 0.00024254,
            "xlm": 0.003444,
            "xrp": 0.00066694,
            "yfi": 4.8517e-8,
            "zar": 0.00580491,
            "bits": 0.00519368,
            "link": 0.00002201,
            "sats": 0.519368
        },
        "price_change_24h": -0.000009112315219723,
        "price_change_percentage_24h": -2.7521,
        "price_change_percentage_7d": -12.74985,
        "price_change_percentage_14d": -17.83763,
        "price_change_percentage_30d": -40.34758,
        "price_change_percentage_60d": -36.96043,
        "price_change_percentage_200d": -63.61724,
        "price_change_percentage_1y": -3.64912,
        "market_cap_change_24h": 0,
        "market_cap_change_percentage_24h": 0,
        "price_change_24h_in_currency": {
            "aed": -0.000033486088985687,
            "ars": -0.008458710948524573,
            "aud": -0.000016610750326777,
            "bch": -2.7459394e-11,
            "bdt": -0.001071310370030262,
            "bhd": -0.000003572921279045,
            "bmd": -0.000009112315219723,
            "bnb": -1.0937058006e-8,
            "brl": -0.000020442887773059,
            "btc": -1.06013769e-10,
            "cad": -0.00001292419451768,
            "chf": -0.000008395685281177,
            "clp": -0.011139583969305868,
            "cny": -0.000065692162519681,
            "czk": -0.000220029904444837,
            "dkk": -0.000066566963725932,
            "dot": -5.39826811347e-7,
            "eos": -0.000011892021563052,
            "eth": -1.398687767e-9,
            "eur": -0.000009146804468722,
            "gbp": -0.000007482767009716,
            "gel": -0.000025514482615225,
            "hkd": -0.000071038583557501,
            "huf": -0.003548837596600657,
            "idr": -0.14510613813415496,
            "ils": -0.000032657694100561,
            "inr": -0.00077277043612322,
            "jpy": -0.001469384872883173,
            "krw": -0.011710948488372508,
            "kwd": -0.000002792976091092,
            "lkr": -0.002789164208386416,
            "ltc": -1.60133688825e-7,
            "mmk": -0.02261594626698249,
            "mxn": -0.000170564901623865,
            "myr": -0.000043649554394808,
            "ngn": -0.04920020884897469,
            "nok": -0.000090798885526025,
            "nzd": -0.000016717939316408,
            "php": -0.000561554938982491,
            "pkr": -0.00253804644237321,
            "pln": -0.000038784893034261,
            "rub": -0.000810174262070879,
            "sar": -0.000034064605033664,
            "sek": -0.000108188282195255,
            "sgd": -0.000012524502889456,
            "thb": -0.000358958463702564,
            "try": -0.000364535490757673,
            "twd": -0.000280178022039175,
            "uah": -0.000369228643501194,
            "usd": -0.000009112315219723,
            "vef": -9.12416122951e-7,
            "vnd": -0.22980813571770753,
            "xag": -2.62636152475e-7,
            "xau": -3.787251526e-9,
            "xdr": -0.0000070245512671,
            "xlm": -0.000064989000964128,
            "xrp": -0.000015952452543273,
            "yfi": -1.608698945e-9,
            "zar": -0.000167569028547056,
            "bits": -0.000106013768675126,
            "link": -1.12621671092e-7,
            "sats": -0.010601376867512611
        },
        "price_change_percentage_1h_in_currency": {
            "aed": 0.61618,
            "ars": 0.61618,
            "aud": 0.61618,
            "bch": 1.22978,
            "bdt": 0.61618,
            "bhd": 0.61618,
            "bmd": 0.61618,
            "bnb": 0.54683,
            "brl": 0.61618,
            "btc": 0.72478,
            "cad": 0.61618,
            "chf": 0.61618,
            "clp": 0.61618,
            "cny": 0.61618,
            "czk": 0.61618,
            "dkk": 0.61618,
            "dot": 1.1341,
            "eos": 1.26763,
            "eth": 0.82775,
            "eur": 0.61618,
            "gbp": 0.61618,
            "gel": 0.61618,
            "hkd": 0.61618,
            "huf": 0.61618,
            "idr": 0.61618,
            "ils": 0.61618,
            "inr": 0.61618,
            "jpy": 0.61618,
            "krw": 0.61618,
            "kwd": 0.61618,
            "lkr": 0.61618,
            "ltc": 0.26051,
            "mmk": 0.61618,
            "mxn": 0.61618,
            "myr": 0.61618,
            "ngn": -6.67831,
            "nok": 0.61618,
            "nzd": 0.61618,
            "php": 0.61618,
            "pkr": 0.61618,
            "pln": 0.61618,
            "rub": 0.61618,
            "sar": 0.61618,
            "sek": 0.61618,
            "sgd": 0.61618,
            "thb": 0.61618,
            "try": 0.61618,
            "twd": 0.61618,
            "uah": 0.61618,
            "usd": 0.61618,
            "vef": 0.61618,
            "vnd": 0.61618,
            "xag": 0.61618,
            "xau": 0.61618,
            "xdr": 0.61618,
            "xlm": 0.87029,
            "xrp": 0.43967,
            "yfi": 1.17436,
            "zar": 0.61618,
            "bits": 0.72478,
            "link": 1.20842,
            "sats": 0.72478
        },
        "price_change_percentage_24h_in_currency": {
            "aed": -2.75343,
            "ars": -2.80434,
            "aud": -3.33222,
            "bch": -0.00328,
            "bdt": -2.7521,
            "bhd": -2.86278,
            "bmd": -2.7521,
            "bnb": -1.90016,
            "brl": -1.12229,
            "btc": -1.96551,
            "cad": -2.84752,
            "chf": -2.81903,
            "clp": -3.52428,
            "cny": -2.73069,
            "czk": -2.84124,
            "dkk": -2.88389,
            "dot": -1.0253,
            "eos": -2.09828,
            "eth": -1.45037,
            "eur": -2.95528,
            "gbp": -2.85557,
            "gel": -2.7521,
            "hkd": -2.74756,
            "huf": -2.90192,
            "idr": -2.68228,
            "ils": -2.62256,
            "inr": -2.79823,
            "jpy": -2.75789,
            "krw": -2.56554,
            "kwd": -2.74988,
            "lkr": -2.7521,
            "ltc": -3.56496,
            "mmk": -2.7521,
            "mxn": -2.80747,
            "myr": -2.79331,
            "ngn": -9.8024,
            "nok": -2.57218,
            "nzd": -3.06504,
            "php": -2.89924,
            "pkr": -2.7521,
            "pln": -2.90575,
            "rub": -2.85364,
            "sar": -2.74246,
            "sek": -3.07212,
            "sgd": -2.78772,
            "thb": -2.94804,
            "try": -3.34253,
            "twd": -2.60602,
            "uah": -2.7521,
            "usd": -2.7521,
            "vef": -2.7521,
            "vnd": -2.72734,
            "xag": -2.32158,
            "xau": -2.66378,
            "xdr": -2.79229,
            "xlm": -1.80653,
            "xrp": -2.30345,
            "yfi": -3.14994,
            "zar": -2.77978,
            "bits": -1.96551,
            "link": -0.48279,
            "sats": -1.96551
        },
        "price_change_percentage_7d_in_currency": {
            "aed": -12.74985,
            "ars": -12.27352,
            "aud": -13.15559,
            "bch": -12.64429,
            "bdt": -12.51475,
            "bhd": -12.75031,
            "bmd": -12.74985,
            "bnb": -10.32534,
            "brl": -10.15584,
            "btc": -7.91765,
            "cad": -12.77533,
            "chf": -12.22684,
            "clp": -12.18609,
            "cny": -12.67776,
            "czk": -12.55413,
            "dkk": -12.90623,
            "dot": -20.21119,
            "eos": -15.37764,
            "eth": -10.31012,
            "eur": -12.97506,
            "gbp": -12.71883,
            "gel": -12.90538,
            "hkd": -12.70458,
            "huf": -13.20878,
            "idr": -13.42286,
            "ils": -12.60248,
            "inr": -12.95632,
            "jpy": -12.33583,
            "krw": -13.25914,
            "kwd": -12.65646,
            "lkr": -12.35645,
            "ltc": -13.08652,
            "mmk": 3.29323,
            "mxn": -11.65289,
            "myr": -12.66654,
            "ngn": -17.55799,
            "nok": -11.7197,
            "nzd": -12.31287,
            "php": -13.37496,
            "pkr": -12.55584,
            "pln": -13.17128,
            "rub": -16.0109,
            "sar": -12.74915,
            "sek": -11.97346,
            "sgd": -12.67259,
            "thb": -12.6692,
            "try": -12.99356,
            "twd": -12.35948,
            "uah": -12.57608,
            "usd": -12.74985,
            "vef": -12.74985,
            "vnd": -12.76095,
            "xag": -11.54166,
            "xau": -12.96653,
            "xdr": -12.50169,
            "xlm": -13.04712,
            "xrp": -11.2077,
            "yfi": -21.79575,
            "zar": -11.59856,
            "bits": -7.91765,
            "link": -13.80356,
            "sats": -7.91765
        },
        "price_change_percentage_14d_in_currency": {
            "aed": -17.83763,
            "ars": -17.07816,
            "aud": -18.73523,
            "bch": -8.99764,
            "bdt": -17.60672,
            "bhd": -17.78653,
            "bmd": -17.83763,
            "bnb": -12.47783,
            "brl": -14.53268,
            "btc": -10.7822,
            "cad": -18.19009,
            "chf": -17.19601,
            "clp": -16.52251,
            "cny": -17.69606,
            "czk": -16.88006,
            "dkk": -17.88245,
            "dot": -17.20668,
            "eos": -7.17805,
            "eth": -14.37422,
            "eur": -17.85806,
            "gbp": -17.68822,
            "gel": -19.84159,
            "hkd": -17.85236,
            "huf": -18.56414,
            "idr": -18.51565,
            "ils": -16.91655,
            "inr": -18.01847,
            "jpy": -16.02677,
            "krw": -17.95583,
            "kwd": -17.69408,
            "lkr": -17.11217,
            "ltc": -13.01546,
            "mmk": -7.36734,
            "mxn": -18.39962,
            "myr": -17.87243,
            "ngn": -22.75473,
            "nok": -17.84771,
            "nzd": -17.08209,
            "php": -18.24355,
            "pkr": -17.64693,
            "pln": -19.20841,
            "rub": -21.19618,
            "sar": -17.83233,
            "sek": -18.07604,
            "sgd": -17.66159,
            "thb": -17.8232,
            "try": -17.83562,
            "twd": -17.39641,
            "uah": -17.9876,
            "usd": -17.83763,
            "vef": -17.83763,
            "vnd": -17.83762,
            "xag": -16.59845,
            "xau": -17.61527,
            "xdr": -17.47034,
            "xlm": -12.32039,
            "xrp": -17.30675,
            "yfi": -21.9035,
            "zar": -18.51903,
            "bits": -10.7822,
            "link": -11.15208,
            "sats": -10.7822
        },
        "price_change_percentage_30d_in_currency": {
            "aed": -40.34758,
            "ars": -39.23032,
            "aud": -41.00164,
            "bch": -28.2401,
            "bdt": -40.30069,
            "bhd": -40.41405,
            "bmd": -40.34758,
            "bnb": -38.45397,
            "brl": -35.86935,
            "btc": -33.83635,
            "cad": -40.45823,
            "chf": -41.07459,
            "clp": -37.97204,
            "cny": -38.94455,
            "czk": -39.15609,
            "dkk": -39.83007,
            "dot": -32.71562,
            "eos": -18.78772,
            "eth": -34.54327,
            "eur": -39.85608,
            "gbp": -40.06754,
            "gel": -40.24087,
            "hkd": -40.41181,
            "huf": -38.79287,
            "idr": -40.0742,
            "ils": -39.65198,
            "inr": -40.35556,
            "jpy": -38.85195,
            "krw": -40.254,
            "kwd": -40.36877,
            "lkr": -39.72192,
            "ltc": -33.91889,
            "mmk": -29.57163,
            "mxn": -35.8475,
            "myr": -40.21451,
            "ngn": -40.37108,
            "nok": -39.73876,
            "nzd": -40.23256,
            "php": -40.5737,
            "pkr": -40.36451,
            "pln": -39.43112,
            "rub": -43.1808,
            "sar": -40.32931,
            "sek": -40.65722,
            "sgd": -40.14658,
            "thb": -40.60344,
            "try": -39.56088,
            "twd": -40.21199,
            "uah": -40.58347,
            "usd": -40.34758,
            "vef": -40.34758,
            "vnd": -40.35517,
            "xag": -35.55515,
            "xau": -40.15124,
            "xdr": -40.10468,
            "xlm": -31.05192,
            "xrp": -35.40204,
            "yfi": -36.12856,
            "zar": -41.83536,
            "bits": -33.83635,
            "link": -21.26336,
            "sats": -33.83635
        },
        "price_change_percentage_60d_in_currency": {
            "aed": -36.95683,
            "ars": -34.5333,
            "aud": -38.39964,
            "bch": -24.49731,
            "bdt": -32.4821,
            "bhd": -37.03135,
            "bmd": -36.96043,
            "bnb": -33.75649,
            "brl": -31.09832,
            "btc": -34.60539,
            "cad": -36.95399,
            "chf": -37.9254,
            "clp": -36.71628,
            "cny": -36.74457,
            "czk": -37.32094,
            "dkk": -37.00585,
            "dot": -33.21311,
            "eos": -12.8646,
            "eth": -41.26772,
            "eur": -37.04561,
            "gbp": -37.50485,
            "gel": -34.26042,
            "hkd": -37.06892,
            "huf": -36.37143,
            "idr": -36.57308,
            "ils": -36.64446,
            "inr": -37.06962,
            "jpy": -35.31616,
            "krw": -36.98446,
            "kwd": -37.17629,
            "lkr": -35.13528,
            "ltc": -29.67402,
            "mmk": -25.5072,
            "mxn": -32.07586,
            "myr": -37.65427,
            "ngn": -33.11326,
            "nok": -38.90513,
            "nzd": -38.5126,
            "php": -36.24569,
            "pkr": -36.94219,
            "pln": -37.14066,
            "rub": -42.22243,
            "sar": -36.93926,
            "sek": -39.05115,
            "sgd": -37.18458,
            "thb": -37.55779,
            "try": -36.25371,
            "twd": -37.08039,
            "uah": -35.61861,
            "usd": -36.96043,
            "vef": -36.96043,
            "vnd": -36.68681,
            "xag": -42.26619,
            "xau": -37.22189,
            "xdr": -36.92813,
            "xlm": -23.05985,
            "xrp": -32.40163,
            "yfi": -33.98621,
            "zar": -38.65846,
            "bits": -34.60539,
            "link": -36.74823,
            "sats": -34.60539
        },
        "price_change_percentage_200d_in_currency": {
            "aed": -63.6113,
            "ars": -9.45565,
            "aud": -64.13224,
            "bch": -77.79086,
            "bdt": -61.12654,
            "bhd": -63.65556,
            "bmd": -63.61724,
            "bnb": -84.05068,
            "brl": -58.79435,
            "btc": -74.88694,
            "cad": -63.2643,
            "chf": -62.72151,
            "clp": -60.96666,
            "cny": -63.15999,
            "czk": -62.51123,
            "dkk": -63.35742,
            "dot": -57.87184,
            "eos": -50.42015,
            "eth": -75.9721,
            "eur": -63.39364,
            "gbp": -63.8969,
            "gel": -61.84579,
            "hkd": -63.61165,
            "huf": -62.11053,
            "idr": -61.93484,
            "ils": -63.06523,
            "inr": -63.62503,
            "jpy": -59.74349,
            "krw": -61.69734,
            "kwd": -63.80708,
            "lkr": -65.98213,
            "ltc": -64.09919,
            "mmk": -57.01385,
            "mxn": -61.55611,
            "myr": -63.36094,
            "ngn": -35.20689,
            "nok": -64.41036,
            "nzd": -63.26925,
            "php": -61.77882,
            "pkr": -64.31086,
            "pln": -63.59721,
            "rub": -65.50996,
            "sar": -63.60638,
            "sek": -63.15043,
            "sgd": -63.23271,
            "thb": -62.53,
            "try": -58.97061,
            "twd": -62.41561,
            "uah": -60.04653,
            "usd": -63.61724,
            "vef": -63.61724,
            "vnd": -61.84371,
            "xag": -71.42563,
            "xau": -68.95707,
            "xdr": -63.27747,
            "xlm": -50.09958,
            "xrp": -52.35066,
            "yfi": -52.36601,
            "zar": -65.16792,
            "bits": -74.88694,
            "link": -60.52346,
            "sats": -74.88694
        },
        "price_change_percentage_1y_in_currency": {
            "aed": -3.65175,
            "ars": 242.87085,
            "aud": -4.54969,
            "bch": -42.38144,
            "bdt": 4.24709,
            "bhd": -3.78329,
            "bmd": -3.64912,
            "bnb": -60.59538,
            "brl": 11.05466,
            "btc": -51.93008,
            "cad": -0.54068,
            "chf": -3.45687,
            "clp": 13.99298,
            "cny": -3.32854,
            "czk": 3.76437,
            "dkk": -1.69886,
            "dot": -23.14469,
            "eos": 11.84784,
            "eth": -47.45601,
            "eur": -1.90891,
            "gbp": -3.67934,
            "gel": 3.56332,
            "hkd": -3.97602,
            "huf": 4.55711,
            "idr": 5.0948,
            "ils": -1.5409,
            "inr": -2.11374,
            "jpy": 7.45447,
            "krw": 1.13004,
            "kwd": -3.85598,
            "lkr": -4.35907,
            "ltc": 8.68908,
            "mmk": 13.8197,
            "mxn": 3.39237,
            "myr": -2.70036,
            "ngn": 76.3883,
            "nok": -4.62072,
            "nzd": -3.80097,
            "php": 1.7548,
            "pkr": -6.37901,
            "pln": -5.03575,
            "rub": -5.41929,
            "sar": -3.62382,
            "sek": -5.09528,
            "sgd": -3.43633,
            "thb": -0.80464,
            "try": 21.04376,
            "twd": 0.86603,
            "uah": 5.27001,
            "usd": -3.64912,
            "vef": -3.64912,
            "vnd": 4.05209,
            "xag": -24.71032,
            "xau": -21.06846,
            "xdr": -2.85273,
            "xlm": 7.91773,
            "xrp": -5.41396,
            "yfi": -7.39956,
            "zar": -6.00204,
            "bits": -51.93008,
            "link": -59.19743,
            "sats": -51.93008
        },
        "market_cap_change_24h_in_currency": {
            "aed": 0,
            "ars": 0,
            "aud": 0,
            "bch": 0,
            "bdt": 0,
            "bhd": 0,
            "bmd": 0,
            "bnb": 0,
            "brl": 0,
            "btc": 0,
            "cad": 0,
            "chf": 0,
            "clp": 0,
            "cny": 0,
            "czk": 0,
            "dkk": 0,
            "dot": 0,
            "eos": 0,
            "eth": 0,
            "eur": 0,
            "gbp": 0,
            "gel": 0,
            "hkd": 0,
            "huf": 0,
            "idr": 0,
            "ils": 0,
            "inr": 0,
            "jpy": 0,
            "krw": 0,
            "kwd": 0,
            "lkr": 0,
            "ltc": 0,
            "mmk": 0,
            "mxn": 0,
            "myr": 0,
            "ngn": 0,
            "nok": 0,
            "nzd": 0,
            "php": 0,
            "pkr": 0,
            "pln": 0,
            "rub": 0,
            "sar": 0,
            "sek": 0,
            "sgd": 0,
            "thb": 0,
            "try": 0,
            "twd": 0,
            "uah": 0,
            "usd": 0,
            "vef": 0,
            "vnd": 0,
            "xag": 0,
            "xau": 0,
            "xdr": 0,
            "xlm": 0,
            "xrp": 0,
            "yfi": 0,
            "zar": 0,
            "bits": 0,
            "link": 0,
            "sats": 0
        },
        "market_cap_change_percentage_24h_in_currency": {
            "aed": 0,
            "ars": 0,
            "aud": 0,
            "bch": 0,
            "bdt": 0,
            "bhd": 0,
            "bmd": 0,
            "bnb": 0,
            "brl": 0,
            "btc": 0,
            "cad": 0,
            "chf": 0,
            "clp": 0,
            "cny": 0,
            "czk": 0,
            "dkk": 0,
            "dot": 0,
            "eos": 0,
            "eth": 0,
            "eur": 0,
            "gbp": 0,
            "gel": 0,
            "hkd": 0,
            "huf": 0,
            "idr": 0,
            "ils": 0,
            "inr": 0,
            "jpy": 0,
            "krw": 0,
            "kwd": 0,
            "lkr": 0,
            "ltc": 0,
            "mmk": 0,
            "mxn": 0,
            "myr": 0,
            "ngn": 0,
            "nok": 0,
            "nzd": 0,
            "php": 0,
            "pkr": 0,
            "pln": 0,
            "rub": 0,
            "sar": 0,
            "sek": 0,
            "sgd": 0,
            "thb": 0,
            "try": 0,
            "twd": 0,
            "uah": 0,
            "usd": 0,
            "vef": 0,
            "vnd": 0,
            "xag": 0,
            "xau": 0,
            "xdr": 0,
            "xlm": 0,
            "xrp": 0,
            "yfi": 0,
            "zar": 0,
            "bits": 0,
            "link": 0,
            "sats": 0
        },
        "total_supply": 65658824,
        "max_supply": null,
        "circulating_supply": 0,
        "last_updated": "2024-06-29T09:02:35.237Z"
    },
    "community_data": {
        "facebook_likes": null,
        "twitter_followers": 586,
        "reddit_average_posts_48h": 0,
        "reddit_average_comments_48h": 0,
        "reddit_subscribers": 0,
        "reddit_accounts_active_48h": 0,
        "telegram_channel_user_count": 288
    },
    "developer_data": {
        "forks": 11,
        "stars": 16,
        "subscribers": 7,
        "total_issues": 8,
        "closed_issues": 3,
        "pull_requests_merged": 33,
        "pull_request_contributors": 4,
        "code_additions_deletions_4_weeks": {
            "additions": 0,
            "deletions": 0
        },
        "commit_count_4_weeks": 0,
        "last_4_weeks_commit_activity_series": []
    },
    "status_updates": [],
    "last_updated": "2024-06-29T09:02:35.237Z",
    "tickers": [
        {
            "base": "ZOC",
            "target": "USDT",
            "market": {
                "name": "XeggeX",
                "identifier": "xeggex",
                "has_trading_incentive": false
            },
            "last": 0.0003224,
            "volume": 4154.7963,
            "converted_last": {
                "btc": 5.288e-9,
                "eth": 9.5044e-8,
                "usd": 0.00032192
            },
            "converted_volume": {
                "btc": 0.00002197,
                "eth": 0.00039498,
                "usd": 1.34
            },
            "trust_score": "yellow",
            "bid_ask_spread_percentage": 0.620155,
            "timestamp": "2024-06-29T08:26:45+00:00",
            "last_traded_at": "2024-06-29T08:26:45+00:00",
            "last_fetch_at": "2024-06-29T09:01:40+00:00",
            "is_anomaly": false,
            "is_stale": false,
            "trade_url": "https://xeggex.com/market/ZOC_USDT",
            "token_info_url": null,
            "coin_id": "01coin",
            "target_coin_id": "tether"
        },
        {
            "base": "ZOC",
            "target": "BTC",
            "market": {
                "name": "Graviex",
                "identifier": "graviex",
                "has_trading_incentive": false
            },
            "last": 7e-9,
            "volume": 59,
            "converted_last": {
                "btc": 7e-9,
                "eth": 1.25931e-7,
                "usd": 0.00042669
            },
            "converted_volume": {
                "btc": 4.13e-7,
                "eth": 0.00000743,
                "usd": 0.02517497
            },
            "trust_score": "red",
            "bid_ask_spread_percentage": 12.5,
            "timestamp": "2024-06-25T22:31:16+00:00",
            "last_traded_at": "2024-06-25T22:31:16+00:00",
            "last_fetch_at": "2024-06-26T22:23:02+00:00",
            "is_anomaly": false,
            "is_stale": true,
            "trade_url": "https://graviex.net/markets/zocbtc",
            "token_info_url": null,
            "coin_id": "01coin",
            "target_coin_id": "bitcoin"
        }
    ]
}

init();



