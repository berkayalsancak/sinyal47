const k=require('../lib/core');
module.exports=async(q,s)=>{const b=q.body||{};if(!b.device||!b.consent)return s.status(400).json({e:1});
const p=await k.who(q,b),l=k.lang(q);s.json({lang:l,total:k.L.length,v:k.view(p.layer,l)});};
