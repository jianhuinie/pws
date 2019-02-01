const parseCookie = cookieStr => {
    const cookieObj = {};
    // const reg = /(\w+)=(\w+);\s/g;
    const reg = /([^=]+)=([^;]+);?\s*/g;
    while ((result = reg.exec(cookieStr)) !== null) {
        // const result = reg.exec(cookieStr);
        console.log(result);
        cookieObj[result[1]] = result[2];
    }
    console.log(cookieObj);
}
parseCookie('__guid__=e23824ec-d4ad-1eb4-8071-38e643ffc40a; _9755xjdesxxd_=32; CITY_ID=17039360; CITY_NAME=%E5%8C%97%E4%BA%AC; CITY_DOMAIN=bj; _ga=GA1.2.1904327900.1545190427; LOGIN_USERNAME_REMEMBER=1; LOGIN_USERNAME=8%23)%2B%2C%2C%19%1B%12%14%1B; __track_id__=5c2ca3428006a02331ba9fb4ffbdccc3e38d272d; gdxidpyhxdE=iQ4XlWYwdoTaSpk5Pco6BJz%2Bia4xUR8C5lKhjLGC1rx8GVhWMMg74jxLgxTKaf7fxqO0GTu6mVEnql67mVdw8sTpIxWHYwYTJDH8iffTS3TAtRcwVP3%2Fzrt0qf9h9uLLyaJbzLte0dE%2B0HkAhqoUZGPx0%5CwBB7f%5CAcaW58QeJKbV5fLu%3A1547016811148; AUTH_TOKEN=HYAnaWp7bmhqZG5pJz81MSd6eGp3ZG5pJz85Pjs7Pz48Mih7eWt4en92ayhAODIoZ3Z2ZXp_dmsoQDwzKWp7KUE4PDs_ODc-P0A-Myl6aHN7KUEpcD1UXng9fk4qhQ; PHPSESSID=aiqrm2qj5s1jb0a62ggqafuk37; _const_dession_id_=1bab2880d23c43aea91787bb9dabd157; LAT=39.91488908; LNG=116.40387397; SHOWSEEK=1548230138');