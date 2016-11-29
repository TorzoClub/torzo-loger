const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/* 过滤 HTML 标签 */
const striptags = require('striptags');

/* 转义 HTML 实体字符 */
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities;

/*
	uper 发起人
  status 政策状态，0 为草案，1 为结案
  title 标题
  content 内容
  type 内容类型，分别是 markdown、html、text
  format 依据 content 格式化后的数据
  date 创建日期
  mod 修改日期
  mod_record 修改记录
*/
const PolicySchema = new Schema({
  uper: { type: String, default: 'N/A' },
  status: { type: Number, default: 0 },
  title: { type: String, default: '无标题' },
  content: { type: String, default: '无内容'},
  type: { type: String, default: 'text' },
  format: { type: String, default: 'no-format' },
  date: { type: Date, default: Date.now },
  mod: { type: Date, default: Date.now },
  mod_record: [Object],
});

PolicySchema.pre('save', function (next) {
  let type = this.type;

  if (this.type === 'markdown') {
    this.format = 'markdown: ' + this.content;
  } else {
    /* 转 Text */
    this.format = `<pre><code>${entities.encode(this.content)}</code></pre>`;
  }

  let now = new Date;
  this.mod = now;

  next();
});


mongoose.model('Policy', PolicySchema);
