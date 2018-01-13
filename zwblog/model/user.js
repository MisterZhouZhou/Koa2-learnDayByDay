var user = {};
exports = module.exports = user;

user.Schema = {
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  regist_time: {
    type: Date,
    default: Date.now
  }
};

user.collection = {
  collection: 'Accounts' // 用户账号
};

user.statics = {
  getAccounts: function() {
    return this.find().exec();
  },
  getAccountByEmailAndPwd: function(email,pwd) {
    return this.find({
      "email": email,
      "password": pwd
    }).exec();
  }
};
