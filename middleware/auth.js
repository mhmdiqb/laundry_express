exports.checkLogin=(req,res,next)=>{


if(!req.session.user){

return res.redirect('/login');

}


next();


};


exports.adminOnly=(req,res,next)=>{


if(
req.session.user.role !== 'admin'

){

return res.send(
"Tidak memiliki akses"
);

}


next();


};