window.onload = function () {
    document.querySelector(".title .open")?.classList.add("active");
};
function check_time(time) {
    let now = moment().format("X");
    return (now > moment(time).format("X"));
}
function countSecond(time) {
    let remain = moment(time).format("X") - moment().format("X");
    let before = "这颗胶囊还没到提取时间，剩余时间还有 ";
    let after = "秒";
    if (remain > 0) {
        let say = document.querySelector(".cap-tips");
        say?.classList.remove("hide");
        say.innerHTML = before + remain.toString() + after;
        setTimeout(function () { countSecond(time); }, 1000);
    }
}
async function open_capsule() {
    let tt = document.querySelector("input[name='passwd'");
    let passwd = tt.value;
    // let res = localStorage.getItem(passwd);
    // To add res from server
    let r = await fetch('http://localhost:5501/api/get', {
        method: 'POST',
        body: JSON.stringify({ "id": passwd })
    });
    let cap = await r.json();
    console.log(cap);
    if (cap) {
        // let name, email, time, content, tips;
        // [name, email, time, content, tips] = res.split("//////////");
        if (check_time(cap.time)) {
            let say = document.querySelector(".cap-tips");
            say?.classList.remove("hide");
            let words = document.querySelector(".cap-content");
            words?.classList.remove("hide");
            if (say)
                say.innerHTML = `${cap.name} 在 ${cap.time} 对你说：`;
            words.value = cap.content;
        }
        else {
            countSecond(cap.time);
            if (cap.tips) {
                let words = document.querySelector(".cap-content");
                words.value = `${cap.name}留给你的提示信息\n${cap.tips}`;
            }
        }
    }
    else {
        let t = document.querySelector("input[name='passwd']");
        t.value = "";
        t.placeholder = "请输入有效的密码";
    }
    let t = document.querySelector("input[type='submit']");
    t.value = "打开胶囊";
}
// export {};
//# sourceMappingURL=open.js.map