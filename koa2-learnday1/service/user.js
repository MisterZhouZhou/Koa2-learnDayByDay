exports.register = async (name,pwd)=>{
    let data;
    if(name == 'zw' && pwd == '123'){
        data = `welcom ${name}`
    }else{
        data = '信息有问题'
    }
    return data;
}