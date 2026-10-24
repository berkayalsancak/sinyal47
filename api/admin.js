const k=require('../lib/core');
module.exports=async(q,s)=>{if(!process.env.ADMIN_TOKEN||q.headers['x-admin-token']!==process.env.ADMIN_TOKEN)return s.status(401).json({e:1});
s.json(await k.sb('/players?select=id,nick,country,layer,first_seen,last_seen&order=layer.desc,last_seen.desc&limit=500'));};
