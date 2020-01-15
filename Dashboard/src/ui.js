
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    commands: {}
};

registerCommandPanel("JoystickDrive")
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
    ui.commands[commandName] ={
        item: document.getElementById(commandName),
        meta: document.getElementById("meta-"+commandName)
    }

    NetworkTables.addKeyListener(statusPath, (key,val)=>{
        ui.commands[commandName].item.classList.replace( ui.commands[commandName].item.classList[1], val)
        console.log(key);
        
    })

    NetworkTables.addKeyListener(metaPath, (key,val)=>{
        
        
        ui.commands[commandName].meta.innerText = val;

        
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
