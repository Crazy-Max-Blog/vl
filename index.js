// CONST
const ui_offs = 250;
let cv_d = 650;

// VARS
let cv = [
  { x: ui_offs + cv_d / 2 + 50, y: 50 + cv_d / 2 },
  { x: ui_offs + cv_d + 100 + cv_d / 2, y: 50 + cv_d / 2 }
];
let ui, help;
let img = null;
let nodes = [];
let overlaps = [];
let length;
let density = 1;

let update_f = true;
let node = 0;
let count = 0;
let best = 0;
let running = false;
let stop_f = false;
let hold_f = false;
let radialGranularity = 32;
let tmr;

let ui_negative;
let ui_center;
let ui_radial;

let start_x, start_y;
let offs_x = 0, offs_y = 0;
let offs_bx = 0, offs_by = 0;

function setup() {
  //createCanvas(ui_offs + cv_d * 2 + 50 * 3, cv_d + 100);
  // auto zoom
  let cWidth = ui_offs + cv_d * 2 + 50 * 3;
  let cHeight = cv_d + 100;
  document.body.style.zoom = (Math.min((innerHeight - 25) / cHeight, (innerWidth - 25) / cWidth)).toFixed(1);
  createCanvas(ui_offs, 0, cWidth-10, cHeight);
  

  ui = QuickSettings.create(0, 0, "Crazy virtual laboratories v 0.2")
    .addFileChooser("Load task", "", ".png,.txt", handleFile)

    //.addNumber('Diameter', 10, 100, 30, 0.1, update_h)

    //.addRange('Clear Width', 1.0, 5, 3, 0.5, update_h)
    //.addBoolean('Radial Granularity', 0, update_h)
    .addHTML("Create task",
      "<select name='printers' id='printers', style='width:"+ui_offs/1.5+"px'>"+
      "<option value='transfusions'>Переливания</option>"+
      "</select>"+
      "<div style='display: flex;'>"+
      "  <p1 style='width:"+(ui_offs/4+7)+"px'>Name</p1>"+
      "  <p1 style='width:"+(ui_offs/2+7)+"px'>Url</p1>"+
      "</div>"+
      "<input name='guruweba_example_text' type='text' id='ip' value='', style='width:"+ui_offs/4+"px' />"+
      "<input name='guruweba_example_text' type='text' id='ib' value='', style='width:"+ui_offs/2+"px' />"+
      "<button class='qs_button' onclick='cd()'>Add</button>"+
      "<button class='qs_button' onclick='open_printer_wifi()'>Create</button>"
    )
    
    /*.addHTML("Save task",
      "<button class='qs_button' onclick='savef(true)'>Save</button>&nbsp;" +
      "<button class='qs_button' onclick='savef(false)'>Save without solution</button>"
    )*/
    
    .addHTML("Task",
      "<div id='namefile'>Name: </div>"+
      "<button class='qs_button' onclick='savef(true)'>Save</button>&nbsp;" +
      "<button class='qs_button' onclick='savef(false)'>Save without solution</button>"
    )
    //.addHTML("Status", "Stop")
    //.addText("Nodes", "")
    .setWidth(ui_offs - 10)
    .setDraggable(false)
    .setCollapsible(false)
    ;
}

function cd() {
    var oa = document.getElementById("printers");
    var ob = document.getElementById("ip");
    var oc = document.getElementById("ib");
    oa.options[oa.options.length] = new Option(ob.value, oc.value);
}

function draw() {
  
}

function keyPressed() {
  
}

function mousePressed() {
  
}

var f;
var tf="";
var fn="";
let words;

function handleFile(file) {
    document.getElementById("namefile").innerHTML = "Name: "+file.name;
    words = loadStrings(URL.createObjectURL(file));
    btf();
    console.log(URL.createObjectURL(file));
    console.log(words);
    //saveStrings("123", 'words.txt');
    fn = file.name;
    console.log(file.data);
    console.log(fn);
    
    textSize(20);
    for (var i=0; i<words.length; i++) {
      text(words[i], 5, 20*i+20);
    }
}


function update_h(){}
function btf(){
    for(var i=0;i<words.length;i++) {tf+=words[i]+"/n";console.log("123");}
}

function savef(b) {
    console.log(b);
    btf();
    saveStrings(words, fn);
}