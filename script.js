let header = document.getElementById('header');
let section = document.getElementById('section');
let style = document.getElementById('style');

header.innerHTML = `<h1>Note & Editor</h1>
<h2>Открыть файл как текст с расширением: .txt; .html; .js; .svg; для чтения и редакции</h2>`;
section.innerHTML = `<input id="text1" type="file">
<input id="save" type="button" value="Сохранить на Диск" >
<textarea id="text"></textarea>
<hr>
<h2>Открыть файл как картинку с расширением: .svg;</h2> 
      <hr>
			<input type="file" id="openFile">
			<hr>
			<hr>
				<pre id="seeFile"></pre>
			<hr>
		
	
			
			
`;


style.innerHTML = `body {
	margin:10px;
}
textarea {
	width:100%;
	height:calc(100vh - 100px);
}
input {
	margin: 0 0 10px 0;
}
#save {
	float:right;
}

	#fileDisplayArea {
  margin-top: 2em;
  width: 100%;
  overflow-x: auto;


`;




//Сохранить файл
let saveFile = document.getElementById('save');
saveFile.onclick = download;

function download(){
	var link = document.createElement('a');
	var str = document.getElementById("text").value;
	str = str.split("\u000A").join("\u000D\u000A");
	bl = new Blob([str]);
	link.href = URL.createObjectURL(bl);
	if (document.getElementById("text").name!=""){
		link.download = document.getElementById("text").name;
	} else {
		link.download = "text.txt";
	}
	var e = new MouseEvent("click");
	link.dispatchEvent(e);
}
//Открыть файл
let text1 = document.getElementById('text1');
text1.onchange = function() {readfile(this.files)};

function readfile(files){
	var text = files[0];
	document.getElementById("text1").name = text.name;
	console.dir(text);
	var reader = new FileReader();
	reader.onload = function(e) {
    document.getElementById("text").value = e.target.result;
  };
  reader.readAsText(text);
}

window.onload = function() {
    let openFile = document.getElementById('openFile');
    let seeFile = document.getElementById('seeFile');
    
    openFile.addEventListener('change', function(e){
      
      let file = openFile.files[0];
      let textType = /svg.*/;
      
      
      if(file.type.match(textType)){
        
        let reader = new FileReader();
        
        reader.onload = function(e){
          
          seeFile.innerHTML = reader.result;
          
        }
        
        reader.readAsText(file);
      }else{
        seeFile.innerText = "File not supported!"
      }
      
    });
  }