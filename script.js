/* Smooth-scroll for in-page anchors */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

/* Fade-in when sections enter viewport */
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.remove('opacity-0','translate-y-6');
      entry.target.classList.add('opacity-100');
    }
  });
},{threshold:.15});
document.querySelectorAll('.fade-in').forEach(el=>{
  el.classList.add('opacity-0','translate-y-6');
  io.observe(el);
});

/* Dark-mode toggle */
const toggle=document.getElementById('darkToggle');
if(toggle){
  toggle.addEventListener('click',()=>document.body.classList.toggle('dark-mode'));
}

/* Newsletter form */
const form=document.getElementById('newsletter-form');
if(form){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=document.getElementById('email-input').value.trim();
    const msg=document.getElementById('response-msg');
    try{
      const r=await fetch('/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
      const res=await r.json();
      msg.textContent=res.message;
      msg.className='response '+(res.success?'text-green':'text-red');
      if(res.success)form.reset();
    }catch(err){
      msg.textContent='Server unreachable, please try later.';msg.className='response text-red';
    }
  });
}
