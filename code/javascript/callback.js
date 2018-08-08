function Buy(name,goods1,scb,fcb) {
    console.log(name+' buy '+goods1);
    setTimeout(function(){
        console.log('我在请求接口...');
        typeof scb === "function" && scb();
    },1000)
    
    if(name.length === 4){
        typeof fcb === "function" && fcb();
    }
}
Buy('wang','apple',function(){
    console.log("shopping finished");
},function(){
    console.log("shopping failed!");
});

