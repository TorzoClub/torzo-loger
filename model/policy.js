const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/*
	uper 发起人
  status 政策状态，0 为草案，1 为结案
  title 标题
  content 内容
  date 创建日期
  mod 修改日期
  mod_record 历史记录
*/
const PolicySchema = new Schema({
  uper: { type: String, default: 'N/A' },
  status: { type: Number, default: 0 },
  title: { type: String, default: '无标题' },
  content: { type: String, default: '无内容'},
  date: { type: Date, default: Date.now },
  mod: { type: Date, default: Date.now },
  mod_record: [Object],
});

PolicySchema.pre('save', function (next) {
  this.type = 'policy';

  let now = new Date;
  this.date = now;

  next();
});


mongoose.model('Policy', PolicySchema);
