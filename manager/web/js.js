const sock = new WebSocket("ws://localhost:8080");

sock.addEventListener("open", data => {

});

sock.addEventListener("message", data => {
    document.getElementById('log').scrollIntoView(false);
    if(data.type == "message"){
        const log = data.data;
        console.log(log);
        let logdiv = document.getElementById('log');
        let p = document.createElement('p');
        p.textContent = log;
        logdiv.appendChild(document.createElement('div').appendChild(p));
        logdiv.scrollTop = logdiv.scrollHeight; //一番下までスクロール
    }
});

sock.addEventListener("close", e => {

});

sock.addEventListener("error", e => {

});

start.addEventListener("click", e => {
    sock.send(JSON.stringify({
        "type":"start"
    }));
});


let terminal = document.getElementById('terminal')
terminal.addEventListener("keypress",data => {
    if(data.key == "Enter"){
        terminal = document.getElementById('terminal');
        console.log(terminal.value);
        sock.send(JSON.stringify({
            "type" : "terminal",
            "data" : terminal.value.replace("\n", "").replace("\r", "")
        }))
        terminal.value = "";
    }
})
