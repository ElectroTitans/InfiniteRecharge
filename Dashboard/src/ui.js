
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
   
};


registerCommandPanel("ExampleCommand")


function registerCommandPanel(commandName){
    
    var ntPath = "/4056/commands/" + commandName;
    var statusPath = ntPath + "/status";
    var metaPath = ntPath + "/meta";

    document.getElementById("commands").innerHTML += 
    `<li class="command-card idle" id="${commandName}">
        <h3>${commandName}</h3>
        <p id="meta-${commandName}">No Meta Data</p>
    </li>`
    var uiItem = document.getElementById(commandName);
    var metaItem = document.getElementById("meta-"+commandName)
    NetworkTables.addKeyListener(statusPath, (key,val)=>{
        uiItem.classList.replace(uiItem.classList[1], val)
    
    })

    NetworkTables.addKeyListener(metaPath, (key,val)=>{
        metaItem.innerText = val;
        console.log(val);
        
    })
    
    
}


NetworkTables.addKeyListener('/robot/time', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    ui.timer.textContent = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + value % 60;
});



addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
