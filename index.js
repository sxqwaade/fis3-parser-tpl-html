'use strict';

module.exports = function(content,file,conf){
  var result = '';
  var reg = /{%(?!require).*%}/g;
  // var regscss = /<link.*href=".*\.scss.*\/>/g;
  // var regcss = /<link.*href=".*\.css.*\/>/g;
  var regrequire = /{%require.*js.*?%}/g;
  var regrequirestyle = /{%require.*(scss|css|less).*?%}/g;
  var regjs = /".*"/g;
  var regstyle= /".*(scss|css|less)"/g;
  // var scssstyles = [];
  // var cssstyles = [];
  var requirearr = [];
  var requirestylearr = [];
  var jsarr = [];
  var stylearr = [];

  // if(content.match(regscss)){
  //   scssstyles = content.match(regscss);
  //   for(var i=0;i<scssstyles.length;i++){
  //     scssstyles[i] = scssstyles[i].replace(".scss",".scss");
  //   }
  //   content = content.replace(regscss,'');
  // }
  //
  // if(content.match(regcss)){
  //   cssstyles = content.match(regscss);
  //   for(var i=0;i<scssstyles.length;i++){
  //     cssstyles[i] = cssstyles[i].replace(".css",".css");
  //   }
  //   content = content.replace(regcss,'');
  // }

  if(content.match(regrequirestyle)){
    requirestylearr = content.match(regrequirestyle);
    for(var i=0;i<requirestylearr.length;i++){
      stylearr[i] = `<link type="text/css" rel="stylesheet" href=${requirestylearr[i].match(regstyle)[0]} />`;
    }
    content = content.replace(regrequirestyle,'');
  }
  if(content.match(regrequire)){
    requirearr = content.match(regrequire);
    for(var i=0;i<requirearr.length;i++){
      jsarr[i] = `<script type="text/javascript" src=${requirearr[i].match(regjs)[0]}></script>`;
    }
    content = content.replace(regrequire,'');
  }

  var depZepto = file.depZepto ? `<script type="text/javascript" src="${file.depZepto}?__inline"></script>`: '';
  var dace = file.dace ? `<script type="text/javascript" src="${file.dace}"></script>`: '';
  var ismod = file.ismod ? `<script type="text/javascript" src="${file.ismod}?__inline"></script>`: '';
  var commoncss = file.commoncss ? `<link rel="stylesheet" href="${file.commoncss}?__inline" type="text/css" />` : '';
  var flexible = !file.flexible ? '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">' : `<script type="text/javascript" src="${flexible}">`;

  result = `<!DOCTYPE>
            <html>
              <head>
                ${flexible}<!--ignore-->
                ${commoncss}<!--ignore-->
                ${stylearr.join('')}
                ${depZepto}<!--ignore-->
                ${ismod}<!--ignore-->
              </head>
              <body>
                ${file.wrapperId ? `<div id="${file.wrapperId}">` : ``}
                ${content.replace(reg,'')}
                ${file.wrapperId ? `</div>` : ``}
                ${jsarr.join('')}
                ${dace}
              </body>
           </html>`;
  return result;
}
