const Botgram = require('botgram');
const figlet = require('figlet');

const { getGender } = require('persian-gender-detection');

const weather = require('yahoo-weather');
var currentState = 'inital';
//#region strings

const nameUnknown = 'این اسمو بلد نیستم 😥'
const genderIsGirl = 'دختره 👧'
const genderIsBoy = 'پسره 👦'

const genderDetection = 'تشخیص جنسیت از اسم 🚻';

const weatherExample = 'tehran';
const weatherExample2 = 'karaj';
const weatherExample3 = 'rasht';

 const nameExample = 'نوید';
 const nameExample2 = 'بهاره';
 const nameExample3 = 'احسان';


const asciiExample = 'nav\nid\n!!';
const asciiExample2 = 'sal\nam\n!!';
// #region weather conditions

const rain = 'Rain';
const rainFa = 'بارونی ⛈';
const mostlySunny = 'Mostly Sunny';
const mostlySunnyFa = 'اکثرا آفتابی 🌤';

const partlyCloudy = 'Partly Cloudy';
const partlyCloudyFa = 'نیمه ابری ⛅';

const mostlyCloudy = 'Mostly Cloudy';
const mostlyCloudyFa = 'ابری 🌥';

const cloudy = 'Cloudy';
const cloudyFa = 'ابری ☁';

const showers = 'Showers';
const showersFa = 'بارونی 🌧';

const clear = 'Clear';
const clearFa = 'صاف 🌞';

const scatteredShowers = 'Scattered Showers';
const scatteredShowersFa = 'باران پراکنده 🌦';

const sunny = 'Sunny';
const sunnyFa = 'آفتابی ☀';

const blustery = 'Blustery';
const blusteryFa = 'وزش شدید 💨';

const fair = 'Fair';
const fairFa = 'ملایم 🌞';

const scatteredThunderstorms = 'Scattered Thunderstorms';
const scatteredThunderstormsFa = 'رعد و برق های پراکنده 🌩';

const thunderstorms = 'Thunderstorms';
const thunderstormsFa = 'رعد و برق ⚡';

const snowy = 'Snowy';
const snowyFa = 'برفی ❄';
//#endregion

var tempUnit='c';
var tempTxt ='';
const farenheit = 'درجه فارنهایت';
const celisius = 'درجه سانتی گراد';
const start = 'start';
const genderDetectionMessage = 'یه اسم وارد کن تا جنسیتشو ببینی 😌';
const weatherMessage = 'اسم شهری که میخوای هواشو بدونی بنویس یا از منوی زیر انتخاب کن !!(برای نتیجه بهتر انگلیسی تایپ کن) 😎';
const weatherTxt = 'وضع آب و هوا ⛅';
const asciiError = 'لطفا فقط از کاراکتر ها و اعداد انگلیسی استفاده کن. ! 🤓';
const asciiMessage = ' یک نوشته برای تبدیل به شکل تایپ کن یا از منوی زیر انتخاب کن .!! 😛';
const mainMenuMessage = 'یک گزینه از منوی زیر انتخاب کن.!! 🙂';
const mainMenu = 'منوی اصلی🏠';
const ascii = 'تبدیل کلمه به شکل 🐱';
//#endregion
//#region keyboards
var mainKeyboard = [
  [ ascii, weatherTxt , genderDetection ],
];
var asciiKeyboard = [
  [ asciiExample, asciiExample2 ],
  [ mainMenu ],
];
var weatherKeyboard = [
  [ weatherExample, weatherExample2, weatherExample3 ],
  [ mainMenu ],
];
var genderDetectionKeyboard = [
  [ nameExample, nameExample2, nameExample3 ],
  [ mainMenu ],
];
//#endregion
//#region bot related
const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}
const bot = new Botgram(TELEGRAM_BOT_TOKEN);


bot.command(start,function (msg, reply, next) {
  showMainMenu(msg,reply);
});
//#endregion





//#region my functions

