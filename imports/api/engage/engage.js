import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('engage_messages');

const EmailSchema = new SimpleSchema({
  templateId: {
    type: String,
    optional: true,
  },
  subject: {
    type: String,
  },
  content: {
    type: String,
  },
});

Messages.schema = new SimpleSchema({
  segmentId: {
    type: String,
  },
  title: {
    type: String,
  },
  fromUserId: {
    type: String,
  },
  email: {
    type: EmailSchema,
    optional: true,
  },
  isAuto: {
    type: Boolean,
  },
  stopDate: {
    type: Date,
    optional: true,
  },
});

Messages.schemaExtra = new SimpleSchema({
  createdUserId: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
});

Messages.helpers({
  fromUser() {
    return Meteor.users.findOne(this.fromUserId) || {};
  },
});

Messages.attachSchema(Messages.schema);
Messages.attachSchema(Messages.schemaExtra);

Factory.define('engage.messages', Messages, {
  title: () => faker.random.word(),
});
