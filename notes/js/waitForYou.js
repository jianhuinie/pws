function waitForYou(fate, range) {
    var fateOfMeetYou = Math.floor(Math.random() * range + 1);
    var you = fateOfMeetYou === fate;
    if (!you) {
        waitForYou(fate, range);
    } else {
        alert('May it will be you for the rest of my life');
    }
    console.log('hello, 1024');
}
// 晚一点遇见你没关系 但愿余生都是你
// 遇见你 不容易 如果不是你 那我愿意等到底 只愿余生都是你
// 缘起 在人海里看见你 缘灭 看见你在人海里
waitForYou(8, 10);