function replyGender(name,reply) {
    const gender = getGender(name);
    switch (gender) {
      case 'MALE':
      {
        reply.markdown(genderIsBoy);
        break;

      }
        
      case 'FEMALE':
      {
        reply.markdown(genderIsGirl);
        break;
      }
      default:
    {  
        reply.markdown(nameUnknown);
        break;
    }
    }
}


function translateWeatherText(text) {
  switch (text) {
    case mostlySunny:
      return mostlySunnyFa
    case partlyCloudy:
    
      return partlyCloudyFa;
      case rain:
      return rainFa;
      
    case mostlyCloudy:
    
      return mostlyCloudyFa;
    
    case snowy:
    
      return snowyFa;
    

    case cloudy:
    
      return cloudyFa;
    

    case showers:
    
      return showersFa;
    
  case thunderstorms:
    
      return thunderstormsFa;
    

    case scatteredShowers:
    
      return scatteredShowersFa;
    

    case scatteredThunderstorms:
    
      return scatteredThunderstormsFa;
    
  
    case clear:
    
      return clearFa;
    
    case sunny:
    
      return sunnyFa;
    
    case fair:
    
      return fairFa;
    

    case blustery:
    
      return blusteryFa;
    
    default:
      return text;
  }
}

function showAsciiMenu(msg,reply) {
  currentState = ascii;
  reply.keyboard(asciiKeyboard, true).text(asciiMessage);
}

function showWeatherMenu(msg,reply) {
  currentState = weatherTxt;
  reply.keyboard(weatherKeyboard, true).text(weatherMessage);
}

function showMainMenu(msg,reply) {
  currentState = mainMenu;
  reply.keyboard(mainKeyboard, true).text(mainMenuMessage);
}

function showGenderDetectionMenu(msg,reply) {
  currentState = genderDetection;
  reply.keyboard(genderDetectionKeyboard, true).text(genderDetectionMessage);
}
//#endregion


function onMessage(msg, reply) {
 switch (msg.text) {
   case weatherTxt:
     {
      showWeatherMenu(msg,reply);
        return;
     }
     case mainMenu:
     {
      showMainMenu(msg,reply);
        return;
     }
     case ascii:
     {
      showAsciiMenu(msg,reply);
        return;
     }
     case genderDetection:
     {
        showGenderDetectionMenu(msg,reply);
        return;
     }
   default:
     break;
 }
  switch (currentState) {
    case mainMenu:
      {
        showMainMenu(msg,reply);
        break;
      }
        case ascii:
        {
          figlet(msg.text, function(err, data) {
            if (err) {
               reply.markdown(asciiError);
                return;
            }
            const markdownResult = `${'```\n'}${data}${'\n```'}`;
            reply.markdown(markdownResult).then(function (err, sentMessage) {
              if(err)
               reply.markdown(asciiError);
              
            // sentMessage is a Message object with a file property, just like other photo messages
          });});
          break;
        }
        case weatherTxt:
        {
          weather(msg.text, tempUnit).then(info => { 
            if(tempUnit == 'c')
              tempTxt = celisius;
            else tempTxt = farenheit;            
            // second arg is the weather unit. you can pass 'c' or 'f'. defaults to 'c'.
              reply.markdown('هوای شهر  '+ info.location.city + 'در استان '+ 
              info.location.region+ ' در کشور ' + info.location.country+
               ' در این تاریخ: '+ ' \n' +
              info.item.pubDate + '\n'+  'از این قراره : \n '+
               'دما: '+ info.item.condition.temp +  tempTxt +
               '\n'+
              'رطوبت: '+info.atmosphere.humidity + '\n'+ 'وضعیت هوا:' + 
              translateWeatherText(info.item.condition.text)+ '\n'
              +'سرعت باد:'+info.wind.speed + ' کیلومتر در ساعت'); // Do what you want with `info`!
            }).catch(err => {
              reply.markdown('اسم شهرو درست وارد کن!!');
              // Oops! Errors! :(
            });
          break;
        }
        case genderDetection:
        {
          replyGender(msg.text,reply);
          break;
        }
    default:
    {
      showMainMenu(msg,reply);
      break;
    }
      
      }
    }

bot.text(onMessage);