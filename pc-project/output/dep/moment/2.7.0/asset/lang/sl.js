!function(e){if("function"==typeof define&&define.amd)define("moment/lang/sl",["moment"],e);else if("object"==typeof exports)module.exports=e(require("../moment"));else e(window.moment)}(function(e){function s(e,s,n){var t=e+" ";switch(n){case"m":return s?"ena minuta":"eno minuto";case"mm":if(1===e)t+="minuta";else if(2===e)t+="minuti";else if(3===e||4===e)t+="minute";else t+="minut";return t;case"h":return s?"ena ura":"eno uro";case"hh":if(1===e)t+="ura";else if(2===e)t+="uri";else if(3===e||4===e)t+="ure";else t+="ur";return t;case"dd":if(1===e)t+="dan";else t+="dni";return t;case"MM":if(1===e)t+="mesec";else if(2===e)t+="meseca";else if(3===e||4===e)t+="mesece";else t+="mesecev";return t;case"yy":if(1===e)t+="leto";else if(2===e)t+="leti";else if(3===e||4===e)t+="leta";else t+="let";return t}}return e.lang("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[prejšnja] dddd [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"%s nazaj",s:"nekaj sekund",m:s,mm:s,h:s,hh:s,d:"en dan",dd:s,M:"en mesec",MM:s,y:"eno leto",yy:s},ordinal:"%d.",week:{dow:1,doy:7}})});