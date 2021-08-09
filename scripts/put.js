function XReadFile() {
    let url = "test.json";
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            let data = JSON.parse(request.responseText);
            return data;
        }
        else {
            return null;
        }
    };
}
var User;
(function (User) {
    User[User["name"] = 0] = "name";
    User[User["email"] = 1] = "email";
    User[User["time"] = 2] = "time";
    User[User["content"] = 3] = "content";
    User[User["tips"] = 4] = "tips";
})(User || (User = {}));
function check_null(str) {
    if (str.length === 0 || str.trim().length === 0) {
        return true;
    }
    else {
        return false;
    }
    // return !str && str.trim();
}
function check_email(str) {
    let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    return reg.test(str);
}
function check_content(content) {
    return (0 < content.length && content.length < 5000);
}
function encode(str) {
    // let encode = btoa(str);
    let encode = str;
    let password = Math.random().toString();
    return [password, encode];
}
function warning(attr, p_text) {
    let v = document.querySelector(`input[name=${attr}]`)
        || document.querySelector(`textarea[name=${attr}]`);
    v.placeholder = p_text;
}
async function check_info(user) {
    // console.log(!check_null(user.name), check_email(user.email), check_content(user.content));
    if (!check_null(user.name) && check_email(user.email)
        && check_content(user.content)) {
        let all_content = [user.name, user.email, user.time, user.content, user.tips].join("//////////");
        let t = encode(all_content);
        console.log("all_content", all_content);
        document.querySelector('.main').classList.add('hide');
        document.querySelector('.keys').classList.remove('hide');
        // localStorage.setItem(t[0], t[1]);
        // Todo: store data into server
        let res = await fetch('http://localhost:5501/api/add', {
            method: 'POST',
            body: JSON.stringify(user),
        });
        let result = await res.json();
        console.log(result);
        if (result.stat === 'ok' && result.id !== '') {
            let t = document.querySelector("input[name='keys']");
            t.value = result.id;
            console.log(result.id);
            // if (localStorage.getItem('id')) {
            //   let tmp = JSON.parse(localStorage.getItem('id'));
            //   tmp.push(result.id);
            //   localStorage.setItem("id", JSON.stringify(tmp));
            // } else {
            //   let tmp = JSON.stringify([result.id]);
            //   localStorage.setItem("id", tmp);
            // }
        }
    }
    else {
        if (check_null(user.name)) {
            warning('name', '名字不能为空');
        }
        if (!check_email(user.email)) {
            warning('email', '请设置合法的email地址');
            let v = document.querySelector(`input[name=email]`);
            v.value = '';
        }
        if (!check_content(user.content))
            warning('content', '内容不能为空');
    }
}
window.onload = function () {
    let form = document.querySelector("form");
    form[2].value = moment().format('YYYY-MM-DD HH:mm:ss');
    document.getElementsByClassName("add")[0].classList.add("active");
    // const file_data = XReadFile();
};
async function getText() {
    // location.href = "/put.html";
    let form = new FormData(document.querySelector('form'));
    let name = form.get("name");
    let email = form.get("email");
    let time = form.get("time");
    let content = form.get("content");
    let tips = form.get("tip");
    // console.log(name, email, time, content, tips);
    check_info({ name, email, time, content, tips });
    console.log("Process finished");
    let t = document.querySelector("input[type='submit']");
    t.value = "添加胶囊";
}
// export {getText};
//# sourceMappingURL=put.js.map