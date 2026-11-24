document.querySelectorAll('[role="tablist"]').forEach(group=>{
 const tabs=[...group.querySelectorAll('[role="tab"]')];
 function activate(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}});});
});
const programButtons=[...document.querySelectorAll('[data-program]')];
function selectProgram(name){programButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.program===name)));['python','libre'].forEach(p=>document.getElementById(p+'-guide').hidden=p!==name);document.getElementById('python-extra').hidden=name!=='python';if(name){const heading=document.querySelector('#'+name+'-guide h2');heading.tabIndex=-1;heading.focus({preventScroll:true});heading.scrollIntoView({block:'start'});}}
programButtons.forEach(b=>b.addEventListener('click',()=>{selectProgram(b.dataset.program);history.replaceState(null,'','#'+b.dataset.program);}));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{selectProgram(null);history.replaceState(null,'','#setup');programButtons[0].focus();}));
if(['#python','#libre'].includes(location.hash))selectProgram(location.hash.slice(1));
let timer;const status=document.getElementById('status');document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',async()=>{const value=button.parentElement.querySelector('code').textContent;try{await navigator.clipboard.writeText(value);status.textContent='Скопировано';button.textContent='Готово ✓';clearTimeout(timer);timer=setTimeout(()=>{status.textContent='';document.querySelectorAll('.copy').forEach(b=>b.textContent='Копировать');},2200);}catch{status.textContent='Выдели и скопируй код вручную';setTimeout(()=>status.textContent='',4000);}}));
