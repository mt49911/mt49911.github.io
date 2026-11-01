(function(){
var $=function(s,c){return(c||document).querySelectorAll(s)};
var nav=$('#nav')[0],mb=$('#menu')[0];
function close(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}
mb.onclick=function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
$('#nav a').forEach(function(a){a.onclick=close});
$('#y')[0].textContent=new Date().getFullYear();
var cv=$('#cv')[0],cp=['Abdullahi_Muhammad_Tukur_CV.pdf','assets/Abdullahi_Muhammad_Tukur_CV.pdf'];
if(window.fetch){(function t(i){if(i>=cp.length)return;fetch(cp[i],{method:'HEAD'}).then(function(r){if(r.ok){cv.href=cp[i];cv.hidden=false}else t(i+1)}).catch(function(){t(i+1)})})(0)}
$('.filters button').forEach(function(b){b.onclick=function(){
$('.filters button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
$('#pg .proj').forEach(function(c){c.style.display=(b.dataset.f==='all'||c.dataset.c===b.dataset.f)?'':'none'})}});
$('[data-svc]').forEach(function(a){a.addEventListener('click',function(){$('#s')[0].value=a.dataset.svc})});
if('IntersectionObserver' in window){
var links={};$('#nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){
$('#nav a').forEach(function(a){a.classList.remove('on')});
var l=links[en.target.id];if(l)l.classList.add('on')}})},{rootMargin:'-40% 0px -55% 0px'});
$('main section').forEach(function(s){io.observe(s)})}
$('#f')[0].onsubmit=function(ev){
ev.preventDefault();
var n=$('#n')[0].value.trim(),e=$('#e')[0].value.trim(),d=$('#d')[0].value.trim(),ok=true;
$('#en')[0].textContent=n?'':'Enter your name.';
$('#ee')[0].textContent=/^\S+@\S+\.\S+$/.test(e)?'':'Enter a valid email address.';
$('#ed')[0].textContent=d.length>=10?'':'Describe your project in at least 10 characters.';
if(!n||!/^\S+@\S+\.\S+$/.test(e)||d.length<10)return;
var sv=$('#s')[0].value;
location.href='mailto:arzevaglobalservices@gmail.com?subject='+encodeURIComponent('Project enquiry: '+sv)+'&body='+encodeURIComponent('Name: '+n+'\nEmail: '+e+'\nService: '+sv+'\n\n'+d)};
})();
window.addEventListener('load',function(){
if(!document.querySelector('#gallery figure')){
var g=document.getElementById('gallery');if(g)g.remove();
var l=document.querySelector('#nav a[href="#gallery"]');if(l&&l.parentNode)l.parentNode.remove()}});
  
