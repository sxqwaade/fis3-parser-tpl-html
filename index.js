/**
 * @Author: songxiaoqiang
 * @Date:   2017-05-31T17:35:54+08:00
 * @Last modified by:   songxiaoqiang
 * @Last modified time: 2017-06-12T11:50:09+08:00
 */



'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function(content,file,conf){
  var result = '';
  var reg = /{%(?!require).*%}/g;
  // var regscss = /<link.*href=".*\.scss.*\/>/g;
  // var regcss = /<link.*href=".*\.css.*\/>/g;
  var regrequire = /{%require.*js.*?%}/g;
  var regrequirestyle = /{%require.*(scss|css|less).*?%}/g;
  var regjs = /".*"/g;
  var regstyle= /".*(scss|css|less)/g;
  var requirearr = [];
  var requirestylearr = [];
  var jsarr = [];
  var stylearr = [];

  if(content.match(regrequirestyle)){
    requirestylearr = content.match(regrequirestyle);
    for(var i=0;i<requirestylearr.length;i++){
      //console.log(requirestylearr[i].match(regstyle)[0])
      stylearr[i] = `<link type="text/css" rel="stylesheet" href=${requirestylearr[i].match(regstyle)[0]}?__inline" />`;
    }
    content = content.replace(regrequirestyle,'');
  }
  if(content.match(regrequire)){
    requirearr = content.match(regrequire);
    for(var i=0;i<requirearr.length;i++){
      //console.log(requirearr[i].match(regjs)[0])
      jsarr[i] = `<script type="text/javascript" src=${requirearr[i].match(regjs)[0].slice(0,-1)}?__inline"></script>`;
    }
    content = content.replace(regrequire,'');
  }

  var title = file.title ? `<title>${file.title}</title>` : '';
  var depZepto = file.depZepto ? `<script type="text/javascript" src="${file.depZepto}?__inline"></script>`: '';
  var dace = file.dace ? `<script type="text/javascript" src="${file.dace}"></script>`: '';
  var ismod = file.ismod ? `<script type="text/javascript" src="${file.ismod}?__inline"></script>`: '';
  var commoncss = file.commoncss ? `<link rel="stylesheet" type="text/css" href="${file.commoncss}?__inline"  />` : '';
  var flexible = !file.flexible ? '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">' : `<script type="text/javascript" src="${file.flexible}?__inline"></script>`;
  var commonjs = file.commonjs ? `<script type="text/javascript" src="${file.commonjs}?__inline"></script>`: '';
  var jockey = file.jockey ? `<script type="text/javascript" src="${file.jockey}?__inline"></script>`: '';
  var inlineScript = [];
  var inlineCss = [];
  if(file.inlineScript){
    file.inlineScript.forEach(function(val){
      inlineScript.push(`<script type="text/javascript" src="${val}?__inline"></script>`);
    });
  }
  if(file.inlineCss){
    file.inlineCss.forEach(function(val){
      inlineCss.push(`<link type="text/css" rel="stylesheet" href="${val}?__inline" />`);
    });
  }
  result = `<!DOCTYPE html>
              <html lang="zh_CN">
              <head>
                <meta charset="utf-8">
                <meta name="format-detection" content="telephone=no,email=no,address=no">
                ${file.meta ? file.meta.join('') : ``}
                ${title}
                ${flexible}<!--ignore-->
                ${commonjs}<!--ignore-->
                ${commoncss}<!--ignore-->
                ${stylearr.join('')}
                ${depZepto}<!--ignore-->
                ${jockey}<!--ignore-->
                ${ismod}<!--ignore-->
              </head>
              <body>
                ${file.wrapperId ? `<div id="${file.wrapperId}">` : ``}
                ${content.replace(reg,'')}
                ${file.wrapperId ? `</div>` : ``}
                ${dace}
                ${jsarr.join('')}
                ${inlineScript.join('')}
                ${inlineCss.join('')}
              </body>
           </html>`;
  console.log(result);
  return result;
}
