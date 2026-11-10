/* Ponte per l'app Android: salvataggio del backup tramite il menu Condividi */
(function(){
  var C=window.Capacitor;
  if(!C||!C.Plugins)return;
  var FS=C.Plugins.Filesystem,SH=C.Plugins.Share;
  var downloads={save:async function(r){
    try{
      var name=String(r.filename||'dotnote.json').replace(/[^\w.\-]+/g,'_');
      var w=await FS.writeFile({path:name,data:String(r.data),directory:'CACHE',encoding:'utf8'});
      await SH.share({title:name,url:w.uri,dialogTitle:name});
      return {status:'saved'};
    }catch(e){
      var m=String(e&&e.message||e);
      throw {code:/cancel/i.test(m)?'declined':'unavailable',message:m};
    }
  }};
  window.claude={use:function(n){return Promise.resolve(n==='downloads'?downloads:null)}};
})();
