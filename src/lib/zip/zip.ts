import * as JSZip from "jszip"
import { saveAs } from 'file-saver';
var mime = require('mime-types')

export function Zip(data:Array<{datas:string,type:string}>,name:string) {
    var zip = new JSZip();

    // img.file("test.png","iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", {base64: true});
    data.map((row)=>{
        zip.file(name+parseInt(String(Math.floor(Math.random()*100000)),32)+"."+mime.extension(row.type),row.datas, {base64: true});
    })
   
    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, name+".zip");
    });

}
