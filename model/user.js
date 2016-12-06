const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  name 用户名
  pass 密码
  email 注册邮箱
  permission 权限
    0 为 禁止使用
      封号的意思

    100 为 受限（占个名字）
      只给看结案，其他的都不能动

    200 为 admin
      可以看结案、草案，
      草案可以投票
      也可以创建草案

    300 为 owner
      有上面管理员的全部权限，而且可以设定政策tag

    400 为 middler
      仅仅只能 创建/删除 owner、admin，其他的都没有

  avatar 头像URL

  另外，不允许用户名为 dever，而且不允许大写，只允许【纯英文】的用户名
*/
const UserSchema = new Schema({
  name: String,
  pass: String,
  email: String,
  permission: Number,
  avatar: { type: String, default: 'default-avatar.jpg' },
});

UserSchema.virtual('permission_toString').get(function (){
  let permission = this.permission;
  if (permission === 0) {
    return 'block';
  } else if (permission === 100) {
    return '受限';
  } else if (permission === 200) {
    return 'admin';
  } else if (permission === 300) {
    return 'owner';
  } else if (permission === 400) {
    return 'middler';
  } else {
    return 'N/A';
  }
});
UserSchema.virtual('is_op').get(function (){
  return (this.permission_toString() === 'owner') || (this.permission_toString() === 'middler');
});

mongoose.model('User', UserSchema);
