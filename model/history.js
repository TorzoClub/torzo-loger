const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/*
  type 类型
  title 标题
  content 内容
  date 日期
*/
const HistorySchema = new Schema({
  type: { type: String, default: 'history'},
  title: { type: String, default: '无标题' },
  content: { type: String, default: '无内容' },
  date: { type: Date, default: Date.now },
});

HistorySchema.pre('save', function (next) {
  this.type = 'history';
  this.date = new Date;
  next();
})

mongoose.model('History', HistorySchema);
