const c=require('crypto');
const U=process.env.SUPABASE_URL+'/rest/v1',K=process.env.SUPABASE_SERVICE_KEY;
const sb=(p,o={})=>fetch(U+p,{...o,headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',Prefer:'return=representation',...o.headers}}).then(r=>r.json());
const sha=s=>c.createHash('sha256').update((process.env.SALT||'s47')+s).digest('hex').slice(0,24);
const N=s=>String(s||'').replace(/[İIı]/g,'i').toLowerCase().replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g').replace(/ö/g,'o').replace(/ü/g,'u').replace(/[^a-z0-9]/g,'');
const CL={TR:'tr',DE:'de',AT:'de',CH:'de',FR:'fr',BE:'fr',ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',RU:'ru',BY:'ru',PT:'pt',BR:'pt',IT:'it'};
const country=r=>(r.headers['x-vercel-ip-country']||'XX').toUpperCase();
const lang=r=>CL[country(r)]||'en';
const ip=r=>(r.headers['x-forwarded-for']||'').split(',')[0].trim();
// Katmanlar yalnızca sunucuda durur. Yeni katman eklemek = diziye bir nesne eklemek.
const L=[
{
"a": "sorgula",
"tr": {
"t": "Birinci kapı",
"b": "Ara. Düşün. Sorgula.\n\nU09SR1VMQQ==\n\nKod senden önce davranıyor. Sadece yüzeye bakma."
},
"en": {
"t": "First gate",
"b": "Seek. Think. Question.\n\nU09SR1VMQQ==\n\nThe code acts before you do. Do not trust the surface."
}
},
{
"a": "zaman",
"tr": {
"t": "Ayna",
"b": "Aynada harfler ters akar. İlk harf son olur, son harf ilk.\n\nAZNZM\n\nAlfabenin kendisi de bir aynadır."
},
"en": {
"t": "Mirror",
"b": "In the mirror the alphabet runs backwards. First becomes last.\n\nAZNZM\n\nThe alphabet itself is a mirror."
}
},
{
"a": "isik",
"tr": {
"t": "Titreşim",
"b": "Uzun ve kısa. Karanlık ve ışık.\n\n··  ···  ··  −·−\n\nBir zamanlar telgraf teli bunu taşırdı."
},
"en": {
"t": "Flicker",
"b": "Long and short. Dark and light.\n\n··  ···  ··  −·−\n\nOnce a telegraph wire carried this."
}
},
{
"a": "yanki",
"tr": {
"t": "Anahtar",
"b": "Bu iletinin anahtarı, ikinci kapının cevabıdır. Her harf kendi anahtar harfiyle döner.\n\nBEHAC XAZKV\n\nCevap, iletinin son kelimesidir."
},
"en": {
"t": "Key",
"b": "The key to this message is the answer of the second gate. Each letter turns with its own key letter.\n\nBEHAC XAZKV\n\nThe answer is the last word of the message."
}
},
{
"a": "kafes",
"tr": {
"t": "Üçüncü göz",
"b": "Her satırın üçüncü harfi bir şey saklıyor.\n\nBEKLEME\nSUALTI\nYAFTA\nELEKTRIK\nMASAL\n\nSırayla oku."
},
"en": {
"t": "Third eye",
"b": "The third letter of every line hides something.\n\nBEKLEME\nSUALTI\nYAFTA\nELEKTRIK\nMASAL\n\nRead them in order."
}
},
{
"a": "yolculuk",
"tr": {
"t": "Bölünmezler",
"b": "Boşlukları sayma. Sayılar arasında yalnızca bölünmezler konuşur.\n\nVYOBL VCBKK UKLXQ ZUBKV\n\n(1'den başla. Bir asal değildir.)"
},
"en": {
"t": "The indivisible",
"b": "Do not count the spaces. Among numbers only the indivisible speak.\n\nVYOBL VCBKK UKLXQ ZUBKV\n\n(Start at 1. One is not prime.)"
}
},
{
"a": "ykyizs",
"tr": {
"t": "Hafıza",
"b": "Şimdiye dek geçtiğin altı kapıyı hatırla. Cevapların ilk harflerini sırayla diz, sonra aynaya tut."
},
"en": {
"t": "Memory",
"b": "Remember the six gates you have passed. Line up the first letters of your answers in order, then hold it to a mirror."
}
},
{
"a": "golge",
"tr": {
"t": "Üç ray",
"b": "Yukarı, ortaya, aşağı, ortaya, yukarı. Ray bitince tren geri döner.\n\nSCGOUGLENO\n\nYolu tersine çevir."
},
"en": {
"t": "Three rails",
"b": "Up, middle, down, middle, up. When the track ends, the train turns back.\n\nSCGOUGLENO\n\nRun the road backwards."
}
},
{
"a": "kule",
"tr": {
"t": "Cümleler",
"b": "Her cümle bir harf taşır. Cümlelerin başına bak.\n\nKapılar açılır. Uzak yakınlaşır. Loş bir koridor bekler. Eşik aşıldı."
},
"en": {
"t": "Sentences",
"b": "Every sentence carries one letter. Look at how they begin.\n\nKapılar açılır. Uzak yakınlaşır. Loş bir koridor bekler. Eşik aşıldı."
}
},
{
"a": "gecis",
"tr": {
"t": "Kapı numarası",
"b": "Kaçıncı kapıdasın? Kaydırma o kadar. Ama hangi yöne?\n\nKXKRDKB QOMSC"
},
"en": {
"t": "Gate number",
"b": "Which gate are you at? Shift by that much. But in which direction?\n\nKXKRDKB QOMSC"
}
},
{
"a": "kehribar",
"tr": {
"t": "Gün ve ay",
"b": "Gün bir, ay sıfır. Beşer beşer oku. Her beşli bir harf.\n\nAY GÜN AY GÜN AY\nAY AY GÜN AY AY\nAY AY GÜN GÜN GÜN\nGÜN AY AY AY GÜN\nAY GÜN AY AY AY\nAY AY AY AY GÜN\nAY AY AY AY AY\nGÜN AY AY AY GÜN"
},
"en": {
"t": "Day and moon",
"b": "Day is one, moon is zero. Read in fives. Each five is a letter.\n\nMOON DMOON MOON DMOON MOON\nMOON MOON DMOON MOON MOON\nMOON MOON DMOON DMOON DMOON\nDMOON MOON MOON MOON DMOON\nMOON DMOON MOON MOON MOON\nMOON MOON MOON MOON DMOON\nMOON MOON MOON MOON MOON\nDMOON MOON MOON MOON DMOON"
}
}
];
const view=(n,l)=>n>L.length?{end:true,n:n}:{n,t:(L[n-1][l]||L[n-1].en).t,b:(L[n-1][l]||L[n-1].en).b};
async function who(req,b){
  const fp=sha('fp'+(b.fp||'')),dv=sha('d'+(b.device||'')),ih=sha('i'+ip(req));
  let p=(await sb(`/players?id=eq.${dv}`))[0]||(await sb(`/players?fp=eq.${fp}&ip_hash=eq.${ih}`))[0];
  if(!p)p=(await sb('/players',{method:'POST',body:JSON.stringify({id:dv,fp,ip_hash:ih,country:country(req),layer:1})}))[0];
  else await sb(`/players?id=eq.${p.id}`,{method:'PATCH',body:JSON.stringify({last_seen:new Date().toISOString(),ip_hash:ih,country:country(req)})});
  return p;}
module.exports={sb,N,L,view,who,lang,sha};
