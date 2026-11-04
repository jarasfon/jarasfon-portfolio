// Add your photos to assets/images/ using the filenames shown in the placeholders.
// The page will automatically display an image if that file exists.
(() => {
  const base = 'assets/images/';
  const slots = [{selector:'.portrait-placeholder',file:'profile.jpg'},...Array.from(document.querySelectorAll('[data-image]'),el=>({el,file:el.dataset.image}))];
  slots.forEach(slot=>{const el=slot.el||document.querySelector(slot.selector);if(!el)return;const img=new Image();img.onload=()=>{el.style.backgroundImage=`url("${base+slot.file}")`;el.classList.add('has-image');};img.src=base+slot.file;});
})();
