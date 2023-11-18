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
  createCanvas(cWidth-10, cHeight);

  help = QuickSettings.create(ui_offs - 10, 0, "Помощь (кликни дважды)")
    .addHTML("Выбор изображения", '<div style="height:30px"></div>')
    .addHTML('Размер изображения', '<div style="height:20px"></div>')
    .addHTML('Яркость', '<div style="height:20px"></div>')
    .addHTML('Контраст', '<div style="height:20px"></div>')
    .addHTML('Диаметр холста, см', '<div style="height:20px"></div>')
    .addHTML('Толщина нитки, мм', '<div style="height:20px"></div>')
    .addHTML('Количество гвоздей', '<div style="height:20px"></div>')
    .addHTML('Максимум линий', '<div style="height:20px"></div>')
    .addHTML('Ширина очистки', '<div style="height:20px"></div>')
    .addHTML('Прозрачность очистки', '<div style="height:20px"></div>')
    .addHTML('Запрет на угол возврата', '<div style="height:20px"></div>')
    .addHTML('Максимум ниток на гвозде', '<div style="height:20px"></div>')
    .addHTML('Оптимизация чёрных полос', '')
    .addHTML('Общее улучшение', '')
    .addHTML('Приоритет линий в центре', '')
    .addHTML('Минимальное расстояние до след. гвоздя - 1/4 круга', '')
    .setWidth(200)
    .setDraggable(false)
    .collapse()

  ui = QuickSettings.create(0, 0, "Crazy virtual laboratories v 0.1")
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

function handleFile(file) {
    f = new p5.File(file);
    var words = loadStrings(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
    console.log(words);
    //saveStrings("123", 'words.txt');
    console.log(file.data);
}


function update_h(){}