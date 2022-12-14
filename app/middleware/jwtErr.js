'use strict'

module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const token = ctx.request.header.authorization; //若没有token返回空字符串
        let decode;
        if(token && token != 'null') {
            try {
                decode = ctx.app.jwt.verify(token, secret); //验证token
                await next();
            } catch (error) {
                console.log('error',error);
                ctx.status = 200;
                ctx.body = {
                    msg: 'token已过期，请登录',
                    code: 401,
                }
                return;
            }
        }else{
            ctx.status = 200;
            ctx.body = {
                code: 401,
                msg: 'token不存在',
            };
            return;
        }
    }
}