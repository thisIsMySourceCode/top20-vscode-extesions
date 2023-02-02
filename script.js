
const 
fileGet   = ( url) => { return fetch   (url) .then( response => response.text())        },
fileRead  = ( url) => {        fileGet (url) .then( response => fileRender( response ) )},
fileParse = (data) => { return data
.replace(/&#8202;/gm," ")
.replace(/(\S[\w.-]*)\s+(.*)/gm,"$1&#8202;$2")
.split(/\r?\n|\r|\n/g)
.filter(Boolean)
.map(e => {
 let  
 result = [];
 [ result[ 'link'        ] , 
   result[ 'description' ] 
 ] =  e.split( "&#8202;", 2 )
   result['name'] = result[ 'link' ]
   .split('.')[1]
   .replace(/-/gm,' ')
   .split(' ')
   .map (
    w => w[0].toUpperCase() 
  + w.substring(1).toLowerCase()
   )
   .join(' ')
   .replace(/vs\s?code/i,'')
   .trim()  
   ;
 return result }
)
.sort((a, b) => {
 const 
 keya = Object.keys(a)[2],
 keyb = Object.keys(b)[2]
 return keya.localeCompare(keyb) 
 ||   a[keya].localeCompare(b[keyb])
})
},
fileRender = (data) => { data = fileParse(data)
   console.log(data);
   const 
   url = 'https://marketplace.visualstudio.com/items?itemName=',
   observer = new MutationObserver((mutations, obs) => {
     const 
     id = document.getElementById('screen');
     if (id) {
       i =  0, len = data.length;
       while (i < len) {
         let 
         p = document.createElement('p') ,
         a = document.createElement('a')
         a.setAttribute('href'  , `${url}${data[i].link}`);
         a.setAttribute('target', '_blank');
         a.setAttribute('rel'   , 'noreferrer noopener nofollow');
         a.innerHTML = `${data[i].name}<span>: ${data[i].description}</span>`
         p.appendChild(a)
         p.innerHTML=`<span>${String(i+1).padStart(2, '0')}.</span> ${p.innerHTML}`
         id.appendChild(p)
         i++
       }
       obs.disconnect()
       return
     }
   })
   observer.observe(document, {childList: true, subtree: true })
}; fileRead('./FILES.BBS')