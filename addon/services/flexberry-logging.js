/**
  @module ember-flexberry
 */

import Ember from 'ember';

const { getOwner } = Ember;

/**
  Service for logging message to applicationLog store.

  @class FlexberryLoggingService
  @extends <a href="http://emberjs.com/api/classes/Ember.Service.html">Ember.Service</a>
 */
export default Ember.Service.extend({
  /**
    Store for transmit messages to server.

    @property flexberryStore
    @type DS.Store
    @default null
   */
  flexberryStore: null,

  /**
    Logger switcher on/off true if remote logging service works correctly.

    @property serverLogEnabled
    @type Boolean
    @default true
   */
  serverLogEnabled: true,	//Remote logging service works correctly

  /**
    An overridable method called when objects are instantiated.
    [More info](http://emberjs.com/api/classes/Ember.Service.html#method_init).

    @method init
   */
  init() {
    this._super(...arguments);
    this.set('flexberryStore', getOwner(this).lookup('service:store'));
    this.set('serverLogEnabled', true);
  },

  /**
    Logger message to console and store.

    @method flexberryLogger
    @param {String} levelName Category name  - ERROR, WARN, LOG, INFO, DEBUG, DEPRECATION.
    @param {String} message Message content.
    @param {String} formattedMessage Full message content in JSON format.
   */
  flexberryLogger(levelName, message, formattedMessage) {
    window.console.log(message);
    if (!this.get('serverLogEnabled')) { // if serverLogEnabled === false logs only to console
      return;
    }

    let timestamp = new Date();	//current date
    let browser = navigator.userAgent;	//browser info
    let  applicationLog = {
      category: levelName,
      eventId: 0,
      priority: 10,
      severity: '',
      title: '',
      timestamp: timestamp,
      machineName:  location.hostname,
      appDomainName: browser,
      processId: document.location.href,
      processName: 'EMBER-FLEXBERRY',
      threadName: '',
      win32ThreadId: '',
      message: message,
      formattedMessage: formattedMessage
    };
    let logModel = 'i-i-s-caseberry-logging-objects-application-log';	//Model for applicationLog
    if (this.get('flexberryStore').peekAll(logModel).findBy('message', message) !== undefined) {	//This message exists in the store?
      return;	//return to avoid infinity loop when message is genetaried in save/ajax stage
    }

    let logRecord = this.get('flexberryStore').createRecord(logModel, applicationLog);	//Construct record  in  store
    logRecord.save().then(//Save recotd in server
      function() {	//Successfull
      },
      function() {	//unsuccesfull transmit message to server
        this.set('serverLogEnabled', false);	//switch off remote logging to avoid infinite loop
      });
  },
});
